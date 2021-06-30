import React,{useState} from 'react';
import {runInAction} from 'mobx';
import BorrowerStore from '../stores/BorrowerStore';
import BookStore from '../stores/BookStore';
import BorrowingStore from '../stores/BorrowingStore';
import BookSearchResult from './BookSearchResult';
import BorrowerSearchResult from './BorrowerSearchResult';
import Alert from './Alert';
import moment from 'moment';
const BorrowBook=()=>{
    const [bookname,SetBookname]=useState('');
    const [borrowername,SetBorrowername]=useState('');
    const [book_id,SetBookid]=useState('');
    const [borrower_id,SetBorrowernid]=useState('');
    const [allborrowers,SetAllborrowers] =useState([]);
    const [allbooks,SetAllbooks] =useState([]);
    const [days,Setdays]=useState('');
    const [Requeststatus,SetRequeststatus]=useState(false);
    const searchborrower=(value) =>{
        SetBorrowername(value);
        SetRequeststatus(false);
        if(value==='' || value.length===0){
            SetAllborrowers([]);
            return ;
        }
        var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.\\";
        for (var i = 0; i < specialChars.length; i++) {
            value = value.replace(new RegExp("\\" + specialChars[i], "gi"), "");
        }
        SetAllborrowers(BorrowerStore.Allborrows.filter((t)=>
            t.borrower_name.match(new RegExp("[a-zA-Z]*"+value,"gi"))
        ));
        
    }

    const searchbook =(value) =>{
        SetRequeststatus(false);
        SetBookname(value);
        if(value==='' || value.length===0){
            SetAllbooks([]);
            return;
        }
        var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.\\";
        for (var i = 0; i < specialChars.length; i++) {
            value = value.replace(new RegExp("\\" + specialChars[i], "gi"), "");
        }
        if(value.search("\\)") ===-1 && value.search("\\(")===-1){
            SetAllbooks(BookStore.Allbooks.filter( (t) =>
                t.book_name.match(new RegExp("[a-zA-Z]*"+value,"gi"))&&(t.avaliable>0)
            ));
        }

        
    }

    const SetBook=(id,name)=>{
        SetBookname(name +" ( ID: #"+id+" )");
        SetBookid(id);
        SetAllbooks([]);
    }
    const SetBorrower=(id,name)=>{
        SetBorrowername(name +" ( ID: #"+id+" )");
        SetBorrowernid(id);
        SetAllborrowers([]);
    }

    const BorrowRequest=async ()=>{
        if(borrower_id.length<1 || book_id.length<1 || days===0){
            // console.log("uessdf")
          return;
        }  
        try{
            //let d=new Date();
            //let borrow_date=d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate();
            let res =await fetch('/borrowrRequest',{
                method: 'post',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    borrower_id: borrower_id,
                    book_id: book_id,
                    status:'pending',
                    borrow_date: moment().format('YYYY/MM/DD'),
                    borrow_for: days
                })
            });
    
          let result = await res.json();
          //console.log(result);
          if(result && result.success){
                SetRequeststatus(true);
                SetBookname('');
                SetBorrowername('');
                console.log("success");

                runInAction(()=>{
                    console.log('inside runInAction request borrow book');
                    BorrowingStore.Allborrowing=result.msg;
                    for( let i in BookStore.Allbooks){
                        if(BookStore.Allbooks[i].book_id===book_id){
                          BookStore.Allbooks[i].avaliable=parseInt(BookStore.Allbooks[i].avaliable)-1;
                          break;
                        }
                    }
                });

            }else{
                console.log("something went wrong");
            }
            }catch(e){
                console.log(e);
                console.log("something went wrong");
            }
        }

    return (
        <div className="borrow-from">
        {Requeststatus?<Alert type="success" msg="Request successful"/>:null}
            <form className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder="Borrower Name" onChange={(e)=>searchborrower(e.target.value)} value={borrowername}></input>
                <div className="search-result-container">
                    {allborrowers.map(t=> <BorrowerSearchResult list={t} key={t.borrower_id} SetBorrower={SetBorrower}/>)}
                </div>
                <input type="text" placeholder="Book name" onChange={(e)=>searchbook(e.target.value)} value={bookname}></input>
                <div className="search-result-container">
                    {allbooks.map(t=> <BookSearchResult list={t} key={t.book_id} SetBook={SetBook}/>)}
                </div>
                <select className="form-select" aria-label="Default select example" onChange={(e)=> Setdays(e.target.value)}>
                    <option defaultValue="0">For how many days</option>
                    <option value="7">Sevel days</option>
                    <option value="15">Fifteen days</option>
                    <option value="30">Thirty days</option>
                </select>
                <button type="submit" className="btn btn-primary mt-5" onClick={()=>BorrowRequest()}>Submit</button>
            </form>
        </div>
    );
}
export default BorrowBook;