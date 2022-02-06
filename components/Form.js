function Form({ defaultOwnerAddress, refreshData }) {
    const submitFunction = async event => {
        event.preventDefault()
        refreshData(event.target.address.value)
    }
    return (
        <form onSubmit={submitFunction}>
            <label htmlFor="address">Address</label>
            <input id="address" name="address" type="text" autoComplete="address" defaultValue={defaultOwnerAddress} required />
            <button type="submit">Search</button>
        </form >
    )
}


export default Form