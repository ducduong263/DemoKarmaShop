import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { Product } from 'src/app/model/product.model';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    product: Product | undefined;
    userId: number = 0;

    products: Array<Product> = new Array<Product>();
    constructor(
        private pro: ProductService,
        private cartService: CartService,
        private Islogin: AuthService,
        private router: Router) { }

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
    }
    addToCart(productName: string, productId: number, productPrice: number, proImage: string) {
        if (this.Islogin.IsloggedIn()) {
            this.cartService.addToCart(this.userId, productId, productName, productPrice, 1, proImage).subscribe(() => {
                console.log(this.userId, productId, productName, productPrice, 1, proImage);
                alert('Đã thêm sản phẩm vào giỏ hàng.');
                this.router.navigate(['cart']);
                window.scrollTo(0, 0);
            });
        }
        else {
            alert('Vui lòng đăng nhập trước để thêm vào giỏ hàng');
        }
    }

}
