import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //
import { ShoppingService } from '../services/shopping/shopping.service';
import { BlockchainService } from '../services/blockchain/blockchain.service';
import { Order } from '../../model/order';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent], //
  styleUrls: ['./cart-page.component.css'], //
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {
  carrito = [
    {
      productId: 'producto123',
      nombre: 'Café Orgánico Tolima',
      cantidad: 2,
      precio: 15000
    }
  ];

  userId = 'cliente001';
  shippingAddress = 'Calle 123, Bogotá';
  paymentMethod = 'stripe';
  resultado = '';

  constructor(
    private shoppingService: ShoppingService,
    private blockchainService: BlockchainService,
    private router: Router
  ) {
    if (!localStorage.getItem('state')) {
      this.router.navigate(['/products']);
      return;
    }

    const state = JSON.parse(localStorage.getItem('state') as string) as { productos: any[] };
    if (state?.productos?.length) {
      this.carrito = state.productos;
    }
  }  

  get total() {
    return this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  confirmarCompra() {
    const item = this.carrito[0];

    const order: Order = {
      userId: this.userId,
      product: item.nombre,
      quantity: item.cantidad,
      paymentMethod: this.paymentMethod,
      shippingAddress: this.shippingAddress
    };

    this.shoppingService.comprarProducto(order).subscribe({
      next: (res) => {
        const traceId = res.orden.traceId;

        // Lógica para el mint del NFT
        const metadata = {
          nombre: item.nombre,
          productor: this.userId,
          origen: 'Tolima, Colombia',
          fechaProduccion: new Date().toISOString(),
          certificaciones: ['Fair Trade', 'Orgánico'],
          traceId: traceId
        };

        this.resultado = '✅ Compra realizada con éxito. NFT en proceso de minting...';
      },
      error: (err) => {
        this.resultado = '❌ Error al realizar la compra: ' + err.message;
      }
    });
  }

  limpiarCarrito() {
    localStorage.removeItem('state');
    this.carrito = [];
    this.resultado = 'Carrito limpiado. Vaya a la página de productos para seguir comprando.';
  }
}
