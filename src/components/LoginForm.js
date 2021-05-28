// import { set } from 'mobx';
import React from 'react';
import UserStore from '../stores/UserStore';
import SubmitButton from './SubmitButton';
import {runInAction} from 'mobx';
class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
  }
  setusername= (e)=>{
    this.setState({username:e.target.value});
    //console.log(e.target.value);
  }
  setpassword =(e)=>{
    this.setState({password:e.target.value});
  }
  dologin= async ()=>{
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }
    try{
      let res =await fetch('/login',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:this.state.username,
          password:this.state.password
        })
      });

      let result = await res.json();
      if(result && result.success){
        runInAction(()=>{
          UserStore.isLoggedIn=true;
          UserStore.username=result.username;
        });
      }else if(result && result.success===false){
        runInAction(()=>{
          UserStore.isLoggedIn=false;
          UserStore.username='';
          UserStore.isLoggedIn=true;
        });
        alert(result.msg);
      }
    }catch(e){
      runInAction(()=>{
        UserStore.isLoggedIn=false;
        UserStore.username='';
        UserStore.isLoggedIn=true;
      });
      console.log(e);
      alert("something went wrong");
    }
  }

  resetform= ()=>{
    this.setState({
      password:''
    })
  }

  render() {
    return (
      <React.Fragment>
      <form className="login-form" onSubmit={(e)=>e.preventDefault()}>
      <h2>Log In</h2>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Enter Username" onChange={this.setusername}
          value ={this.state.username}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" onChange={this.setpassword}
          value={this.state.password}/>
        </div>
        <SubmitButton text={'Log In'}  disabled={false} onClick={()=>this.dologin()}/>
      </form>
      </React.Fragment>
    )
  }
};

export default LoginForm;