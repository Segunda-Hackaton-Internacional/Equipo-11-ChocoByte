import { Router } from "express";
import { uploadMetadata } from "../libs/blockchain/metadata";
import { umi } from "../libs/blockchain/serverWallet";
import { create } from "@metaplex-foundation/mpl-core";
import { generateSigner, type PublicKey, type TransactionSignature } from "@metaplex-foundation/umi";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firebaseStorage } from "../libs/storage/firebase";

export const blockchainRouter = Router();

interface NFT {
  signature: TransactionSignature;
  publicKey: PublicKey;
}

async function createNFT(name: string, attributes: any): Promise<NFT> {
  // 1. Upload metadata
  const muri = await uploadMetadata(attributes);

  // 2. Mint NFT
  const asset = generateSigner(umi);
  const tx = await create(umi, {
    asset,
    name,
    uri: muri,
  }).sendAndConfirm(umi);

  // 3. Store NFT in database
  const docRef = await addDoc(collection(firebaseStorage, "nfts"), {
    signature: tx.signature.toBase64(),
    publicKey: asset.publicKey.toString(),
    name,
    uri: muri,
  })

  return {
    signature: tx.signature,
    publicKey: asset.publicKey,
  }
}

blockchainRouter.post('/nft/register', async (req, res) => {
  const data = req.body;
  const { name, attributes } = data;
  if (!name || !attributes) {
    res.status(400).json({ error: 'Missing name or attributes' });
  }
  try {
    const nft = await createNFT(name, attributes);
    res.status(200).json({
      nft,
      attributes,
      name,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create NFT' });
  }
});

blockchainRouter.get('/nft/list', async (req, res) => {
  res.json(
    await getDocs(collection(firebaseStorage, "nfts"))
  );
});
