import { NFTMetadata } from "./nft-metadata";

export interface NFTRegistry {
  name?: string;
  metdata_uri?: string;
  attributes?: NFTMetadata;
  publicKey?: string;
}
