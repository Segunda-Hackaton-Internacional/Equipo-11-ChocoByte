import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../../model/order';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  private apiUrl = 'http://localhost:3000/api/shopping';

  constructor(private http: HttpClient) {}

  comprarProducto(order: Order): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprar`, order);
  }
}
