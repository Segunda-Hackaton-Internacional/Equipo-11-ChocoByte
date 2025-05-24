import { Component, Input, OnInit } from '@angular/core';
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
  @Input() product: Product | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    
  }

  agregarAlCarrito() {
    console.log("Producto agregado al carrito:", this.product?.name);
  }
}
