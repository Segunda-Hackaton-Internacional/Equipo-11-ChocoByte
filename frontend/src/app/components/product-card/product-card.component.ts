import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../../model/product'; 

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
  
  ],
  providers: [ProductsService], 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})


export class ProductCardComponent implements OnInit {
  product: Product = {} as Product;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener producto', err);
          this.loading = false;
        }
      });
    }
  }

  agregarAlCarrito() {
    console.log("Producto agregado al carrito:", this.product.name);
  }
}
