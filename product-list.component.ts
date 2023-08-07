import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { Product } from 'src/app/model/product.model';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    product: Product | undefined;
    userId: number = 0;
    productforgetID: Product | undefined;
    products: Array<Product> = new Array<Product>();
    cartItems: any[] = [];
    selectedCategory: string | null = null;
    selectedColor: string | null = null;
    uniqueColors: string[] = [];
    selectedSortType: string = 'default';
    currentPage: number = 1;
    productsPerPage: number = 6;
    searchForm : FormGroup = new FormGroup({
        name: new FormControl(),
    });
    
    get startIndex(): number {
        return (this.currentPage - 1) * this.productsPerPage;
    }

    get endIndex(): number {
        return Math.min(this.startIndex + this.productsPerPage, this.products.length);
    }
    onPageChange(newPage: number) {
        this.currentPage = newPage;
    }
    canGoToPreviousPage(): boolean {
        return this.currentPage > 1;
    }

    canGoToNextPage(): boolean {
        return this.currentPage < this.getPages().length;
    }
    getPages(): number[] {
        const pageCount = Math.ceil(this.products.length / this.productsPerPage);
        return Array.from({ length: pageCount }, (_, index) => index + 1);
    }
    constructor(
        private pro: ProductService,
        private cartService: CartService,
        private Islogin: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private prosv: ProductService) { }
    ngOnInit(): void {
        
        window.scrollTo(0, 0);
        //lấy danh sách sp
        this.pro.getProduct().subscribe((res) => {
            this.products = res;
            this.uniqueColors = this.getUniqueColors(this.products);
            this.sortProductsByPrice();
        });

        //lấy userid -> lấy thông tin trong giỏ hàng
        const userIdString = sessionStorage.getItem('userId');
        if (userIdString !== null) {
            this.userId = parseInt(userIdString, 10);
        } else {
            return;
        }
        this.cartService.GetCartbyUserid(this.userId).subscribe(res => {
            this.cartItems = res;
        });
    }
    sortProductsByPrice() {
        if (this.selectedSortType === 'ascending') {
            this.products.sort((a, b) => a.price - b.price);
        } else if (this.selectedSortType === 'descending') {
            this.products.sort((a, b) => b.price - a.price);
        }
    }
    onSortTypeChange(sortType: string) {
        this.selectedSortType = sortType;
        this.sortProductsByPrice();
    }
    getUniqueColors(products: Product[]): string[] {
        const colors = products.map(product => product.color);
        return [...new Set(colors)];
    }
    getProductCountByColor(color: string): number {
        return this.products.filter(product => product.color === color).length;
    }
    selectCategory(category: string | null) {
        this.selectedCategory = category;
        if (category) {
            this.selectedCategory = category;
            // Gọi service để lấy danh sách sản phẩm theo danh mục được chọn
            this.pro.getProductByCategory(category).subscribe((res) => {
                this.products = res;
            });
        } else {
            // Nếu danh mục là null, hiển thị lại tất cả sản phẩm
            this.pro.getProduct().subscribe((res) => {
                this.products = res;
            });
        }
    }
    selectColor(color: string | null) {
        this.selectedColor = color;
        if (color) {
            this.selectedCategory = color;
            this.pro.getProductByColor(color).subscribe((res) => {
                this.products = res;
            });
        } else {
            this.pro.getProduct().subscribe((res) => {
                this.products = res;
            });
        }
    }

    addToCart(productName: string, productId: number, productPrice: number, proImage: string) {
        if (this.Islogin.IsloggedIn()) {
            // Gọi service để lấy thông tin sản phẩm dựa trên productId
            this.prosv.getProductById(productId).subscribe((res) => {
                this.productforgetID = res;
                console.log('old quantity', this.productforgetID);

                // Tìm chỉ mục của sản phẩm trong giỏ hàng hiện tại
                const existingCartItemIndex = this.cartItems.findIndex((cartItem) => cartItem.productID === productId);

                if (existingCartItemIndex !== -1) {
                    const existingCartItem = this.cartItems[existingCartItemIndex];
                    const newTotalQuantity = existingCartItem.quantity + 1;

                    if (this.productforgetID && newTotalQuantity <= this.productforgetID.quantity) {
                        existingCartItem.quantity = newTotalQuantity;
                        // Gọi hàm cập nhật số lượng trong giỏ hàng
                        this.updateCartItem(existingCartItem);
                        this.toastr.success("Đã cập nhật số lượng sản phẩm trong giỏ hàng", "Thông báo", {
                            progressBar: true,
                            newestOnTop: true
                        })
                    } else {
                        this.toastr.warning("Không thể thêm số lượng sản phẩm vượt quá số lượng tồn kho!", "Thông báo", {
                            progressBar: true,
                            newestOnTop: true
                        })
                    }
                } else {
                    // Gọi hàm thêm sản phẩm vào giỏ hàng
                    this.cartService.addToCart(this.userId, productId, productName, productPrice, 1, proImage).subscribe(() => {
                        this.toastr.success("Đã thêm sản phẩm vào giỏ hàng", "Thông báo", {
                            progressBar: true,
                            newestOnTop: true
                        })
                        // this.router.navigate(['home/cart']);
                        // window.scrollTo(0, 0);
                    });
                }
            });
        } else {
            alert('Vui lòng đăng nhập trước để thêm vào giỏ hàng');
        }
    }


    private updateCartItem(item: any) {
        this.cartService.updateCartItem(item).subscribe(
            () => {
                console.log('Đã cập nhật số lượng sản phẩm trong giỏ hàng');
            },
            (error) => {
                console.log('Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:', error);
            }
        );
    }
    onSearch(){
        this.prosv.getProduct(10, this.searchForm.value.name).subscribe((res) =>{
            this.products=res;
        })
    }


}


