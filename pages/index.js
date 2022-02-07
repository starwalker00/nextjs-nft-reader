import Form from '../components/Form'
import NFTList from '../components/NFTList'

import { useRouter } from 'next/router';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

let defaultOwnerAddress = "0xfa5d05df712b059b74ccefe4084785be7f2ea1b8";

function Home({ nfts }) {
  const router = useRouter();

  // Call this function whenever you want to refresh props
  const refreshData = (ownerAddress) => {
    router.replace({
      pathname: router.asPath.split('?')[0], // remove old parameters
      query: { ownerAddress: ownerAddress }
    })
  }
  return (
    <div>
      <Form defaultOwnerAddress={defaultOwnerAddress} refreshData={refreshData} />
      <NFTList nfts={nfts} />
    </div>
  )
}

export async function getServerSideProps(context) {
  let ownerAddress;
  if (context.query.ownerAddress) {
    ownerAddress = context.query.ownerAddress; // get parameter from router.replace() call
  } else {
    ownerAddress = defaultOwnerAddress;
  }
  const apiKey = "demo";
  const web3 = createAlchemyWeb3(
    `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
  );
  let nfts = await web3.alchemy.getNfts({
    owner: ownerAddress
  })
  // console.log(nfts);
  nfts.ownedNfts = nfts.ownedNfts.slice(0, 2); // keep only first 2 NFTs
  // console.log(nfts);

  // fill metadatas for each NFT
  // for (const nft of nfts.ownedNfts) {
  //   console.log(`${nft.contract}`);
  // }
  for (let [iter, nft] of nfts.ownedNfts.entries()) {
    // nfts.ownedNfts[i] = 'f'; // change value
    const NftMetadata = await web3.alchemy.getNftMetadata({
      contractAddress: nft.contract.address,
      tokenId: nft.id.tokenId
    })
    console.log(NftMetadata)
    nfts.ownedNfts[iter].title = NftMetadata.title;
    nfts.ownedNfts[iter].image = NftMetadata.metadata.image;
    // nfts.ownedNfts[iter].image = NftMetadata.tokenUri.gateway;

    console.log(nfts.ownedNfts[iter])
  }
  // NFT Metadata
  // const response = await web3.alchemy.getNftMetadata({
  //   contractAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  //   tokenId: "1590"
  // })
  // console.log(response);
  // console.log(response.title);
  // console.log(response.id.tokenId);
  // console.log(response.metadata.image);
  // convertIPFStoHTTP(response.metadata.image);

  // Pass data to the page via props
  return { props: { nfts } }
}

function convertIPFStoHTTP(ipfsURL) {
  let ipfsGateway = "https://ipfs.io/ipfs/";
  let HTTPUrl = ipfsGateway.concat(ipfsURL.substring(7));
  console.log(HTTPUrl);
  return HTTPUrl;
}
export default Home
