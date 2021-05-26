import React from 'react';
import UserStore from '../stores/UserStore';
import SubmitButton from './SubmitButton';
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
    console.log(e.target.value);
  }
  setpassword =(e)=>{
    this.setState({password:e.target.value});
  }
  dologin= async ()=>{
    try{
      let res =await fetch('/login',{
        methon: 'post',
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        }
      });

      let result = await res.json();
      if(result && result.success){
        UserStore.isLoggedIn=true;
        UserStore.username=this.state.username;
      }
    }catch(e){
      console.log(e);
    }
  }
  render() {
    return (
      <React.Fragment>
      <form className="login-form" onSubmit={(e)=>e.preventDefault()}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Enter Username" onChange={this.setusername}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" onChange={this.setpassword}/>
        </div>
        <SubmitButton text={'Log In'}  disabled={false} onClick={()=>this.dologin()}/>
      </form>
      </React.Fragment>
    )
  }
};

export default LoginForm;