import React, { useState } from 'react';
import {runInAction} from 'mobx';
import BorrowerStore from '../stores/BorrowerStore';
const Borrower = ({borrower,editID,Changeid,SetAllborrowers}) => {
    const [editName,SeteidtName] = useState(borrower.name);
    const [editadd,Setaditadd]=useState(borrower.address);
    const [editphn,Seteditphn] = useState(borrower.phn);
    const id=borrower.id;

    const editborrower=async (id)=>{

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
                id:id,
                name:editName, 
                address:editadd,
                phn:editphn
            })
          });
    
          let result = await res.json();
          //console.log(result);
          if(result && result.success){
            console.log("success");
            Changeid('');
            SetAllborrowers((prev)=> [...prev.filter(t=> t.id!==id),
                {
                    id:id,
                    name:editName,
                    address:editadd,
                    phn:editphn
            }]);

            runInAction(()=>{
            BorrowerStore.Allborrows=[...BorrowerStore.Allborrows.filter(t=> t.id!==id),
                {
                    id:id,
                    name:editName,
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
        if(editID===borrower.id){
            return(
                <tr>
                    <td><input type="text" defaultValue={editName} onChange={(e)=>{SeteidtName(e.target.value)}}></input></td>
                    <td>#{borrower.id}</td>
                    <td><input type="text" defaultValue={editadd}  onChange={(e)=>{Setaditadd(e.target.value)}}></input></td>
                    <td><input type="text" defaultValue={editphn}  onChange={(e)=>{Seteditphn(e.target.value)}}></input></td>
                    <td>
                        <i className="fa fa-floppy-o" aria-hidden="true" onClick={()=> editborrower(borrower.id)}></i>
                    </td>
                </tr>
            )
        }else{
            return(
                <tr>
                    <td>{borrower.name}</td>
                    <td>#{borrower.id}</td>
                    <td>{borrower.address}</td>
                    <td>{borrower.phn}</td>
                    <td>
                        <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={()=> Changeid(borrower.id)}></i>
                    </td>
                </tr>
            )
            
        }
            
    }
    return show();
}
 
export default Borrower;