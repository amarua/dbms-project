import './App.css';
import {observer} from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './components/LoginForm';
import SubmitButton from './components/SubmitButton';
import React from 'react'
class App extends React.Component {
  async componentDidMount() {
    try{
      let res =await fetch('/isLoggedIn',{
        methon: 'post',
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        }
      });

      let result = await res.json();
      if(result && result.success){
        UserStore.loading=false;
        UserStore.isLoggedIn=true;
        UserStore.userName=result.userName;
      }else{
        UserStore.loading=false;
        UserStore.inloaded=false;
      }
    }catch(e){
      UserStore.loading=false;
      UserStore.isloggedIn=false;
    }
  }

  async doLogout() {
    try{
      let res =await fetch('/logout',{
        methon: 'post',
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        }
      });

      let result = await res.json();
      if(result && result.success){
        UserStore.isLoggedIn=false;
        UserStore.username='';
      }
    }catch(e){
      console.log(e);
    }
  }
  
  render() {
    if(UserStore.loading){
      return (
        <div className="App">
          <div className="container">
            loading , please wait...
          </div>
      </div>
      );
    }else{
      if(UserStore.isloggedIn){
        return (
          <div className="App">
            <div className="container">
              welcome {UserStore.username}
              <SubmitButton text={'Log Out'} disabled={false} onClick={()=>this.doLogout()}/>
            </div>
        </div>
        );
      }

      return (
        <div className="App">
            <div className="container">
              <LoginForm/>
            </div>
        </div>
      )

    }
    
  }
};

export default observer(App);
