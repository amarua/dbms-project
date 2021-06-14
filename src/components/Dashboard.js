import returnbook from './img/returnbook1.png';
import borrow from './img/borrow.png';
import {useState} from 'react';
import React from 'react';
import ReturnBook from './ReturnBook';
import BorrowBook from './BorrowBook';
const Dashboard =()=>{
    const [item,SetItem] =useState("menu");
    const changeItem =(item)=>{
        // console.log(item);
        SetItem(item);
    }
    if(item==="menu")
        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col">
                        <h5>Return Book</h5>
                        <img src={returnbook} className="rounded mx-auto d-block" alt="Return Book" onClick={()=>changeItem('rb')}/>
                    </div>
                    <div className="col">
                        <h5>Borrow Book</h5>
                        <img src={borrow} className="rounded mx-auto d-block" alt="Borrow Book" onClick={()=>changeItem('bb')}/>
                    </div>
                </div>            
            </div>
        )
    else if(item==="rb"){
        return (
            <React.Fragment>
                <button className="btn btn-primary m-4" onClick={()=>changeItem('menu')}>Back</button>
                <ReturnBook/>
            </React.Fragment>
        )
    }else{
        return (
            <React.Fragment>
                <button className="btn btn-primary m-4" onClick={()=>changeItem('menu')}>Back</button>
                <BorrowBook/>
            </React.Fragment>
        )
    }
}
export default Dashboard;