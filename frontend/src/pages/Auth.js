import React, { Component } from 'react';

import './Auth.css'

class AuthPage extends Component {
  render(){
    return (
      <form className="auth-form">
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email"></input>
        </div>
        <div className="form-control">
          <label htmlFor="email">Password</label>
          <input type="password" id="password"></input>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button">Switch to Signup</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;