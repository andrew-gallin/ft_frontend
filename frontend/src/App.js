import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth';
import LessonsPage from './pages/Lessons';
import CreateLessonPage from './pages/CreateLesson';
import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth-context'

import './App.css';  
import './components/Carousel/carousel.css'


class App extends Component {
  state ={
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {  
    this.setState({token:token, userId: userId});
  }
  logout = () => {  
    this.setState({token:null, userId:null})
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider 
            value={{
              token: this.state.token,
              userId: this.state.userId, 
              login: this.login, 
              logout: this.logout
              }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && <Redirect from="/" to="/lessons" exact />}
                {this.state.token && <Redirect from="/auth" to="/lessons" exact />}
                {!this.state.token && <Route path ="/auth" component={AuthPage} />}
                <Route path ="/lessons" component={LessonsPage} />
                <Route path ="/create-lesson" component={CreateLessonPage} />
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
