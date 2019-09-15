import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import SignInPage from './pages/SignIn';
import LessonsPage from './pages/Lessons';
import CreateTextLesson from './pages/CreateTextLesson';
import AppBar from './components/Navigation/AppBar'
import AuthContext from './context/auth-context'
import Profile from './pages/Profile'
import Footer from './components/Navigation/Footer'

import './App.css';  
import './components/Carousel/carousel.css'
import SingleLesson from './pages/SingleLesson';

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
            {/* <MainNavigation /> */}
            <AppBar />
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && <Redirect from="/" to="/lessons" exact />}
                {this.state.token && <Redirect from="/auth" to="/lessons" exact />}
                {!this.state.token && <Route path ="/auth" component={SignInPage} />}
                {/* {!this.state.token && <Redirect to="/auth" exact />} */}
                <Route path ="/lessons" component={LessonsPage} />
                {/* <Route path ="/create-lesson" component={CreateLessonPage} /> */}
                <Route path ="/create-lesson" component={CreateTextLesson} />
                <Route path ="/profile" component={Profile} />
                <Route path="/lesson/:id" component={SingleLesson}/>
              </Switch>
            </main>
            <Footer />
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
