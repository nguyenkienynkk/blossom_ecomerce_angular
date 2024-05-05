import { Component } from '@angular/core';
import { enviroment } from 'src/app/enviroments';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.serivce';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss'],
})
export class OrderConfirmComponent {
  cartItems: { product: Product; quantity: number }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    debugger;
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); //lấy ra key của cặp { key : value }
    debugger;
    //Lấy thông tin sản phẩm dựa trên list id
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        debugger;
        // Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = productIds.map((productId) => {
          debugger;
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!,
          };
        });
        console.log('haha');
      },
      complete: () => {
        debugger;
        this.calculateTotal();
      },
      error: (error: any) => {
        debugger;
        console.error('Lỗi khi đặt hàng:', error);
      },
    });
  }
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  // Hàm xử lý việc áp dụng mã giảm giá
  applyCoupon(): void {
    // Viết mã xử lý áp dụng mã giảm giá ở đây
    // Cập nhật giá trị totalAmount dựa trên mã giảm giá nếu áp dụng
  }
}
