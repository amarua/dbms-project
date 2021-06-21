import Borrower from './Borrower';
import {useState} from 'react';
import {observer} from 'mobx-react';
import {runInAction} from 'mobx';
import React from 'react';
import Alert from './Alert';
import BorrowerStore from '../stores/BorrowerStore';

const Borrowers =()=>{
    const [allborrowers,SetAllborrowers] =useState(BorrowerStore.Allborrows);
    const [editID,SeteditID] =useState("");
    const [mode,Setmode] =useState("show");
    const [borrower_name,SetName] =useState('');
    const [address,SetAddress] =useState('');
    const [phn,SetPhn] =useState('');
    const [addstatus,SetAddstatus]=useState(false);
    const Changeid =(borrower_id)=>{
      SeteditID(borrower_id);
    }

    const search=(value) =>{
      var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.\\";
      for (var i = 0; i < specialChars.length; i++) {
        value = value.replace(new RegExp("\\" + specialChars[i], "gi"), "");
      }
      SetAllborrowers(BorrowerStore.Allborrows.filter((t)=>
        t.borrower_name.match(new RegExp("[a-zA-Z]*"+value,"gi"))
      ));
    }
    const addborrower=async ()=>{

      if(borrower_name.length<3 || address.length<3 || phn.length<5){
        return;
      }

      try{
        let res =await fetch('/addborrower',{
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            borrower_name, 
            address,
            phn
          })
        });
  
        let result = await res.json();
        //console.log(result);
        if(result && result.success){
          SetAddstatus(true);
          console.log("success");
          SetName('');
          SetAddress('');
          SetPhn('');

          SetAllborrowers((prev)=> [...prev,
            {
                borrower_id: (prev.length+1).toString(),
                borrower_name:borrower_name,
                address:address,
                phn:phn
        }]);

        runInAction(()=>{
          BorrowerStore.Allborrows=[...BorrowerStore.Allborrows,
              {
                borrower_id: (BorrowerStore.Allborrows.length+1).toString(),
                borrower_name:borrower_name,
                address:address,
                phn:phn
              }]
        });

        }else{
          console.log("something went wrong");
        }
      }catch(e){
        console.log(e);
        console.log("something went wrong");
      }
    }
    if(mode==="show"){
      return (
        <div className="borrowers">
          <button type="button" className="btn btn-outline-info mr-5" onClick={()=>Setmode("new borrower")}>
                  New Borrower
          </button>
          <div className="row">
            <input type="text" placeholder="Search (Enter borrower id or borrower name)" onChange={(e)=>search(e.target.value)}></input>
          </div>        
          <div className="table-wrapper"> 
            <table>
            <thead>
              <tr className="table-info">
                  <th>Name</th>
                  <th>#ID</th>
                  <th>Address</th>
                  <th>Phn No</th>
                  <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {allborrowers.slice(0,20).sort((a,b) =>a.borrower_name.localeCompare(b.borrower_name)).map(t => 
                <Borrower key={t.borrower_id} borrower={t} editID={editID} Changeid={Changeid} SetAllborrowers={SetAllborrowers}
                />)}
            </tbody>
        </table>
          </div>
        </div>
      )
    }else{
      return (
        <React.Fragment>
          <button className="btn btn-primary m-4" onClick={()=>Setmode("show")}>Back</button>
          <div className="borrow-from">
          {addstatus?<Alert type="success" msg="New Borrower Created"/>:null}
            <form className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder="Borrower borrower_name" onChange={(e)=>SetName(e.target.value)} value={borrower_name}></input>
                <input type="text" placeholder="Address" onChange={(e)=>SetAddress(e.target.value)} value={address}></input>
                <input type="text" placeholder="Phone No" onChange={(e)=>SetPhn(e.target.value)} value={phn}></input>
                <button type="submit" className="btn btn-primary mt-5" onClick={()=>addborrower()}>Submit</button>
            </form>
        </div>
        </React.Fragment>
      );
    }
    
}
export default Borrowers;