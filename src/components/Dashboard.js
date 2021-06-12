import returnbook from './img/returnbook1.png';
import borrow from './img/borrow.png';
const Dashboard =()=>{
    return (
        <div className="dashboard">
            <div className="row">
                <div className="col">
                    <h5>Return Book</h5>
                    <img src={returnbook} className="rounded mx-auto d-block" alt="..."/>
                </div>
                <div className="col">
                    <h5>Borrow Book</h5>
                    <img src={borrow} className="rounded mx-auto d-block" alt="..."/>
                </div>
            </div>            
        </div>
    )
}
export default Dashboard;