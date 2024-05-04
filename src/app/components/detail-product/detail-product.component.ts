import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { enviroment } from 'src/app/enviroments';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.serivce';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  product_images?: ProductImage[];
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  isPressedAddToCart: boolean = false;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    debugger;
    const idParam = 4; //fake tạm 1 giá trị
    if (idParam !== null) {
      this.productId = +idParam;
    }
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          debugger;
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              product_image.image_url = `${enviroment.apiBaseUrl}/products/images/${product_image.image_url}`;
            });
          }else{
            console.error('Bạn đang không qua dc vòng này');
            
          }
          debugger;
          this.product = response;
          this.showImage(0);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching detail:', error);
        },
      });
    } else {
      console.error('Invalid productId:', idParam);
    }
  }
  showImage(index: number): void {
    debugger;
    if (
      this.product &&
      this.product.product_images &&
      this.product.product_images.length > 0
    ) {
      //Đảm bảo index nằm trong khoảng hợp lệ
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }
      // index = index < 0 ? 0 : this.product.product_images.length - 1;
      //Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }
  thumbnailClick(index: number) {
    debugger;
    //Gọi đến khi 1 thumbnail được bấm
    this.currentImageIndex = index; //cập nhật
  }
  nextImage(): void {
    debugger;
    this.showImage(this.currentImageIndex + 1);
  }
  previousImage(): void {
    debugger;
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(): void {
    debugger;
    if (this.product) {
      this.cartService.addToCart(4, this.quantity);
    } else {
      // Xử lý khi product là null
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
    }
  }
  increaseQuantity(): void {
    debugger;
    this.quantity++;
  }
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  getTotalPrice(): number {
    if (this.product) {
      return this.product.price * this.quantity;
    }
    return 0;
  }
  buyNow(): void {
    if (this.isPressedAddToCart == false) {
      this.addToCart();
    }
    this.router.navigate(['/orders']);
  }
}
