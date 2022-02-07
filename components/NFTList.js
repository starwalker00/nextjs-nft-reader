import styled from 'styled-components';

const List = styled.ul`
height: 150px;
width: 80%;
min-height: 100%;
`;
const ListItem = styled.li`
border: 1px solid powderblue;
display:flex;
background: ghostwhite;
overflow-wrap: break-word;
justify-content: center;
align-items: center;
// justify-content: space-evenly;
margin: 10px;
&:hover {
    box-shadow: lightskyblue 0px 0px 9px 0px;
}
// max-width: 1080px;
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
    )
}

export default NFTList
