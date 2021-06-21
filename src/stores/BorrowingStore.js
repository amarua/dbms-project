import {extendObservable} from 'mobx';

class BorrowingStore{
    constructor(){
        const GetAll=async ()=> {
            try{
              let res =await fetch('/getborrow_records',{
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
                    Allborrowing: result.msg
                })
              }else{
                extendObservable(this,{
                    Allborrowing: []
                })
                console.log("error to load borrowers");
              }
            }catch(e){
              extendObservable(this,{
                Allborrowing: []
              })
              console.log(e);
            }
        }
  
        GetAll();
          
      }
}
export default new BorrowingStore();