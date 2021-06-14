import {extendObservable} from 'mobx';

class BorrowerStore{
    constructor(){
        extendObservable(this,{
            Allborrows:[
                {
                  name:"Alvin",
                  id:"23454614",
                  add:"Balurghat",
                  phn: "8597589685"
                },
                {
                  name:"rohit",
                  id:"234356234",
                  add:"Balurghat",
                  phn: "8597589685"
                },
                {
                  name:"bisal",
                  id:"234265534",
                  add:"Balurghat",
                  phn: "8597589685"
                },
                {
                  name:"Alvin",
                  id:"234235434234",
                  add:"Balurghat",
                  phn: "8597589685"
                }
              ]
        })
    }
}
export default new BorrowerStore();