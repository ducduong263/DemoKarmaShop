import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/Service/cart.service'; // Import CartService
import { AuthService } from 'src/app/Service/auth.service';

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
        private Islogin: AuthService
    ) { }

    ngOnInit(): void {
        // Lấy id từ URL và gọi API để lấy thông tin sản phẩm
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
                existingCartItem.quantity += this.quantity; // Cộng thêm số lượng mới
                this.updateCartItem(existingCartItem); // Cập nhật số lượng trong giỏ hàng
                alert('Đã cập nhật số lượng sản phẩm trong giỏ hàng.');
            } else {
                // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng
                this.cartService.addToCart(this.userId, productId, productName, productPrice, this.quantity, proImage).subscribe(() => {
                    alert('Đã thêm sản phẩm vào giỏ hàng.');
                });
            }
        }
        else {
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
