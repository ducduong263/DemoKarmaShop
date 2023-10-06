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

    getProduct(_limit:number=4, search_key:any=null): Observable<Array<Product>> {
        let url = 'http://localhost:3000/products/?_limit=' + _limit +'&_sort=id&_order=desc';
        if(search_key != null){
            url += '&name_like='+search_key;
        }
        return this.http.get<Array<Product>>(url);
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
    getProductByCategory(category: string): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(`${api}products?category=${category}`);
    }
    getProductByColor(color: string): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(`${api}products?color=${color}`);
    }
    getProductByPriceRange(minPrice: number, maxPrice: number): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(`${api}products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    }


}
