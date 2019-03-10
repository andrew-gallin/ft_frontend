import React, { Component } from 'react';
import AuthContext from '../context/auth-context'

import './Auth.css'

const backendURL = 'http://localhost:8000/graphql'

class AuthPage extends Component {
  state = {
    isLogin: true
  }

  static contextType = AuthContext

  constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.usernameEl = React.createRef();
  }
  switchModeHandler = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return {isLogin: !prevState.isLogin};
    })
  }

  submitHandler = (event) =>  {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;

    //Could add more robust validation and feedback here
    if (email.trim().length === 0 || password.trim().length ===0){
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    if (!this.state.isLogin) {
      requestBody ={
         query: `
           mutation{
             createUser(userInput:{email: "${email}", username: "${username}", password: "${password}"}){
               _id
               email
             }
           }
         `
       }
    }
    //send to the backend
    //TODO: Refactor to call to backend middleware
    fetch(backendURL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json();
    })
    .then(resData => {
      if(resData.data.login.token){
        this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
      }
    })
    .catch(err => {
      console.log(err)
    })
  };

  render(){
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        {/* <FormGroup className="fromy" controlId={!this.state.isLogin ? null : "username-hidden"}>
            <ControlLabel>Lesson Title</ControlLabel>
            <FormControl type="text" name="title" placeholder="Username" />      
        </FormGroup> */}
        <div className="formy" id={!this.state.isLogin ? null : "username-hidden"}>
          <label htmlFor="username">Username</label>
          <input type="username" id="username" ref={this.usernameEl} ></input>
        </div>
        <div className="formy">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" ref={this.emailEl}></input>
        </div>

        <div className="formy">
          <label htmlFor="email">Password:</label>
          <input type="password" id="password" ref={this.passwordEl}></input>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
          Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
