import Borrower from './Borrower';
import {useState} from 'react';
import {observer} from 'mobx-react';
// import {runInAction} from 'mobx';
import React from 'react';
import BorrowerStore from '../stores/BorrowerStore';

const Borrowers =()=>{
    const [allborrowers,SetAllborrowers] =useState(BorrowerStore.Allborrows);
    const [editID,SeteditID] =useState("");
    const [mode,Setmode] =useState("show");
    const [name,SetName] =useState('');
    const [address,SetAddress] =useState('');
    const [phn,SetPhn] =useState('');
    const Changeid =(id)=>{
      SeteditID(id);
    }

    const search=(value) =>{
      SetAllborrowers(BorrowerStore.Allborrows.filter((t)=>{
        return t.name.match(new RegExp("^"+value,"gi"));
      }))
    }
    const addborrower=async ()=>{
      // console.log(name);
      // console.log(address);
      // console.log(phn);

      if(name.length()<3 || address.length()<3 || phn.length()<5){
        return;
      }
      // if(!this.state.password){
      //   return;
      // }
      try{
        let res =await fetch('/addborrower',{
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name, 
            address,
            phn
          })
        });
  
        let result = await res.json();
        //console.log(result);
        if(result && result.success){
          console.log("success");
          SetName('');
          SetAddress('');
          SetPhn('');
          // runInAction(()=> {
          //   UserStore.username=this.state.username;
          //   UserStore.isLoggedIn=true;
          //   this.props.setStatus(true);
          // });
        }else{
          // runInAction(()=>{
          //   UserStore.isLoggedIn=false;
          //   UserStore.username='';
          //   UserStore.isLoggedIn=true;
          // });
          alert("something went wrong");
        }
      }catch(e){
        // runInAction(()=>{
        //   UserStore.isLoggedIn=false;
        //   UserStore.username='';
        //   UserStore.isLoggedIn=true;
        // });
        console.log(e);
        alert("something went wrong");
      }
    }
    if(mode==="show"){
      return (
        <div className="borrowers">
          <button type="button" className="btn btn-outline-info mr-5" onClick={()=>Setmode("new borrower")}>
                  New Borrower
          </button>
          <div className="row">
            <input type="text" placeholder="Search (Enter id or Name)" onChange={(e)=>search(e.target.value)}></input>
          </div>        
          <div className="row"> 
            <table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>#ID No</th>
                  <th>Address</th>
                  <th>Phn No</th>
                  <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {allborrowers.map(t => 
                <Borrower key={t.id} borrower={t} editID={editID} Changeid={Changeid}
                />).slice(0,7)}
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
            <form className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder="Borrower Name" onChange={(e)=>SetName(e.target.value)} value={name}></input>
                <input type="text" placeholder="Address" onChange={(e)=>SetAddress(e.target.value)} value={address}></input>
                <input type="text" placeholder="Phone No" onChange={(e)=>SetPhn(e.target.value)} value={phn}></input>
                <button type="submit" className="btn btn-primary mt-5" onClick={()=>addborrower()}>Submit</button>
            </form>
        </div>
        </React.Fragment>
      );
    }
    
}
export default observer(Borrowers);