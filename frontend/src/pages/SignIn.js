import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';


import AuthContext from '../context/auth-context'
import SkillRater from '../components/Forms/SkillRater'
import MaterialLocation from '../components/Forms/MaterialLocation'

import './SignIn.css'
const backendURL = 'http://localhost:8000/graphql'
const finalStep = 2
const { objArrayToString } = require('../helpers/objArrayToString')
const { signInSignUp } = require('../helpers/signInSignUp')

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 450,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  previous:{
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit
  },
  icon: {
    margin: 0,
  },
  iconHover: {
    margin: 0,
    fontSize: '20px',
    '&:hover': {
      color: green[400],
    },
  }
});

const suggestions =  [
      { label: 'English (US)' },
      { label: 'Portuguese (BRA)' },
      { label: 'Spanish (Mex)' },
    ]
class SignIn extends Component {
  state = {
    isLogin: true,
    signUpStep: 1,
    email:null,
    username:null,
    password:null,
    confirm_password:null,
    location:null,
    languages_spoken:[{language:null, value: 50}],
    languages_learning:[{language:null, value: 50}],
    learningSuggestions: suggestions,
    speakingSuggestions: suggestions,
  }

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.usernameEl = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleLanguageRating = this.handleLanguageRating.bind(this);
        this.addLanguage = this.addLanguage.bind(this)
        this.updateSuggestions = this.updateSuggestions.bind(this)
    }
    switchModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
          let step = prevState.signUpStep
          if(!prevState.isLogin){
            step = 1         
          }
            return { 
              isLogin: !prevState.isLogin,
              signUpStep: step };
        })
    }

    nextStep = () => {
        const { signUpStep } = this.state
        this.setState({
            signUpStep: signUpStep + 1
        })
    }

    prevStep = () => {
        const { signUpStep } = this.state
        this.setState({
            signUpStep: signUpStep - 1
        })
    }

    handleLocation = (suggestion) => {
        this.setState({
            location: suggestion.description
        })
    }

    updateSuggestions = (languageRating, index, learning) => {
      const {learningSuggestions, speakingSuggestions, languages_learning, languages_spoken} = this.state
      let addedLanguage;
      let newSuggestions;
      if (learning){
        newSuggestions = learningSuggestions
        if(languageRating.language === null){
          addedLanguage = {label: languages_learning[index].language} 
          newSuggestions.push(addedLanguage)
        }else{
          newSuggestions = newSuggestions.filter((value, index) => {
            return value.label !== languageRating.language
          })
        }
      }else{
        newSuggestions = speakingSuggestions
        if(languageRating.language === null){
          if(languages_spoken[index].language !== null){
            addedLanguage = {label: languages_spoken[index].language} 
            newSuggestions.push(addedLanguage)
          }
          
        }else{
          newSuggestions = newSuggestions.filter((value, index) => {
            return value.label !== languageRating.language
          })
        }
        
      }
      return newSuggestions
    }
    //Handles ratings created with Skill Rater. learning is a bool
    handleLanguageRating = (languageRating, index, learning) => {
      
      const {languages_learning, languages_spoken} = this.state
        let newSuggestions = this.updateSuggestions(languageRating, index, learning)
           
        if(learning){
          let newLanguages_learning = [...languages_learning]
          newLanguages_learning[index] = languageRating

          this.setState ({
            languages_learning: newLanguages_learning,
            learningSuggestions: newSuggestions
          })
        }else{
          let newLanguages_spoken = [...languages_spoken]
          newLanguages_spoken[index] = languageRating
          
          this.setState ({
            languages_spoken: newLanguages_spoken,
            speakingSuggestions: newSuggestions
          })
        }
        
    }

    addLanguage= (learning) =>{
      const {languages_learning, languages_spoken } = this.state
      console.log('working')
      if(learning){
        console.log(languages_learning[languages_learning.length-1].language)
        if(languages_learning[languages_learning.length-1].language == null){
          return null
        }
        let new_languages_learning = [...this.state.languages_learning]
        new_languages_learning.push({language:null, value:50})
        this.setState ({
          languages_learning: new_languages_learning
        })
      }else{
        console.log(languages_spoken[languages_spoken.length -1]);
        
        if(languages_spoken[languages_spoken.length -1].language == null){
          return null
        }
        let new_languages_spoken = [...this.state.languages_spoken]
        new_languages_spoken.push({language:null, value:50})
        
        this.setState ({
          languages_spoken: new_languages_spoken
        })
      }
    }

    subtractLanguage = (learning, index) =>{
      if(learning){
        this.setState ({
          languages_learning: this.state.languages_learning.splice(index, 1)
        })
      }else{
        this.setState ({
          languages_spoken: this.state.languages_spoken.splice(index, 1)
        })
      }
      
    }

    handleChange = () => event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    validateSignUpInfo = (email, username, password, confirm_password) =>{
      if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0){
        return false;
      }
      if (password !== confirm_password){
        return false;
      }
      return true
    }

  handleSubmit = async (event) =>  {
      event.preventDefault();
      const {email, username, password, confirm_password, location, languages_learning, languages_spoken, isLogin} = this.state
      if(isLogin && email && password){
        let obj = {
          email:email,
          password: password,
        }
        let loginData = await signInSignUp(obj, this.state.isLogin)
        this.context.login(loginData.login.token, loginData.login.userId, loginData.login.tokenExpiration)
      }
      if(this.state.signUpStep === finalStep && location){
        let valid = this.validateSignUpInfo(email, username, password, confirm_password)
        if(!valid){
          alert('Invalid Info')
          return false
        }
        //filter speak and learning languages
        let filtered_languages_learning = languages_learning.filter((language) => {
          return language.language !== null
        })
        filtered_languages_learning = filtered_languages_learning.map((language) => {
          return {
            language: language.language,
            rating: language.value
          }
        })
        let filtered_languages_spoken = languages_spoken.filter((language) => {
          return language.language !== null
        })
        filtered_languages_spoken = filtered_languages_spoken.map((language) => {
          return {
            language: language.language,
            rating: language.value
          }
        })
        let obj = {
          email:email,
          username: username,
          password: password,
          location: location,
          languages_learning: filtered_languages_learning,
          languages_spoken: filtered_languages_spoken
        }
        //this.submitHandler(obj)
        let loginData = await signInSignUp(obj, this.state.isLogin)
        this.context.login(loginData.login.token, loginData.login.userId, loginData.login.tokenExpiration)
        
      }
      if(this.state.signUpStep < finalStep && email && username && password && confirm_password){
        this.nextStep()
        return;
      }

  }

  submitHandler = (userObj) =>  {
    const {email, username, password, location, languages_learning, languages_spoken} = userObj
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    if (!this.state.isLogin) {
      let leanguages_learning_sting = objArrayToString(languages_learning)
      let languages_spoken_sting = objArrayToString(languages_spoken)
      requestBody ={
         query: `
           mutation{
             createUser(userInput:{email: "${email}", username: "${username}", password: "${password}", location: "${location}", spokenLanguageSkill: ${languages_spoken_sting}, learningLanguageSkill: ${leanguages_learning_sting}}){
               _id
               email
             }
           }
         `
       }
    }
    //send to the backend
    //TODO: Refactor to call to backend middleware
    fetch(backendURL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Call to GraphQL Failed!') 
      }
      return res.json();
    })
    .then(resData => {
      if(resData.data.login.token){
        this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
      }
    })
    .catch(err => {
      console.log(err)
    })
  };

  render(){
    const { classes } = this.props;
    const { isLogin, signUpStep, languages_learning, languages_spoken, learningSuggestions, speakingSuggestions } = this.state;
    const learningSuggestionsArr = learningSuggestions.map(suggestion => ({
      value: suggestion.label,
      label: suggestion.label,
    }));
    const speakingSuggestionsArr = speakingSuggestions.map(suggestion => ({
      value: suggestion.label,
      label: suggestion.label,
    }));
    
    
    return (
        <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {isLogin ? 'Sign in' : 'Sign up'}
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
            {signUpStep ===  1 && (<React.Fragment>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input onChange={this.handleChange()} id="email" name="email" autoComplete="email" value={this.state.email ? this.state.email : null} autoFocus />
                </FormControl>
                {!isLogin &&
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input onChange={this.handleChange()} id="username" name="username"  />
                    </FormControl>
                }
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" onChange={this.handleChange()} autoComplete="current-password" />
                </FormControl>
                {!isLogin &&
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                        <Input onChange={this.handleChange()} id="confirm_password" name="confirm_password"  />
                    </FormControl>
                }
                {isLogin && <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />}
            </React.Fragment> )}
            {(!isLogin && signUpStep ===2) && (
                <React.Fragment>
                    <FormControl margin="normal" required fullWidth>
                        <MaterialLocation handleLocation={this.handleLocation} />
                    </FormControl>
                    <h3>Languages you speak</h3>
                    {languages_spoken.map((language, index) => { 
                      return(
                        <SkillRater key= {'language' + index} index={index} learning={false} 
                        handleLanguageRating={this.handleLanguageRating} language={language} 
                        step={5} handleSubmit={this.handleSubmit} suggestions={speakingSuggestionsArr} />
                      )
                    })}
                    <Icon className={classes.iconHover} onClick={this.addLanguage.bind(this,false)} color={'action'} style={{ fontSize: 20 }} >
                      add_circle
                    </Icon>
                    <br></br>
                    <h3>Languages you are learning</h3>
                    {languages_learning.map((language, index) => { 
                      return(
                        <SkillRater key= {'language' + index} index={index} learning={true} 
                        handleLanguageRating={this.handleLanguageRating} language={language} 
                        step={5} handleSubmit={this.handleSubmit} suggestions={learningSuggestionsArr} />
                      )
                    })}
                    <Icon className={classes.iconHover} onClick={this.addLanguage.bind(this,true)} color={'action'} style={{ fontSize: 20 }} >
                      add_circle
                    </Icon>
                </React.Fragment>
            )
            }
            <div className={(signUpStep !== 1) ? "buttonWrapper" : 'null'}>
                {signUpStep !== 1 && (
                    <Button
                        onClick={this.prevStep}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.previous}
                        >
                        Previous
                    </Button>)}
                {(isLogin || (signUpStep === finalStep)) && ( 
                    <Button
                        type="submit"
                        onClick={this.handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isLogin ? 'Sign in' : (signUpStep === finalStep) ? 'Sign Up' : 'Save and Continue'}
                    </Button>
                )}
                {(!isLogin && signUpStep < finalStep) &&(
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save and Continue
                    </Button>
                )}
            </div>
            <Button onClick={this.switchModeHandler} variant="contained" fullWidth
                color="default"
                className={classes.submit}
            >
                {isLogin ? 'No Account? Sign up' : 'I have an Account. Sign me in'} 
            </Button>
            </form>
        </Paper>
        </main>
    );
    }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);