import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../services/products/products.service';
import { BlockchainService } from '../services/blockchain/blockchain.service';
import { NFTRegistry } from '../../model/nft-registry';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-blockchain-page',
  standalone: true,
  imports: [NavbarComponent, ProductCardComponent, FooterComponent],
  templateUrl: './blockchain-page.component.html',
  styleUrl: './blockchain-page.component.css',
  providers: [ProductsService, BlockchainService]
})
export class BlockchainPageComponent {
  private readonly route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private blockchainService = inject(BlockchainService);

  product: Product | undefined;
  nft: NFTRegistry | undefined;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(productId)).subscribe(product => {
      this.product = product;

      this.blockchainService.getProductNFTMetadata(product).subscribe(metadata => {
        this.nft = metadata;
      });
    });
  }
}
