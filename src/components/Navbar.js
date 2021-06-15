import React from 'react';
const Navbar = (props)=>{
    return (
        <React.Fragment>
        <nav>
          <ul className="nav">
            <li className="nav-item ml-5">
              User: {props.user}
            </li>
          </ul>
      </nav>
        </React.Fragment>
    );
}
export default Navbar;
