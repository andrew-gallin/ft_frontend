import React, { Component } from 'react'
import LessonForm from '../components/Individual_Lessons/Form'

export default class CreateTextLesson extends Component {
  render() {
    return (
      <div>
        <h1>Teach the world something!</h1>
        <LessonForm />
      </div>
    )
  }
}
