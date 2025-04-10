import { mplCore } from "@metaplex-foundation/mpl-core";
import { generateSigner, keypairIdentity, sol } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFileSync } from "fs";

export const umi = createUmi('https://api.devnet.solana.com')
  .use(mplCore())
  /* .use(irysUploader({
    address: 'https://api.devnet.irys.xyz',
})); */

if (process.env.USE_LOCAL_WALLET === 'true') {
  // Use local wallet
  const walletFile = readFileSync('./wallet.json', 'utf-8');
  const wallet = JSON.parse(walletFile);
  const privateKey = Uint8Array.from(wallet);
  const serverWallet = umi.eddsa.createKeypairFromSecretKey(privateKey);
  umi.use(keypairIdentity(serverWallet));
} else {
  // Use generated wallet
  const serverWallet = generateSigner(umi);
  umi.use(keypairIdentity(serverWallet));
}

await umi.rpc.airdrop(umi.identity.publicKey, sol(1)); // 1 SOL in lamports is 1_000_000_000
console.log(`Airdropped 1 SOL to ${umi.identity.publicKey.toString()}`);