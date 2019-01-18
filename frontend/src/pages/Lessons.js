import React, { Component } from 'react';

import SimpleSlider from '../components/Carousel/Carousel'

import '../components/Carousel/carousel.css';

const backendURL = 'http://localhost:8000/graphql'



class LessonsPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       lessons:[],
       isLoading: false,
       error: null
    }
  }

  async componentDidMount(){
    this.setState({isLoading: true})
    let requestBody = {
      query: `
        query {
          lessons{
            title
            language
            difficulty
          }
        }
      `
    }

    //send to the backend
    try{
      let res = await fetch(backendURL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
      let resData = await res.json();
      this.setState({lessons: resData.data.lessons, isLoading:false})
    }catch(err) {
      console.log(err)
      this.setState({ error: err, isLoading:false})
    }
  }

  render(){
    const { lessons, isLoading, error } = this.state;
    if(error){
      return <p>{error.message}</p>;
    }
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
    <div className="lesson-page">
    <h1>The Lessons Page</h1>
    <SimpleSlider />
      <ul>
        {lessons.map(lesson =>
          <li>
            <p>{lesson.title}   {lesson.language}</p>
          </li>
        )}
      </ul>
    </div>
    //Header Should be a "reccomended for you carosuel"
    //below that, buttons that launch into a guided next lesson selection choice (courses)
    //below that should be tumbnails of individual lessons searchable/sortable by various factors
    //Body shuld be a searchable tiles
    )
  }
}

export default LessonsPage;
