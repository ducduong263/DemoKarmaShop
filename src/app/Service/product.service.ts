import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

const api = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient, private cartService: CartService) { }

    getProduct(): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(api + 'products');
    }

    getProducts(limit: number): any {
        return this.http.get<any>(`${api}/`);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${api}products/${id}`);
    }

    getCart(userId: number): Observable<any> {
        return this.http.get<any>(`${api}/cart/${userId}`);
    }
    // addToCart(userId: number, productName: string, productId: number, productPrice: number, quantity: number, image: string): Observable<any> {
    //     return this.cartService.addToCart(userId, productId, productName, productPrice, quantity, image);
    // }

}
