import { CartComponent } from './../cart/cart.component';
import { Component,OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';
import { Product } from 'src/app/model/product.model';
import { Customer } from 'src/app/model/checkout.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private cartService: CartService) { }

  cities: string[] = ['TPHCM ', 'Hà Nội', 'Bình Dương'];    // Dữ liệu cho các option thành phố
  districts: string[] = ["Quận 1", "Quận 2"," Quận 3"]; // Dữ liệu cho các option quận huyện
  wards: string[] = ['Phường 1', 'Phường 2', 'Phường 3']; // Dữ liệu cho các option phường xã

  public customer: Customer = {
    fullName: "",
    // city:"",
    // district:"",
    // ward: '',
    phone:'' ,
    address:'' ,
    note:'',
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
    // Thông tin giỏ hàng, ví dụ: products, total, user info,...
  };

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.productPrice * item.quantity;
    }
    return totalPrice;
  }
  onSubmit() {
    this.cartService.saveCustomerAndCart({ customer: this.customer, cartItems: this.cartItems }).subscribe(
      (response) => {
        console.log('Thông tin khách hàng và giỏ hàng đã được lưu trữ:', response);
        for (const item of this.cartItems) {
          this.cartService.removeCartItem(item.id).subscribe(() => {
            
            console.log('Đã xóa sản phẩm khỏi giỏ hàng');
          }, (error: any) => {
            console.log('Lỗi xóa sản phẩm khỏi giỏ hàng:', error);
          });
        }
        window.location.reload();
        
      },
      (error) => {
        console.error('Lỗi khi lưu thông tin khách hàng và giỏ hàng:', error);
        // Xử lý khi có lỗi xảy ra khi lưu thông tin khách hàng và giỏ hàng
      }
    );
  }
  
  
}
