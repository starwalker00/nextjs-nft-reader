import styled from 'styled-components';

const FormStyled = styled.form`
padding: 2em;
`;
const ButtonStyled = styled.button`
padding: 0.25em 1em;
margin-left: 0.1em;
`;
const InputStyled = styled.input`
padding: 0.25em 1em;
`;

function Form({ defaultOwnerAddress, refreshData }) {
    const submitFunction = async event => {
        event.preventDefault()
        refreshData(event.target.address.value)
    }
    return (
        <FormStyled onSubmit={submitFunction}>
            {/* <label htmlFor="address">Address : </label> */}
            <InputStyled id="address" name="address" type="text" autoComplete="address" defaultValue={defaultOwnerAddress} size="46" required />
            <ButtonStyled type="submit">Search</ButtonStyled>
        </FormStyled >
    )
}

export default Form
