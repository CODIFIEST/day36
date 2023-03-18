<script lang ="ts">
    import connectMetamaskWallet from "../utils/connectMetamaskWallet";
    import { BigNumber, Contract, ethers } from "ethers";
    import { tokenABI } from "../abi/tokenABI";
    import getEthNFTs from "../utils/getETHNFTs";
    let provider;
    let contract;
    let pricePerNft;
    let totalSupply;
    let latestMinted;
    let tokenName;
    let rickRoll = false;
    let NFTs;
    let qtyToMint = 1;
    async function connect() {
        provider = await connectMetamaskWallet();
        contract = new Contract(
            import.meta.env.VITE_tokenAddress,
            tokenABI,
            provider.getSigner()
        );
        pricePerNft = await contract.getPricePerNft();
        totalSupply = await contract.getTotalSupply();
        latestMinted = await contract.getLatestMintedTokenId();
        tokenName = await contract.name();
    }
    async function minter() {
        const price = await contract.getPricePerNft();
        const mytokenURI = await contract.mint(qtyToMint, {
            value: price.mul(qtyToMint),
        });
        console.log(`Minted `);
    }

    async function showNFTs() {
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log(`accounts${accounts}`);
        const walletAccount = accounts[0];
        console.log(`wallet address ${walletAccount}`);
        NFTs = await getEthNFTs(walletAccount);
        console.log(NFTs);
    }
</script>

{#if contract}
    <!-- put something here -->
    <h1>You got here just in time.</h1>
    <p>There are only {totalSupply - latestMinted} {tokenName} left.</p>
    <h2>{latestMinted} of {totalSupply} minted so far.</h2>
    <div class="form-control">
       
        <label class="input-group">
            <span>QTY</span>
            <input
                type="text"
               class="input input-bordered"
               bind:value={qtyToMint}
            />
        </label>
        <button class="btn" on:click={minter}>Click here to MINT. 2 max per transaction</button>
    

    </div>
    <button
        class="btn"
        on:click={async () => {
            await showNFTs();
        }}>Click here to display your minted NFTS</button
    >
    {#if NFTs}
        <div class="grid grid-cols-4 gap-3">
            {#each NFTs as nft}
                <div>
                    <img src={nft.imageURL} alt={nft.name} />
                </div>
            {/each}
        </div>
    {/if}
{:else}
    <h1 class="text-5xl font-bold">CANTO WANTO</h1>
    <p class="py-6">
        If you missed the first round of Cantos and you want one, you came to the right place.
    </p>
    <button on:click={async () => connect()} class="btn btn-primary"
        >Connect Wallet</button
    >
{/if}
