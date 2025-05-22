import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../../../model/product';

interface ApiResponse<T> {
  exito: boolean;
  data: T;
  mensaje?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   private apiUrl = 'http://localhost:3000/api/product';
  
   constructor(private http: HttpClient) { }

  /** Obtiene todos los productos desde el backend */
  public getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }

  /** Obtiene un producto por su ID */
  /*
  public getProductById(id: string): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }
  */
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

  /** Registra un nuevo producto (multipart/form-data con imágenes) */
  public registerProduct(formData: FormData): Observable<Product> {
    return this.http.post<ApiResponse<Product>>(this.apiUrl, formData).pipe(
      map(res => res.data)
    );
  }

  /** Actualiza un producto existente */
  public updateProduct(id: string, updateData: Partial<Product>): Observable<Product> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/${id}`, updateData).pipe(
      map(res => res.data)
    );
  }

  /** Elimina un producto por ID */
  public deleteProduct(id: string): Observable<{ id: string; eliminado: boolean }> {
    return this.http.delete<ApiResponse<{ id: string; eliminado: boolean }>>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }

/*
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
*/
}
