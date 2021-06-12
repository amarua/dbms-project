import React from 'react';
// import UserStore from '../stores/UserStore';
import Dashboard from './Dashboard';
import Books from './Books';
import Borrowers from './Borrowers';
// import Bbooks from './Bbooks';
import SubmitButton from './SubmitButton';
const Content=(props)=>{
    //console.log(props);
    return (
        <div className="content-wrapper">
        <SubmitButton text={'Log Out'} disabled={false} onClick={()=>props.logout()}/>
        {props.option==='Dashboard'?<Dashboard/>:''}
        {props.option==='Books'?<Books/>:''}
        {props.option==='Borrowers'?<Borrowers/>:''}
        
        </div>
    )
}
export default Content;