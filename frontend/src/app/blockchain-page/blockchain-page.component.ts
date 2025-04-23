import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../model/product';
import { ProductsService } from '../services/products/products.service';

@Component({
  selector: 'app-blockchain-page',
  standalone: true,
  imports: [],
  templateUrl: './blockchain-page.component.html',
  styleUrl: './blockchain-page.component.css'
})
export class BlockchainPageComponent {
  private readonly route = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  product: Product | undefined;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(productId)).subscribe(product => {
      this.product = product;
    }
    );
  }
}
