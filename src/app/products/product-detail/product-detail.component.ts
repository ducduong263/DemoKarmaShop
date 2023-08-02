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

    }


    addToCart(productName: string, productId: number, productPrice: number, proImage: string) {
        if (this.Islogin.IsloggedIn()) {
            this.cartService.addToCart(this.userId, productId, productName, productPrice, this.quantity, proImage).subscribe(() => {
                alert('Đã thêm sản phẩm vào giỏ hàng.');
            });
        }
        else {
            alert('Vui lòng đăng nhập trước để thêm vào giỏ hàng');
        }
    }
}
