import {extendObservable} from 'mobx';

class BorrowerStore{
    constructor(){
        extendObservable(this,{
            Allborrows:[
                {
                  name:"Alvin",
                  id:"2342314",
                  add:"Balurghat",
                  phn: "8597589685"
                },
                {
                  name:"rohit",
                  id:"2343234",
                  add:"Balurghat",
                  phn: "8597589685"
                },
                {
                  name:"bisal",
                  id:"2342534",
                  add:"Balurghat",
                  phn: "8597589685"
                },
                {
                  name:"Alvin",
                  id:"234234234",
                  add:"Balurghat",
                  phn: "8597589685"
                },
              ]
        })
    }
}
export default new BorrowerStore();