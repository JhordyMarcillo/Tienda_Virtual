import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${environment.apiUrl}/products`);
  }
}
