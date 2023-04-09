import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }
  selectedProduct = new BehaviorSubject<Product>({ id: 0, name: '', price: 0, notice: '' });

  setProduct(product: Product) {
    this.selectedProduct.next(product);
  }

  public getProduct(): Observable<Product> {
    return this.selectedProduct.asObservable();
  }
}
