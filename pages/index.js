import Form from '../components/Form'
import NFTList from '../components/NFTList'
import NFTCount from '../components/NFTCount'
import CurrentAddress from '../components/CurrentAddress'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

let defaultOwnerAddress = "0xfa5d05df712b059b74ccefe4084785be7f2ea1b8";
let ownerAddress;

function Home({ nfts }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter();
  // Call this function whenever you want to refresh props
  const refreshData = (ownerAddress) => {
    router.replace({
      pathname: router.asPath.split('?')[0], // remove old parameters
      query: { ownerAddress: ownerAddress }
    });
    setIsRefreshing(true);
  }
  useEffect(() => {
    setIsRefreshing(false);
  }, [nfts]);
  return (
    <>
      <button onClick={() => refreshData(defaultOwnerAddress)}>HOME</button>
      <Form defaultOwnerAddress={defaultOwnerAddress} refreshData={refreshData} />
      {isRefreshing ? <span>loading...</span> : <span>loaded</span>}
      <CurrentAddress address={router.query.ownerAddress ? router.query.ownerAddress : defaultOwnerAddress} />
      <NFTCount totalCount={nfts.totalCount} />
      <NFTList nfts={nfts} />
    </>
  )
}

export async function getServerSideProps(context) {

  // 0. set eth address to query for nft list
  if (context.query.ownerAddress) {
    ownerAddress = context.query.ownerAddress; // get parameter from router.replace() call
  } else {
    ownerAddress = defaultOwnerAddress;
  }

  // 1. connect to API and get NFT list
  let nfts, web3;
  const apiKey = "demo";
  try {
    web3 = createAlchemyWeb3(
      `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    );
    nfts = await web3.alchemy.getNfts({
      owner: ownerAddress
    })
    // console.log(nfts);
    nfts.ownedNfts = nfts.ownedNfts.slice(0, 9); // keep only first 2 NFTs
    // console.log(nfts);
  } catch (error) {
    console.log("error fetching nft list");
    console.log(error);
  }

  // 2. fill metadatas for each NFT
  if (nfts.ownedNfts) {
    for (let [iter, nft] of nfts.ownedNfts.entries()) {
      try {
        const NftMetadata = await web3.alchemy.getNftMetadata({
          contractAddress: nft.contract.address,
          tokenId: nft.id.tokenId
        })
        console.log(NftMetadata)
        nfts.ownedNfts[iter].title = NftMetadata.title;

        // testing all cases, clean after everything is identified
        if (NftMetadata.metadata.image) {
          let HTTPUrl = NftMetadata.metadata.image;
          if (NftMetadata.metadata.image.startsWith('ipfs://')) {
            HTTPUrl = convertIPFStoHTTP(HTTPUrl);
          }
          if (HTTPUrl.endsWith('.webm')) {
            nfts.ownedNfts[iter].video = HTTPUrl;
          } else {
            nfts.ownedNfts[iter].image = HTTPUrl;
          }
        }
        else {
          nfts.ownedNfts[iter].image = "https://via.placeholder.com/150"
        }
        // console.log(nfts.ownedNfts[iter])
      } catch (error) {
        console.log("error fetching nft metadatas");
        console.log(error);
      }
    }
  } else {
    console.log(`${ownerAddress} does not own any NFT`);
  }

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
