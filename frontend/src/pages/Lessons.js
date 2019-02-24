
import React, { Component } from 'react';
import Carousel from '../components/Carousel/Carousel'
import '../components/Carousel/carousel.css';
import './lessons.css'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const backendURL = 'http://localhost:8000/graphql'

const styles = theme => ({
  root:{
    flexGrow:1
  },
  lessonButton: {
    minWidth: '15em',
    textAlign: 'center',
    fontSize: '1.25rem',
    borderRadius: '10px'
  },
  container: {
    padding: '1rem 2.5rem',
    backgroundColor: '#eee'
  },
  hr: {
    marginTop: "0",
    marginBottom: "0",
    borderTop: "1px solid #dfdfdf",
    border: "1",
    width: "60%"
  }
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
    //TODO: replace with abstraction of backendCall
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
    const { classes } = this.props;
    
    if(error){
      return <p>{error.message}</p>;
    }
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
    <div className="lesson-page">
      <Carousel />
      <h1>The Lessons Page</h1>
      <Grid container className={this.props.classes.container} spacing={24} wrap={'nowrap'}>
        <Grid item xs={12} sm={4}>
          <h3>In Progress</h3>
          <hr className={classes.hr}></hr>
          {lessons.slice(0,3).map(lesson =>
            <Grid item xs={12} className='grid-item'>
              <NavLink to={`/lesson/${lesson._id}`} key={lesson._id}>
                <Button variant="contained" color="primary" className={this.props.classes.lessonButton}>{lesson.title}</Button>
              </NavLink>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={4} >
          <h3>Next Steps</h3>
          <hr className={classes.hr}></hr>
          {lessons.slice(10,17).map(lesson =>
            <Grid item xs={12} className='grid-item'>
              <NavLink to={`/lesson/${lesson._id}`} key={lesson._id}>
                <Button variant="contained" color="primary" className={this.props.classes.lessonButton}>{lesson.title}</Button>
              </NavLink>
            </Grid>
          )}
        </Grid> 
        <Grid item xs={12} sm={4}>
          <h3>Help Others</h3>
          <hr className={classes.hr}></hr>
          {lessons.slice(20,35).map(lesson =>
            <Grid item xs={12} className='grid-item'>
              <NavLink to={`/lesson/${lesson._id}`} key={lesson._id}>
                <Button variant="contained" color="primary" className={this.props.classes.lessonButton}>{lesson.title}</Button>
              </NavLink>
            </Grid>
          )}
        </Grid>
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
