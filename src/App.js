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
      option:'Dashboard',
      isLoggedIn:UserStore.isLoggedIn
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
          UserStore.isLoggedIn=true;
          UserStore.userName='root';
        });
        
      }else{
        runInAction(() => {
          UserStore.loading=false;
          UserStore.isloaded=false;
        });
      }
    }catch(e){
      runInAction(() => {
        UserStore.loading=false;
        UserStore.isloggedIn=false;
      });
    }
  }

  doLogout= async ()=> {
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
        this.setState({
          isLoggedIn:UserStore.isLoggedIn
        });
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
  setStatus =(value)=>{
    this.setState({
      isloggedIn:true
    })
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
      if(UserStore.isLoggedIn){
        return (
         <React.Fragment>
         <Navbar user={'root'}/>
         <div className="App">
           <div className="container">
           <Sidebar setContent={this.setContent} choice={this.state.option}/>
           <Content option={this.state.option} logout={this.doLogout}/>
           </div>
       </div>
         </React.Fragment>
        );
      }
      return (
        <div className="App">
            <div className="container">
              <LoginForm setStatus={this.setStatus}/>
            </div>
        </div>
      )
    }
    
  }
};

export default observer(App);
