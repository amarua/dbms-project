import React,{useState} from 'react';
import {observer} from 'mobx-react';
import Borrows from './Borrows';
import BorrowingStore from '../stores/BorrowingStore';
const ReturnBook=()=>{
    const [results,Setresult]=useState(BorrowingStore.Allborrowing);
    const find=(value)=>{
      var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.\\";
      for (var i = 0; i < specialChars.length; i++) {
          value = value.replace(new RegExp("\\" + specialChars[i], "gi"), "");
      }
        Setresult(BorrowingStore.Allborrowing.filter((t)=>
          t.borrower_name.match(new RegExp("[a-zA-Z]*"+value,"gi"))||t.book_name.match(new RegExp("[a-zA-Z]*"+value,"gi"))
        ));
      }

    const Breturn=(id)=>{
        console.log(id);
    }
    
    return (
        <div className="return-from">
            <form>
                <input type="text" placeholder="Enter bookname or borrower name" onChange={(e)=>find(e.target.value)}></input>
            </form>
            

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
              {results.sort((a,b) =>b.status ==='returned'?-1:1).map(t =>{
                return(
                    <Borrows key={t.borrowing_id} record={t} Setresult={Setresult}/>)
            })}
              </tbody>
            </table>
        </div>
    );
}

export default ReturnBook;