import React, { Component } from 'react';

import Carousel from '../components/Carousel/Carousel'
import '../components/Carousel/carousel.css';
import './lessons.css'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'


const backendURL = 'http://localhost:8000/graphql'


const styles = theme => ({
  lessonButton: {
    minWidth: '15em',
    textAlign: 'center',
    fontSize: '1.25rem',
    borderRadius: '10px'
  },
});

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
            _id
            title
            promptLanguage
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
    console.log(lessons)
    return (
    <div className="lesson-page">
    <h1>The Lessons Page</h1>
    <Carousel />
    <Grid container spacing={24}>
      {lessons.map(lesson =>
        <Grid item xs ={3} className='grid-item'>
          <NavLink to={`/lesson/${lesson._id}`} key={lesson._id}>
            <Button variant="contained" color="primary" className={this.props.classes.lessonButton}>{lesson.title}   {lesson.promptLanguage}</Button>
          </NavLink>
        </Grid>
      )}
    </Grid>
    </div>
    //Header Should be a "reccomended for you carosuel"
    //below that, buttons that launch into a guided next lesson selection choice (courses)
    //below that should be tumbnails of individual lessons searchable/sortable by various factors
    //Body shuld be a searchable tiles
    )
  }
}

export default withStyles(styles)(LessonsPage);
