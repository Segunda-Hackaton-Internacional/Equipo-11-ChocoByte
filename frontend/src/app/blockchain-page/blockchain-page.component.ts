import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../services/products/products.service';
import { BlockchainService } from '../services/blockchain/blockchain.service';
import { NFTRegistry } from '../../model/nft-registry';
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

  products: Product[] = [
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
  product: Product | undefined;
  nft: NFTRegistry | undefined;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');

    this.product = this.products.find(product => product.id === Number(productId));

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
