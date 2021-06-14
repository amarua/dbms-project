import React,{useState} from 'react';
import {observer} from 'mobx-react';
import BorrowingStore from '../stores/BorrowingStore';
const ReturnBook=()=>{
    const [results,Setresult]=useState([]);
    const find=(e)=>{
        if(e==='' || e===null){
            Setresult([]);
            return;
        }
        Setresult(BorrowingStore.Allborrowing.filter(x=> 
            {
                if(x.borrower.match(new RegExp("^"+e))||x.book.match(new RegExp("^"+e))){
                    return true;
                }
                return false;
            }));
    }

    const Breturn=(id)=>{
        console.log(id);
    }
    return (
        <div className="return-from">
            <form>
                <input type="text" placeholder="Enter bookname or borrower name" onChange={(e)=>find(e.target.value)}></input>
            </form>
            <div className="search-results">
                {results.map(t =>{
                    return(
                        <div className="result-cell" key={t.id} onClick={()=>Breturn(t.id)}>
                            <span className="result">{t.borrower}</span>
                            <span className="result">({t.book}</span>
                            <span className="result">{t.author})</span>
                            <br/>
                        </div>)
                }).slice(0,5)}
            </div>
        </div>
    );
}

// const searchWithName={
//     fontWidth:600
// }
// const searchWithName={
//     fontWidth:400
// }
export default observer(ReturnBook);