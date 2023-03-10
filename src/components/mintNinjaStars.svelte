<script lang ="ts">
    import connectMetamaskWallet from "../utils/connectMetamaskWallet";
    import { BigNumber, Contract, ethers } from "ethers";
    import { tokenABI } from "../abi/tokenABI";
    let provider;
    let contract;
    let pricePerNft;
    let totalSupply;
    let latestMinted;
    let tokenName;
    let rickRoll= false;
    async function connect() {
        provider = await connectMetamaskWallet();
        contract = new Contract(import.meta.env.VITE_tokenAddress, tokenABI, provider.getSigner());
        pricePerNft = await contract.getPricePerNft();
        totalSupply = await contract.getTotalSupply();
        latestMinted = await contract.getLatestMintedTokenId();
        tokenName = await contract.name();
       
    }
    function minter(){
        //something
       rickRoll= true;

    }
</script>

{#if contract}
    <!-- put something here -->
    <h1>You got here just in time. Lucky number {latestMinted+1} is next.</h1>
    <p>There are only {totalSupply - latestMinted} {tokenName} left.</p>
    <h2>{latestMinted}  of {totalSupply} minted so far.</h2>
    <button class="btn" on:click={minter}>Click here to MINT</button>
{#if rickRoll}
    <div class="tenor-gif-embed" data-postid="22954713" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713">Rickroll Never Gonna Give You Up GIF</a>from <a href="https://tenor.com/search/rickroll-gifs">Rickroll GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
    {/if}
{:else}
    <h1 class="text-5xl font-bold">NINJA STARS</h1>
    <p class="py-6">
        Whip these bad boys all over the metaverse. Connect your wallet to
        begin.
    </p>
    <button on:click={async () => connect()} class="btn btn-primary"
        >Connect Wallet</button
    >
{/if}
