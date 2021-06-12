import Borrower from './Borrower';
import {useState,useEffect} from 'react';
import {observer} from 'mobx-react';
// import {runInAction} from 'mobx';
import BorrowerStore from '../stores/BorrowerStore';

const Borrowers =()=>{
    const [allborrowers,SetAllborrowers] =useState(BorrowerStore.Allborrows);
    const [editID,SeteditID] =useState("");
    const Changeid =(id)=>{
       console.log('Edit button clicked');
      // SetAllborrowers([...allborrowers,{name:"Alvin",
      // id:"234234234"+"3",
      // add:"Balurghat",
      // phn: "8597589685"}]);
      // runInAction(()=> {
      //   BorrowerStore.Allborrows.push( {name:"Alvin",
      //   id:"234234234"+"3",
      //   add:"Balurghat",
      //   phn: "8597589685"});
      // });
      SeteditID(id);
    }
    
    return (
        <div className="borrowers">
          <div className="row"><input type="text" placeholder="Search (Enter Roll or Name"></input></div>

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
              {allborrowers.map(t => <Borrower key={t.id} borrower={t} editID={editID} Changeid={Changeid}/>)}
            </tbody>
        </table>
          </div>
        </div>
    )
}
export default observer(Borrowers);