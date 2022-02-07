import Form from '../components/Form'
import NFTList from '../components/NFTList'
import NFTCount from '../components/NFTCount'
import CurrentAddress from '../components/CurrentAddress'

import { useRouter } from 'next/router';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

let defaultOwnerAddress = "0xfa5d05df712b059b74ccefe4084785be7f2ea1b8";
let ownerAddress;


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
    <>
      <Form defaultOwnerAddress={defaultOwnerAddress} refreshData={refreshData} />
      <CurrentAddress address={router.query.ownerAddress ? router.query.ownerAddress : defaultOwnerAddress} />
      <NFTCount totalCount={nfts.totalCount} />
      <NFTList nfts={nfts} />
    </>
  )
}

export async function getServerSideProps(context) {
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
  nfts.ownedNfts = nfts.ownedNfts.slice(0, 9); // keep only first 2 NFTs
  // console.log(nfts);

  // fill metadatas for each NFT
  for (let [iter, nft] of nfts.ownedNfts.entries()) {
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
