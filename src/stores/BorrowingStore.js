import {extendObservable} from 'mobx';

class BorrowingStore{
    constructor(){
        extendObservable(this,{
            Allborrowing:[
                {
                    date:"12-12-2000",
                    borrower:"rohit",
                    book:"data stucture",
                    author:"sk datta",
                    due:"20-10-2000",
                    id:"102"
                },
                {
                    date:"12-12-2000",
                    borrower:"rihan",
                    book:"resource management Techniques",
                    author:"mohit biswas",
                    due:"20-10-2000",
                    id:"182"
                },
                {
                    date:"12-12-2000",
                    borrower:"risab",
                    book:"graph theory",
                    author:"bisal sen",
                    due:"20-10-2000",
                    id:"122"
                },
                {
                    date:"12-12-2000",
                    borrower:"rina",
                    book:"algorithm analysis",
                    author:"amit pal",
                    due:"20-10-2000",
                    id:"132"
                }
              ]
        })
    }
}
export default new BorrowingStore();