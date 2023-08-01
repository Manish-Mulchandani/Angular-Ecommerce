/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'assets/products.json';
  private cartItems: any[] = [];

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl);
  }

  addToCart(product:any,quantity:number=1) {
    const existingItem = this.cartItems.find(item => item.product.p_id === product.p_id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}