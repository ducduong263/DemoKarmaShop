import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { CartItem } from '../model/product.model';
const api = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    apiurl = 'http://localhost:3000/cart';

    constructor(private http: HttpClient) { }

    addToCart(
        userId: number,
        productID: number,
        productName: string,
        productPrice: number,
        quantity: number,
        Image: string
    ): Observable<any> {
        const cartItem = { userId, productName, productID, productPrice, quantity, Image };
        return this.http.post<any>(api + 'cart', cartItem);
    }

    GetCartbyUserid(userid: number): Observable<CartItem[]> { // Update the return type
        return this.http.get<CartItem[]>(this.apiurl + '?userId=' + userid);
    }
    updateCartItem(item: any): Observable<any> {
        return this.http.put<any>(api + 'cart/' + item.id, item);
    }
    removeCartItem(cartItemId: number): Observable<any> {
        return this.http.delete<any>(api + 'cart/' + cartItemId);
    }
}
