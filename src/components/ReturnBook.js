import React,{useState} from 'react';
import {observer} from 'mobx-react';
import Borrows from './Borrows';
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
                {results.slice(0,5).map(t =>{
                    return(
                        <div className="result-cell" key={t.id} onClick={()=>Breturn(t.id)}>
                            <span className="result">{t.borrower}</span>
                            <span className="result">({t.book}</span>
                            <span className="result">{t.author})</span>
                            <br/>
                        </div>)
                })}
            </div>

            <table>
              <thead>
                <tr  className="table-info">
                    <th>Book</th>
                    <th>Borrower</th>
                    <th>Date Borrowed</th>
                    <th>Returning Date</th>
                    <th>Action</th>
                </tr>
              </thead>

              <tbody>
              {BorrowingStore.Allborrowing.slice(0,7).map(t =>{
                return(
                    <Borrows key={t.id}/>)
            })}
              </tbody>
            </table>
        </div>
    );
}

export default observer(ReturnBook);