import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { Product } from 'src/app/model/product.model';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';

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

    constructor(
        private pro: ProductService,
        private cartService: CartService,
        private Islogin: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private prosv: ProductService) { }
    ngOnInit(): void {
        window.scrollTo(0, 0);

        this.pro.getProduct().subscribe((res) => {
            this.products = res;
        });
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

}
