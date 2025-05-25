import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { Router, RouterModule } from '@angular/router';
import { AppState, StateProduct } from '../../model/appState';
import { Product } from '../../model/product';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products: Product[] = [];
  productForm: FormGroup;
  showAddForm = false;
  showDeleteForm = false;
  selectedProductId: number | null = null;
  carritoProductos: any[] = [];

  searchTerm = '';
  selectedType = '';

  constructor(private fb: FormBuilder, private router: Router) {
    if (!localStorage.getItem('state')) {
      this.products = [
        {
          id: 1,
          name: 'Cacao Premium',
          price: 15000,
          description: 'Cacao orgánico de alta calidad',
          type: 'Cacao',
          quantity: 1,
          imageUrl: 'https://i.pinimg.com/736x/2a/d4/b5/2ad4b548b80f1e91a12b0b9df5d5bb96.jpg',
          presentation: 'Grano',
          weight: 500
        },
        {
          id: 2,
          name: 'Café de Sierra Nevada',
          price: 18000,
          description: 'Café cultivado en altura con notas frutales',
          type: 'Café',
          quantity: 1,
          imageUrl: 'https://mtpak.coffee/wp-content/uploads/2023/09/recyclable-stock-coffee-packaging-mtpak-coffee.jpg',
          presentation: 'Molido',
          weight: 250
        },
        {
          id: 3,
          name: 'Cacao Nacional Fino',
          price: 22000,
          description: 'Cacao fino de aroma, ideal para repostería',
          type: 'Cacao',
          quantity: 1,
          imageUrl: 'https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_007833/tienda_007833_ac5ec8ea9673bc50ca895d3c29edd1b2d4c88358_producto_large_90.jpg?not-from-cache-please',
          presentation: 'Grano',
          weight: 400
        },
        {
          id: 4,
          name: 'Café Orgánico del Huila',
          price: 16000,
          description: 'Café 100% orgánico con certificación internacional',
          type: 'Café',
          quantity: 1,
          imageUrl: 'https://images.vexels.com/content/193473/preview/coffee-bag-packaging-mockup-1e1d79.png',
          presentation: 'Grano',
          weight: 500
        },
        {
          id: 5,
          name: 'Cacao con Especias',
          price: 20000,
          description: 'Cacao infusionado con canela y cardamomo',
          type: 'Cacao',
          quantity: 1,
          imageUrl: 'https://procolcacao.com/wp-content/uploads/2021/09/crocacao-3.jpg',
          presentation: 'Molido',
          weight: 350
        },
        {
          id: 6,
          name: 'Café de Origen Tolima',
          price: 17500,
          description: 'Café con acidez media y sabor balanceado',
          type: 'Café',
          quantity: 1,
          imageUrl: 'https://gitu.net/imgs/free-psd-mockups-download/600x0_aluminium-flat-bottom-coffee-pouch-psd-mockup.jpg',
          presentation: 'Molido',
          weight: 250
        },
        {
          id: 7,
          name: 'Cacao en Polvo Premium',
          price: 14000,
          description: 'Cacao en polvo ideal para bebidas o postres',
          type: 'Cacao',
          quantity: 1,
          imageUrl: 'https://www.swisspac.pe/wp-content/uploads/2022/12/Chocolate_Packaging_1.jpg',
          presentation: 'Molido',
          weight: 300
        },
        {
          id: 8,
          name: 'Café Descafeinado Natural',
          price: 19000,
          description: 'Café suave, descafeinado sin químicos',
          type: 'Café',
          quantity: 1,
          imageUrl: 'https://img.freepik.com/psd-premium/maqueta-embalaje-bolsa-cafe-aluminio_439185-1875.jpg',
          presentation: 'Grano',
          weight: 500
        },
        {
          id: 9,
          name: 'Cacao Criollo Amazónico',
          price: 25000,
          description: 'Variedad criolla nativa con alta concentración de cacao',
          type: 'Cacao',
          quantity: 1,
          imageUrl: 'https://swisspac.ec/wp-content/uploads/2022/12/Chocolate_Packaging_5-1.jpg',
          presentation: 'Grano',
          weight: 450
        }
      ];

      localStorage.setItem('state', JSON.stringify({ productos: [], catalogo: this.products } as AppState));
    } else {
      const state = JSON.parse(localStorage.getItem('state') as string) as AppState;
      this.products = state.catalogo;
    }

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      type: ['Cacao', Validators.required],
      imageUrl: ['', Validators.required],
      presentation: ['Grano', Validators.required],
      weight: [250, [Validators.required, Validators.min(0)]],
    });
  }


  toggleAddForm(): void {
    this.showAddForm = true;
    this.showDeleteForm = false;
    this.productForm.reset({
      name: '',
      price: 0,
      description: '',
      type: 'Cacao',
      imageUrl: '',
      presentation: 'Grano',
      weight: 250,
    });
  }

  toggleDeleteForm(): void {
    this.showDeleteForm = true;
    this.showAddForm = false;
    this.selectedProductId = null;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        quantity: 1,
        id: this.products.length + 1,
      };
      this.products.push(productData);
      this.productForm.reset();
      this.updateCatalog();
      this.volverALista();
    }
  }

  volverALista(): void {
    this.showAddForm = false;
    this.showDeleteForm = false;
  }  

  confirmDelete(): void {
    if (this.selectedProductId !== null) {
      this.products = this.products.filter((p) => p.id !== this.selectedProductId);
      this.selectedProductId = null;
      this.updateCatalog();
      this.volverALista();
    }
  }

  increaseQuantity(product: Product): void {
    product.quantity++;
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  filteredProducts(): Product[] {
    return this.products.filter(
      (product) =>
        (!this.searchTerm || product.name?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (!this.selectedType || product.type === this.selectedType)
    );
  }

  addToCart(product: Product): void {
    const productoParaCarrito: StateProduct = {
      productId: product.id ? product.id?.toString() : "0",
      nombre: product.name as string,
      cantidad: product.quantity,
      precio: product.price as number,
    };
  
    this.carritoProductos.push(productoParaCarrito);
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
  }

  updateCatalog(): void {
    const state = JSON.parse(localStorage.getItem('state') as string) as AppState;
    state.catalogo = this.products;
    localStorage.setItem('state', JSON.stringify(state));
  }
}
