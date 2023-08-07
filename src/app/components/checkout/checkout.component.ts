
import { CartComponent } from './../cart/cart.component';
import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/Service/cart.service';
import { Product } from 'src/app/model/product.model';
import { Customer } from 'src/app/model/checkout.model';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private cartService: CartService, private toastr: ToastrService, private productService: ProductService, private router: Router,) { }
  fullNameInvalid: boolean = false;
  status: string = 'Chưa xác nhận';
  public customer: Customer = {
    fullName: "",
    phone: '',
    address: '',
    note: '',
  };
  userId: number = 0;
  cartItems: any[] = []; // Tạo một mảng để lưu trữ dữ liệu trong giỏ hàng
  productID: Product | undefined;
  soluong: any;

  ngOnInit(): void {
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
  cartData: any = {

  };

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.productPrice * item.quantity;
    }
    return totalPrice;
  }
  onSubmit() {
    if (!this.customer.fullName || !this.customer.phone || !this.customer.address) {
      this.fullNameInvalid = true;
      this.toastr.error("Vui lòng điền đầy đủ thông tin", "Thông báo", {
        progressBar: true,
        newestOnTop: true
      })
      return;
    }
    const orderData = {
      customer: this.customer,
      cartItems: this.cartItems,
      status: 'Chưa xác nhận' // Thêm thuộc tính status
    };
    this.cartService.saveCustomerAndCart(orderData).subscribe(
      (response) => {

        console.log('Thông tin khách hàng và giỏ hàng đã được lưu trữ:', response);
        for (const item of this.cartItems) {
          this.cartService.removeCartItem(item.id).subscribe(() => {
            console.log('Đã xóa sản phẩm khỏi giỏ hàng');
          }, (error: any) => {
            console.log('Lỗi xóa sản phẩm khỏi giỏ hàng:', error);
          });

          // Cập nhật số lượng sản phẩm trong dữ liệu JSON Server
          this.productService.getProductById(item.productID).subscribe((product: Product) => {
            product.quantity -= item.quantity;
            this.productService.updateProduct(product).subscribe(
              () => {
                console.log('Đã cập nhật số lượng sản phẩm:', product);
              },
              (error) => {
                console.log('Lỗi cập nhật số lượng sản phẩm:', error);
              }
            );
          });
        }

        this.toastr.success("Xác nhận đặt hàng thành công", "Thông báo", {
          progressBar: true,
          newestOnTop: true
        })
        this.router.navigate(['/home/thankforpurchase']);
      },
      (error) => {
        console.error('Lỗi khi lưu thông tin khách hàng và giỏ hàng:', error);
        this.toastr.error("Lỗi khi lưu thông tin khách hàng và giỏ hàng", "Thông báo", {
          progressBar: true,
          newestOnTop: true
        })
      }
    );
  }


}
