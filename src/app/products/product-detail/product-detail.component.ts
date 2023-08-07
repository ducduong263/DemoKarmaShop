import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/Service/cart.service'; // Import CartService
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
    product: Product | undefined;
    userId: number = 0;
    quantity: number = 1;
    cartItems: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private Islogin: AuthService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.productService.getProductById(parseInt(productId)).subscribe((res) => {
                this.product = res;
            });
        }
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
            const existingCartItemIndex = this.cartItems.findIndex((cartItem) => cartItem.productID === productId);

            if (existingCartItemIndex !== -1) {
                // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
                const existingCartItem = this.cartItems[existingCartItemIndex];
                const newTotalQuantity = existingCartItem.quantity + this.quantity;
                console.log('test', this.product);
                if (this.product && newTotalQuantity <= this.product.quantity) {
                    existingCartItem.quantity = newTotalQuantity;
                    this.updateCartItem(existingCartItem); // Cập nhật số lượng trong giỏ hàng
                    this.toastr.success("Đã cập nhật số lượng sản phẩm trong giỏ hàng", "Thông báo", {
                        progressBar: true,
                        newestOnTop: true
                    })
                } else {
                    this.toastr.error("Không thể thêm sản phẩm vượt quá số lượng tồn kho được", "Thông báo", {
                        progressBar: true,
                        newestOnTop: true
                    })
                }
            } else {
                // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng
                this.cartService.addToCart(this.userId, productId, productName, productPrice, this.quantity, proImage).subscribe(() => {
                    this.toastr.success("Đã thêm sản phẩm vào giỏ hàng", "Thông báo", {
                        progressBar: true,
                        newestOnTop: true
                    })
                });
            }
        }
        else {
            this.toastr.warning("Vui lòng đăng nhập trước", "Thông báo", {
                progressBar: true,
                newestOnTop: true
            })
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
