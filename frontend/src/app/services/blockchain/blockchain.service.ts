import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { NFTRegistry } from '../../../model/nft-registry';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../model/product';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  getProductNFTMetadata(product: Product): Observable<NFTRegistry> {
    return this.httpClient.get<NFTRegistry>(`/api/blockchain/nft/${product.nftId}`).pipe(
      switchMap((nft: NFTRegistry) => {
        
      })
    )
  }
}
