import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, UpperCasePipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private productService = inject(ProductService)

  id = input.required<number>()

  deleteProduct() {
    this.productService.deleteProduct(this.id())
  }

  product = computed(() => this.productService.getProductById(this.id()))
}
