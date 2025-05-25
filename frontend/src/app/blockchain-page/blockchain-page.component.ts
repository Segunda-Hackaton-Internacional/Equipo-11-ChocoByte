import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../services/products/products.service';
import { BlockchainService } from '../services/blockchain/blockchain.service';
import { NFTRegistry } from '../../model/nft-registry';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AppState } from '../../model/appState';

@Component({
  selector: 'app-blockchain-page',
  standalone: true,
  imports: [NavbarComponent, ProductCardComponent, FooterComponent],
  templateUrl: './blockchain-page.component.html',
   styleUrls: ['./blockchain-page.component.css'],
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

    const state = JSON.parse(localStorage.getItem('state') as string) as AppState;

    this.product = state.catalogo.find(product => product.id === Number(productId));

    console.log('Product:', this.product);

    this.nft = {
      id: '61313351',
      publicKey: 'CLCoTADvV64PSrnR6QXty6Fwrt9Xc6EdxSJE4wLRePjq',
      signature: '5CuDA1Y9SBWBJMqFfAXexjiZwS2FQFP8q6B7NPMnDMshvqucWf1jU7TW1FsbovPT96mLWEBTWRE2F3VjMnNxcvwQ',
      uri: 'https://ipfs.io/ipfs/QmQ6v1x2z5Z3g7k4f8F9J5Y5v5Y5v5Y5v5Y5v5Y5v5Y5v5',
      attributes: {
        name: this.product?.name,
        description: this.product?.description,
        batch_number: '12',
        country: 'Colombia',
        date: '2023-10-01',
        produced_at: 'Cll. 25 #4-50 Valparaíso',
        produced_by: 'Alpina Coffee S.A.',
        region: 'Antioquia',
      }
    }
  }
}
