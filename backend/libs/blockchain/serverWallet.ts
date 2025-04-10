import { mplCore } from "@metaplex-foundation/mpl-core";
import { generateSigner, keypairIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFileSync } from "fs";

const umi = createUmi('https://api.devnet.solana.com')
  .use(mplCore())
  /* .use(irysUploader({
    address: 'https://api.devnet.irys.xyz',
})); */

const signer = generateSigner(umi);

const walletFile = readFileSync('./wallet.json', 'utf-8');
const wallet = JSON.parse(walletFile);
const privateKey = Uint8Array.from(wallet);

const keypair = umi.eddsa.createKeypairFromSecretKey(privateKey);

umi.use(keypairIdentity(keypair));