const BookSearchResult =({list,SetBook})=>{
    if(list.avaliable<1){
        return null;
    }
    return (
        <div className="search-resul" onClick={()=>SetBook(list.book_id, list.book_name)}>
            <span className="mx-2">#{list.book_id}</span>
            <span className="mx-2">{list.book_name}</span>
            <span className="mx-2">{list.author}</span>
        </div>
    )
}
export default BookSearchResult;