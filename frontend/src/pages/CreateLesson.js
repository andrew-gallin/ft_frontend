import React, { Component } from 'react';
import RadialMenu from '../components/Lesson_Creation/menu_button/menu_button'

import '../components/Lesson_Creation/menu_button/menu_button.css'

class CreateLessonPage extends Component {
  render(){
    return (
      <div>
        <h1>Create A Lesson</h1>
        <RadialMenu />
      </div>
    )
  }
}

export default CreateLessonPage;
