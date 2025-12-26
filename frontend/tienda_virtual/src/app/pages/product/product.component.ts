import { ProductService } from "../../core/services/product.service";

export class ProductsComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res.products;
    });
  }
}
