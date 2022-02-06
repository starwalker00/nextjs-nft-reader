import Form from '../components/Form'
import NFTList from '../components/NFTList'

import { useRouter } from 'next/router';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

let defaultOwnerAddr = "0xfa5d05df712b059b74ccefe4084785be7f2ea1b8";

function Home({ nftcount, nfts }) {
  const router = useRouter();

  // Call this function whenever you want to refresh props
  const refreshData = (ownerAddr) => {
    router.replace({
      pathname: router.asPath.split('?')[0], // remove old parameters
      query: { ownerAddr: ownerAddr }
    })
  }
  return (
    <div>
      <NFTList nftcount={nftcount} nfts={nfts} />
      <Form refreshData={refreshData} />
    </div>
  )
}

export async function getServerSideProps(context) {
  let ownerAddr;
  if (context.query.ownerAddr) {
    ownerAddr = context.query.ownerAddr; // get parameter from router.replace() call
  } else {
    ownerAddr = defaultOwnerAddr;
  }
  const apiKey = "demo";
  const web3 = createAlchemyWeb3(
    `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
  );
  const nfts = await web3.alchemy.getNfts({
    owner: ownerAddr
  })
  const nftcount = 2;
  console.log(nfts)
  // Pass data to the page via props
  return { props: { nftcount, nfts } }
}

export default Home
