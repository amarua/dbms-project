import './css/materialize.min.css';
import './css/App.css';
import React from 'react'
import {observer} from 'mobx-react';
import {runInAction} from 'mobx';
import UserStore from './stores/UserStore';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
class App extends React.Component {
  constructor(){
    super();
    this.state={
      option:'Dashboard'
    }
  }
  async componentDidMount() {
    try{
      let res =await fetch('/isLoggedIn',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();
      if(result && result.success){
        runInAction(() => {
          UserStore.loading=false;
          //UserStore.isLoggedIn=true;
          UserStore.userName=result.userName;
        });
        
      }else{
        runInAction(() => {
          UserStore.loading=false;
          //UserStore.isloaded=false;
        });
      }
    }catch(e){
      runInAction(() => {
        UserStore.loading=false;
        //UserStore.isloggedIn=false;
      });
    }
  }

  async doLogout() {
    try{
      let res =await fetch('/logout',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      var result = await res.json();
      if(result && result.success){
        UserStore.isLoggedIn=false;
        UserStore.username='';
      }
    }catch(e){
      console.log(e);
    }
  }

  setContent=(choice)=>{
    this.setState({
      option:choice
    });
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
          <Navbar/>
            <div className="container">
            <Sidebar setContent={this.setContent} choice={this.state.option}/>
            <Content option={this.state.option} logout={this.doLogout}/>
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
