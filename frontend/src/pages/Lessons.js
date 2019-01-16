import React, { Component } from 'react';

const backendURL = 'http://localhost:8000/graphql'



class LessonsPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       lessons:[],
       isLoading: false
    }
  }



  componentDidMount(){
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
      this.setState({lessons: resData.data.lessons, isLoading:false})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    const { lessons, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }


    return (
    <div>
    <h1>The Lessons Page</h1>
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
