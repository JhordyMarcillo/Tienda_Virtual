import { ProductService } from "../../core/services/product.service";


export class CartComponent {
  cart: any[] = [];

  constructor(private cartService: CartService) {
    this.cartService.getCart().subscribe(res => this.cart = res);
  }
}
