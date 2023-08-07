import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-quanlydonhang',
  templateUrl: './quanlydonhang.component.html',
  styleUrls: ['./quanlydonhang.component.css']
})
export class QuanlydonhangComponent implements OnInit {

  orders: any = {}; // Mảng chứa danh sách đơn hàng từ API hoặc dữ liệu của bạn.
  selectedOrderId: number | null = null; // Biến lưu trữ ID của đơn hàng đang được chọn để hiển thị chi tiết.
  // selectedOrder: any | null = null; // Biến lưu trữ thông tin chi tiết của đơn hàng được chọn.
  showPopup: boolean = false;
  selectedOrder: any;
  totalPriceId: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrderById(1); // Gọi hàm getOrderById với orderId cụ thể (ở đây là 1), bạn có thể thay đổi nếu cần.
  }

  // Hàm sẽ được gọi khi người dùng nhấn vào nút "Xem chi tiết".
  // viewOrderDetails(orderId: number) {
  //   // Tìm đơn hàng trong mảng "orders" dựa vào "orderId".
  //   this.selectedOrder = this.orders.find((order) => order.id === orderId);

  //   if (this.selectedOrder) {
  //     // Gán giá trị cho biến "selectedOrderId" để hiển thị phần chi tiết đơn hàng.
  //     this.selectedOrderId = this.selectedOrder.id;
  //   }
  // }
  getTotalPrice(i:number): number {
    let totalPrice = 0;
    for (const order of this.orders) {
      for (const item of order[i].cartItems) {
        totalPrice += item.productPrice * item.quantity;
      }
    }
    return totalPrice;
  }
  // Hàm sẽ được gọi khi người dùng nhấn vào nút "Quay lại".
  goBack() {
    // Đặt giá trị null cho biến "selectedOrderId" để ẩn phần chi tiết đơn hàng.
    this.selectedOrderId = null;
    this.selectedOrder = null;
  }

  getOrderById(orderId: number): void {
    this.cartService.getOrderById()
      .subscribe(
        (response) => {
          // Xử lý dữ liệu trả về trong response
          console.log(response);
          this.orders = [response];
          
        },
        (error) => {
          // Xử lý lỗi nếu có
          console.error(error);
        }
      );
  }
  openPopup(order: any,i: number) {
    this.showPopup = true;
    this.selectedOrder = order;
    this.totalPriceId = i;
  }
  
  closePopup() {
    this.showPopup = false;
    this.selectedOrder = null;
  }
}