import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { CartItem } from '../model/product.model';
import { Customer } from '../model/checkout.model';
import { switchMap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
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
    // lưu trữ thông tin giỏ hàng vào JSON server
    saveCart(cartData: any): Observable<any> {
        return this.http.post(this.apiurl + 'cart/', cartData);
    }
    // Hàm để lưu thông tin khách hàng vào JSON server
    saveCustomerAndCart(orderData: { customer: Customer; cartItems: any[] }): Observable<any> {
        return this.http.post(api + "donhang/", orderData);
      }
    // Phương thức để lấy đơn hàng từ JSON server
    getOrderById(): Observable<any> {
        return this.http.get(api + "donhang/");
    }
    
    
    
}
