import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, JsonPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { OrderByPipe } from '../orderBy.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, OrderByPipe, JsonPipe, SlicePipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export default class ProductList {
  private productService = inject(ProductService)
  private router = inject(Router)

  // Pagination
  pageSize = signal(5)
  start = signal(0)
  end = signal(this.pageSize())
  pageNumber = signal(1)

  changePage(increment: number) {
    this.selectedProduct.set(undefined)
    this.pageNumber.update(pn => pn + increment)
    this.start.update(n => n + increment * this.pageSize())
    this.end.set(this.start() + this.pageSize())
  }

  title: Signal<string> = signal('Products')

  isLoading = this.productService.isLoading
  error = this.productService.error
  products: Signal<Product[]> = this.productService.getProducts();

  selectedProduct: WritableSignal<Product> = signal(undefined);

  selectProduct(product: Product) {
    this.selectedProduct.set(product)
    this.router.navigate(['/products', product.id])

    //this.router.navigateByUrl("/products/" + product.id)
  }
}
