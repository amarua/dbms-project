import React from 'react';
const BorrowBook=()=>{
    return (
        <div className="borrow-from">
            <form className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder="Borrower Name" onChange={null}></input>
                <input type="text" placeholder="Book name" onChange={null}></input>
                <select class="form-select" aria-label="Default select example">
                    <option selected>For how many days</option>
                    <option defaultValue="7">Sevel days</option>
                    <option defaultValue="15">Fifteen days</option>
                    <option defaultValue="30">Thirty days</option>
                </select>
                <button type="submit" className="btn btn-primary mt-5">Submit</button>
            </form>
        </div>
    );
}
export default BorrowBook;