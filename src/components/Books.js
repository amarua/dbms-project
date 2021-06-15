
import React, { useState } from 'react';
import Book from './Book';
const Books =()=>{
    const [mode,Setmode]=useState("show");
    const [name,SetName]=useState("");
    const [author,SetAuthor]=useState("");
    const [yop,SetYop]=useState("");
    const [publisher,SetPublisher]=useState("");
    const [quantity,SetQuantity]=useState("");
    const addbook=async ()=>{
      // console.log(name);
      // console.log(address);
      // console.log(phn);

      if(name.length<3 || author.length<3 || yop.length!==4){
        return;
      }
      // if(!this.state.password){
      //   return;
      // }
      try{
        let res =await fetch('/addbook',{
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name, 
            author,
            yop, 
            publisher,
            quantity
          })
        });
  
        let result = await res.json();
        //console.log(result);
        if(result && result.success){
          console.log("success");
          SetName('');
          SetAuthor('');
          SetYop('');
          SetPublisher('');
          SetQuantity('');
          // runInAction(()=> {
          //   UserStore.username=this.state.username;
          //   UserStore.isLoggedIn=true;
          //   this.props.setStatus(true);
          // });
        }else{
          // runInAction(()=>{
          //   UserStore.isLoggedIn=false;
          //   UserStore.username='';
          //   UserStore.isLoggedIn=true;
          // });
          alert("something went wrong");
        }
      }catch(e){
        // runInAction(()=>{
        //   UserStore.isLoggedIn=false;
        //   UserStore.username='';
        //   UserStore.isLoggedIn=true;
        // });
        console.log(e);
        alert("something went wrong");
      }
    }




    if(mode==="show"){
      return (
        <div className="books">
          <div className="row">
          
              <form action="#">
              <button type="button" className="btn btn-outline-info mr-5" onClick={()=>Setmode("add book")}>
                Add Book
              </button>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>All</span>
                  </label>
                  </p>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>sci</span>
                  </label>
                  </p>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>arts</span>
                  </label>
                  </p>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>com</span>
                  </label>
                  </p>
                  <input type="text" placeholder="Search"></input>
              </form>

              
          </div>
          <div className="table-wrapper"> 
            <table>
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Avaliable Stock</th>
                    <th>Item Price</th>
                    <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
              </tbody>
            </table>
          </div>
            
        </div>
      )
    }else{
      return (<React.Fragment>
        <button className="btn btn-primary m-4" onClick={()=>Setmode("show")}>Back</button>
        <div className="borrow-from">
          <form className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onSubmit={(e)=>e.preventDefault()}>
              <input type="text" placeholder="Book Name" onChange={(e)=>SetName(e.target.value) } value={name}></input>
              <input type="text" placeholder="Author" onChange={(e)=>SetAuthor(e.target.value)} value={author}></input>
              <input type="text" placeholder="year of publish" onChange={(e)=>SetYop(e.target.value)} value={yop}></input>
              <input type="text" placeholder="publisher" onChange={(e)=>SetPublisher(e.target.value)} value={publisher}></input>
              <input type="text" placeholder="Quantity" onChange={(e)=>SetQuantity(e.target.value)} value={quantity}></input>
              <button type="submit" className="btn btn-primary mt-5" onClick={()=>addbook()}>Submit</button>
          </form>
        </div>
        </React.Fragment>
      );
    }
    
}
export default Books;