import React, { useState } from 'react';
// Parent is Return Book
import {runInAction} from 'mobx';
import BorrowingStore from '../stores/BorrowingStore';
import BookStore from '../stores/BookStore';
const Borrows =({record,Setrecord})=>{
    const [status,setStatus]=useState(record.status==='pending'?'danger':'success');
    let statusStyle='badge badge-'+status;
    const mark_as_return=async ()=>{
        try{
          let res =await fetch('/mark_as_returnRequest',{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                borrowing_id:record.borrowing_id
            })
          });
    
          let result = await res.json();
          //console.log(result);
          if(result && result.success){
            console.log("success");
            setStatus('success');
            Setrecord((prev)=> [...prev.filter(t=> t.borrowing_id!==record.borrowing_id),
                {
                    borrowing_id:record.borrowing_id,
                    borrower_name:record.borrower_name,
                    author:record.author,
                    book_name: record.book_name,
                    borrow_date: record.borrow_date,
                    return_date: record.return_date,
                    status: 'reterned'
            }]);
            // runInAction(()=>{
            // BookStore.Allbooks=[...BookStore.Allbooks.filter(t=> {
            //     if(t.book_name!==record.book_name){
            //         return true;
            //     }else{
            //         t.avaliable+=1;
            //         return true;
            //     }
            // })]
            // });

          }else{
            console.log("something went wrong");
          }
        }catch(e){
          console.log(e);
          console.log("something went wrong");
        }
      }


    return(
        <tr>
            <td>
                <div className="book-cell">
                    <div className="row">
                        <div className="col font-weight-bold">Name: </div>
                        <div  className="col">{record.book_name}</div>
                    </div>
                    <div className="row">
                        <div className="col font-weight-bold">Author: </div>
                        <div  className="col">{record.author}</div>
                    </div>
                    <div className="row">
                        <div className="col font-weight-bold">Status: </div>
                        <div  className="col">
                            <span className={statusStyle} style={styles1}>{record.status}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td>{record.borrower_name}</td>
            <td>{record.borrow_date.substr(0,record.borrow_date.search("T"))}</td>
            <td>{record.return_date.substr(0,record.return_date.search("T"))}</td>
            <td><button className="btn" style={styles2}
            onClick={()=> mark_as_return()} disabled={status==='danger'?false:true}>mark as return</button></td>
        </tr>
    )
}

const styles1 ={
    color: "white",
    fontSize: 10
}
const styles2 =
{   backgroundColor: "#d77486",
    width: 113,
    fontSize: 10
}
export default Borrows;