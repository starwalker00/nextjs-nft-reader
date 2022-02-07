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
overflow-wrap: break-word;
justify-content: center;
align-items: center;
`;
const ImageItem = styled.img`
height: 150px;
`;
const NFTTitle = styled.h2`
padding-left:2em;
padding-right:2em;
`;
const JSONString = styled.span`
text-align:center;
overflow:auto;
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
                            { // display title if it exists
                                nft.title ?
                                    <NFTTitle>{nft.title}</NFTTitle>
                                    :
                                    <NFTTitle>No title</NFTTitle>
                            }
                            <JSONString>{JSON.stringify(nft)}</JSONString>
                        </ListItem>
                    ))}
                </List>
            </Wrapper>
        </>
    )
}

export default NFTList
