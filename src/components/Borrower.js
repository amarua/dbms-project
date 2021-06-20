import React, { useState } from 'react';
import {runInAction} from 'mobx';
import BorrowerStore from '../stores/BorrowerStore';
const Borrower = ({borrower,editID,Changeid,SetAllborrowers}) => {
    const [editName,SeteidtName] = useState(borrower.borrower_name);
    const [editadd,Setaditadd]=useState(borrower.address);
    const [editphn,Seteditphn] = useState(borrower.phn);
    const borrower_id=borrower.borrower_id;

    const editborrower=async (borrower_id)=>{

        if(editName.length<3 || editadd.length<3 || editphn.length<4){
          return;
        }
        try{
          let res =await fetch('/editborrower',{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                borrower_id:borrower_id,
                borrower_name:editName, 
                address:editadd,
                phn:editphn
            })
          });
    
          let result = await res.json();
          //console.log(result);
          if(result && result.success){
            console.log("success");
            Changeid('');
            SetAllborrowers((prev)=> [...prev.filter(t=> t.borrower_id!==borrower_id),
                {
                    borrower_id:borrower_id,
                    borrower_name:editName,
                    address:editadd,
                    phn:editphn
            }]);

            runInAction(()=>{
            BorrowerStore.Allborrows=[...BorrowerStore.Allborrows.filter(t=> t.borrower_id!==borrower_id),
                {
                    borrower_id:borrower_id,
                    borrower_name:editName,
                    address:editadd,
                    phn:editphn
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


    const show=() =>{
        if(editID===borrower.borrower_id){
            return(
                <tr>
                    <td><input type="text" value={editName} onChange={(e)=>{SeteidtName(e.target.value)}}></input></td>
                    <td>#{borrower.borrower_id}</td>
                    <td><input type="text" value={editadd}  onChange={(e)=>{Setaditadd(e.target.value)}}></input></td>
                    <td><input type="text" value={editphn}  onChange={(e)=>{Seteditphn(e.target.value)}}></input></td>
                    <td>
                        <i className="fa fa-floppy-o" aria-hidden="true" onClick={()=> editborrower(borrower.borrower_id)}></i>
                    </td>
                </tr>
            )
        }else{
            return(
                <tr>
                    <td>{borrower.borrower_name}</td>
                    <td>#{borrower.borrower_id}</td>
                    <td>{borrower.address}</td>
                    <td>{borrower.phn}</td>
                    <td>
                        <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={()=> Changeid(borrower.borrower_id)}></i>
                    </td>
                </tr>
            )
            
        }
            
    }
    return show();
}
 
export default Borrower;