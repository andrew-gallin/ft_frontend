import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SimpleSlider from './Slider'

import LanguagesSupported from '../../constants/LanguagegesSupported'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent:'space-around',
    marginBottom: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    width: 180,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  difficulty: {
    width: '15%'
  }
});

class LessonHeader extends React.Component {
  state = {
    title: '',
    teacherLanguage: '',
    studentLanguage: '',
    difficultyValue:0
  };

  formValidation = () => {
    const {title, teacherLanguage, studentLanguage, difficultyValue} = this.state
    if(title.length > 0 && teacherLanguage.length > 0 && studentLanguage.length > 0 && difficultyValue > 0){   
      return true
    }else{
      return false
    }
  }

  handleChange = name => event  => {
    this.setState({ 
      [name]: event.target.value 
    }, () =>{
      if(this.formValidation()){
        this.props.submitValidation()
      }
    });
  };

  handleSliderChange = (event, value) => {
    this.setState({ 
        difficultyValue: value 
    }, () =>{
      if(this.formValidation()){
        this.props.submitValidation()
      }
    });
}

  render() {
    const { classes, submitDisabled } = this.props;
    // const { title, teacherLanguage, studentLanguage, difficultyValue } = this.state;

    return (
      <form className={classes.root} autoComplete="off" onSubmit={this.props.onSubmit}>
        <TextField
            id="title"
            label="Lesson Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            inputProps={{
              name: 'title',
              id: 'title',
            }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="teacherLanguage">Teacher Language</InputLabel>
          <Select
            value={this.state.teacherLanguage}
            onChange={this.handleChange('teacherLanguage')}
            inputProps={{
              name: 'teacherLanguage',
              id: 'teacherLanguage',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {LanguagesSupported.map((language) => (
              <MenuItem key={language} value={language}>{language}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="studentLanguage">Student Language</InputLabel>
          <Select
            value={this.state.studentLanguage}
            onChange={this.handleChange('studentLanguage')}
            inputProps={{
              name: 'studentLanguage',
              id: 'studentLanguage',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {LanguagesSupported.map((language) => (
              <MenuItem key={language} value={language}>{language}</MenuItem>
            ))}
          </Select>
        </FormControl>
            <FormGroup controlid="formControlsSelect" className={classes.difficulty}>
                <InputLabel>Difficulty</InputLabel>
                <SimpleSlider step={5} handleChange={this.handleSliderChange} value={this.state.difficultyValue}></SimpleSlider>
            </FormGroup>

            <Button type="submit" variant="outlined" color="primary" disabled={submitDisabled}>Create Lesson</Button>
      </form>
    );
  }
}

LessonHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LessonHeader);
