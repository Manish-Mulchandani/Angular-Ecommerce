import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  filteredProducts: any[] = [];
  cartItems: any[] = []

  constructor(private productService: ProductService) { 
    this.cartItems = this.productService.getCartItems();
  }

  ngOnInit(){
    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data;
      this.categories=this.getCategories();
      this.filterProducts();
  });
}

addToCart(product:any, quantity:number) {
  this.productService.addToCart(product, quantity);
}

getCategories() {
  return [...new Set(this.productList.map(product => product.p_category))];
}

filterProducts() {
  this.filteredProducts = this.selectedCategory
      ? this.productList.filter(product => product.p_category === this.selectedCategory)
      : this.productList;
}

clearCart() {
  this.productService.clearCart();
  this.cartItems=[]
}

}
