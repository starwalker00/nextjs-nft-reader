import styled from 'styled-components';
const Wrapper = styled.div`
padding:2em;
`;
const List = styled.ul`
height: 150px;
width: 100%;
`;
const ListItem = styled.li`
border: 1px dashed red;
display:flex;
background: papayawhip;
overflow;auto;
`;
const ImageItem = styled.img`
height: 150px;
`;

function NFTList({ nfts }) {
    return (
        <>
            <div>
                {nfts.totalCount}
            </div>
            <Wrapper>
                <List>
                    {nfts.ownedNfts.map(nft => (
                        <ListItem key={JSON.stringify(nft)}>
                            { // display video or image
                                nft.video ?
                                    <video height="150" controls>
                                        <source src={nft.video} />
                                    </video>
                                    :
                                    <ImageItem src={nft.image} alt={nft.title} />
                            }


                            {JSON.stringify(nft)}
                        </ListItem>
                    ))}
                </List>
            </Wrapper>
        </>
    )
}

export default NFTList
