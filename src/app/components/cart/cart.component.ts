import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';
import { ProductService } from 'src/app/Service/product.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userId: number = 0;
  cartItems: any[] = []; // Tạo một mảng để lưu trữ dữ liệu trong giỏ hàng
  productID: Product | undefined;
  soluong: any;
  

  constructor(private cartService: CartService, private productService: ProductService,) { }

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
  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.productPrice * item.quantity;
    }
    return totalPrice;
  }
  increaseQuantity(item: any, id: string) {
    this.productService.getProductById(parseInt(id)).subscribe((res) => {
      this.productID = res;
      this.soluong = this.productID.quantity;

      if (item.quantity < this.soluong) {
        item.quantity++;
        this.updateCartItem(item);
      } else {
        alert('Không thể tăng số lượng sản phẩm vượt quá số lượng tồn kho!');
      }
    });
  }
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--; // Giảm số lượng sản phẩm nếu lớn hơn 1
      this.updateCartItem(item); // Cập nhật số lượng sản phẩm trong API
    }
  }

  private updateCartItem(item: any) {
    this.cartService.updateCartItem(item).subscribe(
      () => {
        console.log('OK')

      },
      (error) => {
        console.log('Lỗi')
      }
    );
  }
  removeCartItem(item: any) {
    const confirmation = confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?');
    if (confirmation) {
      // Gọi phương thức trong cartService để xóa sản phẩm trong API
      this.cartService.removeCartItem(item.id).subscribe(() => {
        // Nếu xóa thành công, cập nhật lại mảng cartItems
        this.cartItems = this.cartItems.filter((cartItem: any) => cartItem.id !== item.id);
        console.log('Đã xóa sản phẩm khỏi giỏ hàng');
      }, (error: any) => {
        console.log('Lỗi xóa sản phẩm khỏi giỏ hàng:', error);
      });
    }
  }
  onSaveCart() {
    this.cartService.saveCart(this.cartItems).subscribe(
      (response) => {
        console.log('Đơn hàng đã được lưu trữ vào JSON server:', response);
        // Xử lý khi đơn hàng đã được lưu thành công
      },
      (error) => {
        console.error('Lỗi khi lưu đơn hàng:', error);
        // Xử lý khi có lỗi xảy ra
      }
    );
  }
}
