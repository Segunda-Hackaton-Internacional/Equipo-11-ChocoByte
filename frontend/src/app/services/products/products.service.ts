import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  public getProducts(): Observable<Product[]> {
    // RXJS Observable to simulate an API call
    return new Observable<Product[]>(observer => {
      // Simulate an API call with a delay
      setTimeout(() => {
        const products: Product[] = [
          { id: 1, name: 'Product 1', description: 'Description 1', price: 100, imageUrl: 'url1', category: 'Category 1' },
          { id: 2, name: 'Product 2', description: 'Description 2', price: 200, imageUrl: 'url2', category: 'Category 2' },
          { id: 3, name: 'Product 3', description: 'Description 3', price: 300, imageUrl: 'url3', category: 'Category 3' }
        ];
        observer.next(products);
        observer.complete();
      }, 1000);
    }
    );
  }

  public getProductById(id: number): Observable<Product> {
    // RXJS Observable to simulate an API call
    return new Observable<Product>(observer => {
      // Simulate an API call with a delay
      setTimeout(() => {
        const product: Product = { id, name: `Product ${id}`, description: `Description ${id}`, price: id * 100, imageUrl: `url${id}`, category: `Category ${id}` };
        observer.next(product);
        observer.complete();
      }, 1000);
    });
  }
}
