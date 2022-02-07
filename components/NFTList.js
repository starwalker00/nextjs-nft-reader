function NFTList({ nfts }) {
    return (
        <>
            <div>
                {nfts.totalCount}
            </div>
            <div>
                <ul>
                    {nfts.ownedNfts.map(nft => (
                        <li key={JSON.stringify(nft)}>
                            <img src={nft.image} alt={nft.title} />
                            {JSON.stringify(nft)}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NFTList
