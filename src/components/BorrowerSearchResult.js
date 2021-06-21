const BorrowerSearchResult =({list,SetBorrower})=>{
    return (
        <div className="search-resul" onClick={()=>SetBorrower(list.borrower_id, list.borrower_name)}>
            <span className="mx-2">#{list.borrower_id}</span>
            <span className="mx-2">{list.borrower_name}</span>
            <span className="mx-2">{list.address}</span>
        </div>
    )
}
export default BorrowerSearchResult;