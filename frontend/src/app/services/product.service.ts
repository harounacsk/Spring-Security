import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:9898/product/';

  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.productUrl}all`)
  }

  public addProduct(product: Product): Observable<string> {
    return this.httpClient.post<string>(`${this.productUrl}add`, product);
  }

  public updateProduct(product: Product): Observable<string> {
    return this.httpClient.put<string>(`${this.productUrl}update`, product);
  }

  public deleteProduct(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.productUrl}delete/${id}`);
  }
}
