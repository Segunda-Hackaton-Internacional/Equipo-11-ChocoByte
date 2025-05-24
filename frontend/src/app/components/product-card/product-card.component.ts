import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../../model/product'; 
import { AppState, StateProduct } from '../../../model/appState';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  providers: [ProductsService], 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})


export class ProductCardComponent implements OnInit {
  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    type: 'Cacao',
    imageUrl: '',
    presentation: 'Grano',
    weight: 0,
    quantity: 1,
  };
  loading: boolean = true;
  isAdded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    
  }

  agregarAlCarrito() {
    this.isAdded = false;
    const product = this.product;

    if (!product) {
      console.error('No se encontró el producto');
      return;
    }

    const productoParaCarrito: StateProduct = {
      productId: product.id ? product.id?.toString() : "0",
      nombre: product.name as string,
      cantidad: product.quantity,
      precio: product.price as number,
    };
  
    const state = JSON.parse(localStorage.getItem('state') as string) as AppState;
    let agregado = false;
    for (let i = 0; i < state.productos.length; i++) {
      const p = state.productos[i];
      
      if (p.productId === productoParaCarrito.productId) {
        p.cantidad += productoParaCarrito.cantidad;
        agregado = true;
        break;
      }
    }
    if (!agregado) {
      state.productos.push(productoParaCarrito);
    }
    localStorage.setItem('state', JSON.stringify(state));
    this.isAdded = true;
    setTimeout(() => {
      this.isAdded = false;
    }
    , 2000);
  }
}
