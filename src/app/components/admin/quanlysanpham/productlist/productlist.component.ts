import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { ProductService } from 'src/app/Service/product.service';
import { Product } from 'src/app/model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductdetailpopupComponent } from '../productdetailpopup/productdetailpopup.component';
import { ProductAddPopupComponent } from '../product-add-popup/product-add-popup.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  product: Product | undefined;
  userId: number = 0;
  productforgetID: Product | undefined;
  products: Array<Product> = new Array<Product>();
  cartItems: any[] = [];
  categories: any[] = [];

  constructor(
    public dialog: MatDialog,
    private pro: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private prosv: ProductService) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.prosv.getProductById(parseInt(productId)).subscribe((res) => {
        this.product = res;
      });
    }
    this.pro.getProduct().subscribe((res) => {
      this.products = res;
    });
    this.loadCategories();

  }
  loadCategories() {
    this.pro.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }
  openProductDetailPopup(product: Product) {
    const dialogRef = this.dialog.open(ProductdetailpopupComponent, {
      width: '500px',
      data: product
    });


    dialogRef.afterClosed().subscribe(result => {
      this.pro.getProduct().subscribe((res) => {
        this.products = res;
      });
    });
  }
  openAddProductPopup() {
    const dialogRef = this.dialog.open(ProductAddPopupComponent, {
      width: '500px',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pro.getProduct().subscribe((res) => {
        this.products = res;
      });
    });
  }
  delete(id: number) {
    this.prosv.deleteProduct(id).subscribe((res) => {
      this.pro.getProduct().subscribe((res) => {
        this.products = res;
      });
    });
  }

}
