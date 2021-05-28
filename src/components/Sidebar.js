import React from 'react';
const Sidebar = (props)=>{
    return (
        <React.Fragment>
        <div className="sidebar">
          <ul className="">
            <li><button className="btn" style={props.choice==='Dashboard'?selectedcolor:other} onClick={()=>props.setContent('Dashboard')}>Dashboard</button></li>
            <li><button className="btn" style={props.choice==='Books'?selectedcolor:other} onClick={()=>props.setContent('Books')}>Books</button></li>
            <li><button className="btn" style={props.choice==='Borrowers'?selectedcolor:other} onClick={()=>props.setContent('Borrowers')}>Borrowers</button></li>
            <li><button className="btn" style={props.choice==='Bor-Books'?selectedcolor:other} onClick={()=>props.setContent('Bor-Books')}>Bor-Books</button></li>
          </ul>
        </div>
        </React.Fragment>
    );
}
export default Sidebar;

const selectedcolor={
  backgroundColor:'#26a69a'
}
const other={
  backgroundColor:'#3d4d4b'
}
