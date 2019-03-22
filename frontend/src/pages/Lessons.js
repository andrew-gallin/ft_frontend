
import React, { Component } from 'react';
import './lessons.css'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import  AuthContext  from '../context/auth-context'

const { backendCall } = require('../helpers/backendCall')
const { requestBodyBuilder } = require('../helpers/requestBodyBuilder')
const { lessonSort } = require('../helpers/lessonSort')
const { lessonGather } = require('../helpers/lessonGather')

const styles = theme => ({
  root:{
    flexGrow:1
  },
  lessonButton: {
    minWidth: '13em',
    textAlign: 'center',
    fontSize: '1.2rem',
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

  static contextType = AuthContext

  constructor(props) {
    super(props)
  
    this.state = {
       lessons:[],
       isLoading: false,
       error: null, 
       user: null,
       reccomended: [],
       keepPracticing: []
    }
  }
  
  async componentDidMount(){
    this.setState({isLoading: true})

    ///Gather User info
    let requestObj = {
      userID: this.context.userId
    }
    let requestBody = requestBodyBuilder(requestObj, 'user')
    try {
      let resData = await backendCall(requestBody);
      this.setState({
        user:resData.data
      });
    } catch (error) {
      console.log(error)
    }
    
    ///Lesson call function
    try{
      let resData = await lessonGather(this.context, this.state.user);
      await console.log(resData);
      
      console.log(this.state.user, this.context.userId);
      
      this.setState({
        lessons: resData.lessons,
        reccomended: resData.lessons, 
        completedLessons: resData.completedLessons, 
        isLoading:false
      })
      
      ///Lesson sort function
      if(this.context.userId){
        let sortedLessons = await lessonSort(resData.lessons, this.state.user, resData.completedLessons)
        console.log(sortedLessons);
        this.setState({
          reccomended: sortedLessons.reccomended,
          keepPracticing: sortedLessons.keepPracticing
        })
      }

    }catch(err) {
      console.log(err)
      this.setState({ error: err, isLoading:false})
    }
  }
  
  render(){
    const { lessons, isLoading, error, reccomended, keepPracticing } = this.state;
    const { classes } = this.props;
    
    if(error){
      return <p>{error.message}</p>;
    }
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
    <div className="lesson-page">
      <h1>The Lessons Page</h1>
      <Grid container className={this.props.classes.container} spacing={24} wrap={'nowrap'}>
        <Grid item xs={12} sm={4}>
          <h3>In Progress</h3>
          <hr className={classes.hr}></hr>
          {reccomended.slice(0,10).map(lesson =>
            <Grid item xs={12}  key={lesson._id} className='grid-item'>
              <NavLink to={`/lesson/${lesson._id}`} key={lesson._id}>
                <Button variant="contained" color="primary" className={this.props.classes.lessonButton}>{lesson.title}</Button>
              </NavLink>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={4} >
          <h3>Next Steps</h3>
          <hr className={classes.hr}></hr>
          {keepPracticing.slice(0,10).map(keepPracticingLesson =>
            <Grid item xs={12} key={keepPracticingLesson._id} className='grid-item'>
              <NavLink to={`/lesson/${keepPracticingLesson._id}`} key={keepPracticingLesson._id}>
                <Button variant="contained" color="primary" className={this.props.classes.lessonButton}>{keepPracticingLesson.lesson.title}</Button>
              </NavLink>
            </Grid>
          )}
        </Grid> 
        <Grid item xs={12} sm={4}>
          <h3>Help Others</h3>
          <hr className={classes.hr}></hr>
          {lessons.slice(20,35).map(lesson =>
            <Grid item xs={12} key={lesson._id} className='grid-item'>
              <NavLink to={`/lesson/${lesson._id}`} key={lesson._id}>
                <Button variant="contained" color="primary" className={this.props.classes.lessonButton}>{lesson.title}</Button>
              </NavLink>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default withStyles(styles)(LessonsPage);
