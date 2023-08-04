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
    updateProduct(updatedProduct: Product) {
        const url = `${api}products/${updatedProduct.id}`;
        console.log('test url', url);
        return this.http.put(url, updatedProduct);

    }
    // updateProducts(Product: any, id: number):Observable<any> {
    //     return this.http.put(this.api + )
    // }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${api}products/${id}`);
    }

    getCart(userId: number): Observable<any> {
        return this.http.get<any>(`${api}/cart/${userId}`);
    }
    deleteProduct(proID: number) {
        return this.http.delete(`${api}products/${proID}`)
    }
    addProduct(newProduct: Product): Observable<Product> {
        const url = `${api}products`;
        return this.http.post<Product>(url, newProduct);
    }
}
