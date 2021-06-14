import Borrower from './Borrower';
import {useState,useEffect} from 'react';
import {observer} from 'mobx-react';
// import {runInAction} from 'mobx';
import BorrowerStore from '../stores/BorrowerStore';

const Borrowers =()=>{
    const [allborrowers,SetAllborrowers] =useState(BorrowerStore.Allborrows);
    const [editID,SeteditID] =useState("");
    const Changeid =(id)=>{
      //console.log('Edit button clicked');
      SeteditID(id);
    }
    
    return (
        <div className="borrowers">
          <button type="button" className="btn btn-outline-info mr-5" onClick={null}>
                  New Borrower
          </button>
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
              {allborrowers.map(t => 
                <Borrower key={t.id} borrower={t} editID={editID} Changeid={Changeid}
                />)}
            </tbody>
        </table>
          </div>
        </div>
    )
}
export default observer(Borrowers);