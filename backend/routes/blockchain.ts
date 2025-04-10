import { Router } from "express";
import { uploadMetadata } from "../libs/blockchain/metadata";
import { umi } from "../libs/blockchain/serverWallet";
import { create } from "@metaplex-foundation/mpl-core";
import { generateSigner, type PublicKey, type TransactionSignature } from "@metaplex-foundation/umi";

export const blockchainRouter = Router();

interface NFT {
  signature: TransactionSignature;
  publicKey: PublicKey;
}

async function createNFT(name: string, attributes: any): NFT {
  // 1. Upload metadata
  const muri = await uploadMetadata(attributes);

  // 2. Mint NFT
  const asset = generateSigner(umi);
  const tx = await create(umi, {
    asset,
    name,
    uri: muri,
  }).sendAndConfirm(umi);

  return {
    signature: tx.signature,
    publicKey: asset.publicKey,
  }
}

blockchainRouter.post('/register/batch', async (req, res) => {

});