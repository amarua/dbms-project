import React from 'react';
const Navbar = (props)=>{
    return (
        <React.Fragment>
        <nav>
        <div className="nav-wrapper">
          <span className="brand-logo">Library</span>
          <ul id="nav-mobile" className="right">
            <li><a href="#">Settings</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </nav>
        </React.Fragment>
    );
}
export default Navbar;
