function NFTList({ nftcount, nfts }) {
    return (
        <>
            <div>
                {nftcount}
            </div>
            <div>
                {/* {JSON.stringify(nfts)} */}
                <ul>
                    {nfts.ownedNfts.map(nftContract => (
                        <li key={JSON.stringify(nftContract)}>{JSON.stringify(nftContract)}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NFTList
