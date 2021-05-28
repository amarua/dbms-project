import {extendObservable} from 'mobx';

class UserStore{
    constructor(){
        extendObservable(this,{
            loading:true,
            isloggedIn:true,
            username:'Amar'
        })
    }
}
export default new UserStore();