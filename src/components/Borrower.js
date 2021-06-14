import React, { useState,useEffect } from 'react';
const Borrower = ({borrower,editID,Changeid}) => {
    const [editName,SeteidtName] = useState(borrower.name);
    const [editadd,Setaditadd]=useState(borrower.add);
    const [editphn,Seteditphn] = useState(borrower.phn);

    const show=() =>{
        if(editID===borrower.id){
            return(
                <tr>
                    <td><input type="text" defaultValue={editName} onChange={(e)=>{SeteidtName(e.target.value)}}></input></td>
                    <td>#{borrower.id}</td>
                    <td><input type="text" defaultValue={editadd}  onChange={(e)=>{Setaditadd(e.target.value)}}></input></td>
                    <td><input type="text" defaultValue={editphn}  onChange={(e)=>{Seteditphn(e.target.value)}}></input></td>
                    <td>
                        <i className="fa fa-floppy-o" aria-hidden="true" onClick={()=> Changeid('')}></i>
                    </td>
                </tr>
            )
        }else{
            return(
                <tr>
                <td>{borrower.name}</td>
                <td>#{borrower.id}</td>
                <td>{borrower.add}</td>
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