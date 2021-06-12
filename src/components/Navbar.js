import React from 'react';
const Navbar = (props)=>{
    return (
        <React.Fragment>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" aria-disabled="true">Disabled</a>
            </li>
          </ul>
      </nav>
        </React.Fragment>
    );
}
export default Navbar;
