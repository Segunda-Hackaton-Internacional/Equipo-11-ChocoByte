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
   styleUrls: ['./blockchain-page.component.css'],
  providers: [ProductsService, BlockchainService]
})
export class BlockchainPageComponent {
  private readonly route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private blockchainService = inject(BlockchainService);

  product: Product = {};
  nft: NFTRegistry | undefined;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    /* this.productService.getProductById(Number(productId)).subscribe(product => {
      this.product = product;

      this.blockchainService.getProductNFTMetadata(product).subscribe(metadata => {
        this.nft = metadata;
      });
    }); */

    this.product = {
      id: 3,
      name: 'Super Cacao Coffee Mix',
      description: 'Super Cacao Coffee Mix is a delicious blend of cacao and coffee, perfect for a quick energy boost. It also contains a variety of vitamins and minerals to support your health. For those who love the taste of cacao and coffee, this mix is a must-try!',
      imageUrl: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now06672/l/60.jpg',
      price: 100,
      category: 'Mix',
      nftId: '61313351',
    }

    this.nft = {
      id: '61313351',
      publicKey: 'CLCoTADvV64PSrnR6QXty6Fwrt9Xc6EdxSJE4wLRePjq',
      signature: '5CuDA1Y9SBWBJMqFfAXexjiZwS2FQFP8q6B7NPMnDMshvqucWf1jU7TW1FsbovPT96mLWEBTWRE2F3VjMnNxcvwQ',
      uri: 'https://ipfs.io/ipfs/QmQ6v1x2z5Z3g7k4f8F9J5Y5v5Y5v5Y5v5Y5v5Y5v5Y5v5',
      attributes: {
        name: 'Super Cacao Coffee Mix',
        description: 'Super Cacao Coffee Mix is a delicious blend of cacao and coffee, perfect for a quick energy boost. It also contains a variety of vitamins and minerals to support your health. For those who love the taste of cacao and coffee, this mix is a must-try!',
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
