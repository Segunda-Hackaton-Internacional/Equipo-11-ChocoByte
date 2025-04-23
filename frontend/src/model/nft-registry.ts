import { NFTMetadata } from "./nft-metadata";

export interface NFTRegistry {
  id?: string;
  signature?: string;
  publicKey?: string;
  uri?: string;
  attributes?: NFTMetadata;
}
