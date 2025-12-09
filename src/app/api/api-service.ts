import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';

  private http = inject(HttpClient)

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(delay(500))
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id)
  }

}
