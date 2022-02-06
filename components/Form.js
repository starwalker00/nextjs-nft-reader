function Form({ refreshData }) {
    const submitFunction = async event => {
        event.preventDefault()
        refreshData(event.target.address.value)
    }
    return (
        <form onSubmit={submitFunction}>
            <label htmlFor="address">Address</label>
            <input id="address" name="address" type="text" autoComplete="address" defaultValue="0xC33881b8FD07d71098b440fA8A3797886D831061" required />
            <button type="submit">Search</button>
        </form >
    )
}


export default Form