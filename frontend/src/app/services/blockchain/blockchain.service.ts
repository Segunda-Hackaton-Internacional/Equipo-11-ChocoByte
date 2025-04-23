import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NFTRegistry } from '../../../model/nft-registry';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  getProductNFTMetadata(productId: number): Observable<NFTRegistry> {
    
  }
}
