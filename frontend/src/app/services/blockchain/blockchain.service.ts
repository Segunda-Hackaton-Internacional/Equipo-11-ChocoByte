import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { NFTRegistry } from '../../../model/nft-registry';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../model/product';
import { NFTMetadata } from '../../../model/nft-metadata';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  getProductNFTMetadata(product: Product): Observable<NFTRegistry> {
    return this.httpClient.get<NFTRegistry>(`/api/blockchain/nft/${product.nftId}`).pipe(
      switchMap((nft: NFTRegistry) => {
        return this.httpClient.get<NFTMetadata>(nft.uri!!).pipe(
          map((metadata: NFTMetadata) => {
            return {
              ...nft,
              attributes: metadata
            } as NFTRegistry;
          })
        );
      })
    );
  }


  //para compras
  mintNFT(nombre: string, attributes: any): Observable<any> {
    return this.httpClient.post(`/api/blockchain/nft/register`, {
      name: nombre,
      attributes: attributes
    });
  }
}
