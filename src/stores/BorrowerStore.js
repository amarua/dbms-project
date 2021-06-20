import {extendObservable} from 'mobx';
// import UserStore from './UserStore';
class BorrowerStore{
    constructor(){
      const GetAll=async ()=> {
          try{
            let res =await fetch('/getborrowers',{
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
                Allborrows: result.msg
              })
            }else{
              extendObservable(this,{
                Allborrows: []
              })
              console.log("error to load borrowers");
            }
          }catch(e){
            extendObservable(this,{
              Allborrows: []
            })
            console.log(e);
          }
      }

      GetAll();
        
    }
}
export default new BorrowerStore();