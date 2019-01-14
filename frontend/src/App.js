import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth';
import LessonsPage from './pages/Lessons';
import CreateLessonPage from './pages/CreateLesson';
import MainNavigation from './components/Navigation/MainNavigation'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path ="/auth" component={AuthPage} />
              <Route path ="/lessons" component={LessonsPage} />
              <Route path ="/create-lesson" component={CreateLessonPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
