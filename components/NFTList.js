function NFTList({ nfts }) {
    return (
        <>
            <div>
                {nfts.totalCount}
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
