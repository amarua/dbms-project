import {extendObservable} from 'mobx';
class BookStore{
    constructor(){
      const GetAll=async ()=> {
          try{
            let res =await fetch('/getbooks',{
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
      
            let result = await res.json();
            if(result && result.success){
              //console.log(result.msg);
              extendObservable(this,{
                Allbooks: result.msg
              })
            }else{
              console.log("error to load books");
              extendObservable(this,{
                Allbooks: []
              })
            }
          }catch(e){
            extendObservable(this,{
              Allbooks: []
            })
            console.log(e);
          }
      }

      GetAll();
    }
}
export default new BookStore();