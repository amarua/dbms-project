import React, { useState } from 'react';
import BookStore from '../stores/BookStore';
import {runInAction} from 'mobx';
const Book = ({book,editID,Changeid,SetAllbooks}) => {
    const [editName,SeteidtName] = useState(book.name);
    const [editAuthor,SeteditAuthor] = useState(book.author);
    const [editpublisher,SeteditPublisher] = useState(book.publisher);
    const [edityop,SeteditYop] = useState(book.yop);
    const avl=book.avaliable;
    const pub=book.quantity;
    const editbook=async (id)=>{
        // console.log(name);
        // console.log(address);
        // console.log(phn);
  
        if(editName.length<3 || editAuthor.length<3 || editpublisher.length<4 ||edityop.length!==4){
          return;
        }
        try{
          let res =await fetch('/editbook',{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:id,
                name:editName, 
                author:editAuthor,
                publisher:editpublisher,
                yop:edityop
            })
          });
    
          let result = await res.json();
          //console.log(result);
          if(result && result.success){
            console.log("success");
            Changeid('');
            SetAllbooks((prev)=> [...prev.filter(t=> t.id!==id),
                {
                    id:id,
                    name:editName,
                    author:editAuthor,
                    quantity:pub,
                    avaliable:avl,
                    publisher:editpublisher,
                    yop:edityop
            }]);

            runInAction(()=>{
            BookStore.Allbooks=[...BookStore.Allbooks.filter(t=> t.id!==id),
                {
                    id:id,
                    name:editName,
                    author:editAuthor,
                    quantity:pub,
                    avaliable:avl,
                    publisher:editpublisher,
                    yop:edityop
                }]
          });

          }else{
            console.log("something went wrong");
          }
        }catch(e){
          console.log(e);
          console.log("something went wrong");
        }
      }


    if(editID!==book.id){
        return ( 
            <tr>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>{book.avaliable}</td>
                <td>{book.publisher}</td>
                <td>{book.yop}</td>
                <td><i className="fa fa-pencil-square-o" aria-hidden="true" onClick={()=> Changeid(book.id)}></i></td>
            </tr>
        );
    }else{
        return (
            <tr>
                <td><input type="text" value={editName} onChange={(e)=>{SeteidtName(e.target.value)}}></input></td>
                <td><input type="text" value={editAuthor} onChange={(e)=>{SeteditAuthor(e.target.value)}}></input></td>
                <td>{book.quantity}</td>
                <td>{book.avaliable}</td>
                <td><input type="text" value={editpublisher}  onChange={(e)=>{SeteditPublisher(e.target.value)}}></input></td>
                <td><input type="text" value={edityop}  onChange={(e)=>{SeteditYop(e.target.value)}}></input></td>
                <td>
                    <i className="fa fa-floppy-o" aria-hidden="true" onClick={()=> editbook(book.id)}></i>
                </td>
            </tr>
        );
    }
    
}
 
export default Book;