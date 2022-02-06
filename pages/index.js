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
      query: { ownerAddr: ownerAddress }
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
  const nftcount = 2;
  // console.log(nfts);
  nfts.ownedNfts = nfts.ownedNfts.slice(0, 9); // keep only first 10 NFTs
  console.log(nfts);

  // Pass data to the page via props
  return { props: { nfts } }
}

export default Home
