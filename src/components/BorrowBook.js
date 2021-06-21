import React,{useState} from 'react';
import BorrowerStore from '../stores/BorrowerStore';
import BookStore from '../stores/BookStore';
import BookSearchResult from './BookSearchResult';
import BorrowerSearchResult from './BorrowerSearchResult';
import Alert from './Alert';
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
        if(value==='' || value.length===0){
            SetAllborrowers([]);
            return ;
        }
        if(value.search("\\)") ===-1 && value.search("\\(")===-1){
            SetAllborrowers(BorrowerStore.Allborrows.filter((t)=>
                t.borrower_name.match(new RegExp("^"+value,"gi"))
            ));
        }
        
    }

    const searchbook =(value) =>{
        SetBookname(value);
        if(value==='' || value.length===0){
            SetAllbooks([]);
            return;
        }
        if(value.search("\\)") ===-1 && value.search("\\(")===-1){
            SetAllbooks(BookStore.Allbooks.filter( (t) =>
                t.book_name.match(new RegExp("^"+value,"gi"))
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
        if(borrower_id.length<1 || book_id.length<1 || days<1){
            console.log("uessdf")
          return;
        }  
        try{
            let d=new Date();
            let borrow_date=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
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
                    borrow_date: borrow_date,
                    borrow_for: days
                })
            });
    
          let result = await res.json();
          //console.log(result);
          if(result && result.success){
            SetRequeststatus(true);
            SetBookname('');
            borrowername('');
            //     SetAddstatus(true);
            //     console.log("success");
            //     SetName('');
            //     SetAddress('');
            //     SetPhn('');
    
            //     SetAllborrowers((prev)=> [...prev,
            //       {
            //           borrower_id: (prev.length+1).toString(),
            //           borrower_name:borrower_name,
            //           address:address,
            //           phn:phn
            //   }]);
    
            //   runInAction(()=>{
            //     BorrowerStore.Allborrows=[...BorrowerStore.Allborrows,
            //         {
            //           borrower_id: (BorrowerStore.Allborrows.length+1).toString(),
            //           borrower_name:borrower_name,
            //           address:address,
            //           phn:phn
            //         }]
            //   });
    
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