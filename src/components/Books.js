
import React, { useState } from 'react';
import Book from './Book';
import BookStore from '../stores/BookStore';
import {runInAction} from 'mobx';
import Alert from './Alert';
const Books =()=>{
    const [allbooks,SetAllbooks] =useState(BookStore.Allbooks);
    const [editID,SeteditID] =useState("");
    const [mode,Setmode]=useState("show");
    const [name,SetName]=useState("");
    const [author,SetAuthor]=useState("");
    const [yop,SetYop]=useState("");
    const [publisher,SetPublisher]=useState("");
    const [quantity,SetQuantity]=useState("");
    const [addstatus,SetAddstatus]=useState(false);
    const find =(value) =>{
      SetAllbooks(BookStore.Allbooks.filter(t=>
        t.name.match(new RegExp("^"+value,"gi"))
      ));
    }
    const addbook=async ()=>{

      if(name.length<3 || author.length<3 || yop.length!==4){
        return;
      }
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
          SetAddstatus(true);
          SetName('');
          SetAuthor('');
          SetYop('');
          SetPublisher('');
          SetQuantity('');
          SetAllbooks((prev)=> [...prev,
            {
                id: (prev.length+1).toString(),
                name:name,
                author:author,
                quantity:quantity,
                avaliable:quantity,
                publisher:publisher,
                yop:yop
        }]);

        runInAction(()=>{
          BookStore.Allbooks=[...BookStore.Allbooks,
              {
                  id: (BookStore.Allbooks.length+1).toString(),
                  name:name,
                  author:author,
                  quantity:quantity,
                  avaliable:quantity,
                  publisher:publisher,
                  yop:yop
              }]
        });

        }else{
          alert("something went wrong");
        }
      }catch(e){
        console.log(e);
        alert("something went wrong");
      }
    }


    const Changeid =(value)=>{
      SeteditID(value);
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
                  <input type="text" placeholder="Search" onChange={(e)=>find(e.target.value)}></input>
              </form>

              
          </div>
          <div className="table-wrapper"> 
            <table>
              <thead>
                <tr  className="table-info">
                    <th>Name</th>
                    <th>Author</th>
                    <th>Total Quantity</th>
                    <th>Avaliable Stock</th>
                    <th>Publisher</th>
                    <th>Published In</th>
                    <th>Action</th>
                </tr>
              </thead>

              <tbody>
              {allbooks.slice(0,7).sort((a,b)=>a.name.localeCompare(b.name)).map(t => 
                <Book key={t.id} book={t} editID={editID} Changeid={Changeid} SetAllbooks={SetAllbooks}
                />) }
              </tbody>
            </table>
          </div>
            
        </div>
      )
    }else{
      return (<React.Fragment>
        <button className="btn btn-primary m-4" onClick={()=>Setmode("show")}>Back</button>
        <div className="borrow-from">
        {addstatus? <Alert type="success" msg="Book Addred"/>:null}
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