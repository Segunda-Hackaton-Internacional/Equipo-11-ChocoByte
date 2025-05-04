import { Component, Input } from '@angular/core';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input()
  product: Product = {};

  agregarAlCarrito() {
    console.log('Producto agregado al carrito:', this.product);
    // Aquí puedes agregar la lógica para agregar el producto al carrito
  }
}
