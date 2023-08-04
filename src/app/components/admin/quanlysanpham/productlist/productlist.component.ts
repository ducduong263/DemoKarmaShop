import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { ProductService } from 'src/app/Service/product.service';
import { Product } from 'src/app/model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductdetailpopupComponent } from '../productdetailpopup/productdetailpopup.component';

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
  }
  openProductDetailPopup(product: Product) {
    const dialogRef = this.dialog.open(ProductdetailpopupComponent, {
      width: '500px',
      data: product // Truyền dữ liệu sản phẩm vào popup
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pro.getProduct().subscribe((res) => {
        this.products = res;
      });
    });
  }
}
