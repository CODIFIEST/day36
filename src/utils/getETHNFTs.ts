import {NFTType, type NFT} from "../domain/nft";
import { Network, Alchemy } from "alchemy-sdk";
// import transformURLs from "./transformURLs";
// require('dotenv').config();
// const ALCHEMY_APK = import.meta.env.VITE_ALCHEMY_APK;
async function getEthNFTs(address: string): Promise<NFT[]> {
    const settings = {
        apiKey: import.meta.env.VITE_ALCHEMY_APK,
        network: Network.ETH_GOERLI,
    }

    const alchemy = new Alchemy(settings);
    alchemy.nft.getNftsForOwner(address).then(console.log);
    const alchemyNFTs = await alchemy.nft.getNftsForOwner(address)

  
    console.log(`all alchemy NFTs ${alchemyNFTs.ownedNfts[0]}`)
    const domainNFTs: NFT[] = [];
    alchemyNFTs.ownedNfts.forEach(nft => {
        if(!nft.title) return;
        const media = nft.media;
        const imageURL = media.length ? media[0].gateway : "";

        const eachNFT: NFT = {
            title: nft.title,
            description: nft.description,
            imageURL: imageURL,
            nftType: NFTType.Ethereum
        }
        domainNFTs.push(eachNFT);
        console.log(domainNFTs)
    });

    // console.log(domainNFTs)
    return domainNFTs;

}
export default getEthNFTs