import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../services/products/products.service';
import { BlockchainService } from '../services/blockchain/blockchain.service';

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
  private blockchainService = inject(BlockchainService);

  product: Product | undefined;
  private: 

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(productId)).subscribe(product => {
      this.product = product;

      this.blockchainService.getMetadata(productId).subscribe(metadata => {
    });
  }
}
