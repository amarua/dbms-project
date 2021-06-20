import React, { useState } from 'react';
const Borrows =()=>{
    const [status,setStatus]=useState("danger");
    let statusStyle="badge badge-pill badge-"+status;
    return(
        <tr>
            <td>
                <div className="book-cell">
                    <div className="row">
                        <div className="col font-weight-bold">Name: </div>
                        <div  className="col">Operating System</div>
                    </div>
                    <div className="row">
                        <div className="col font-weight-bold">Author: </div>
                        <div  className="col">Galvin</div>
                    </div>
                    <div className="row">
                        <div className="col font-weight-bold">Status: </div>
                        <div  className="col">
                            <span className={statusStyle} style={styles}>Pending</span>
                        </div>
                    </div>
                </div>
            </td>
            <td>Amar sarkar</td>
            <td>02/10/2020</td>
            <td>12/10/2020</td>
            <td><button className="btn" style={{backgroundColor: "#d77486"}}>mark as return</button></td>
        </tr>
    )
}

const styles ={
    color: "white",
    fontSize: 10
}
export default Borrows;