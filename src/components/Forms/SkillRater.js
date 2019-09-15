import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


import AutocompleteTextField from './AutocompleteTextField';
import Slider from './Slider'

const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center'
    },
    slider:{
      width: '35%',
    },
    textField: {
      marginRight: `${theme.spacing.unit * 3}px`,
      width: '100%'
    }
  });

export class SkillRater extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         value: 50,
         language: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleLanguage = this.handleLanguage.bind(this);
    }
    handleChange = (event, value) => {
      this.setState({ value });
      this.props.handleLanguageRating({language:this.state.language, value: value}, this.props.index, this.props.learning)
    };
    handleLanguage = (language) => {
      
      this.setState({
        language: language !== null ? language.value : null
      })
      this.props.handleLanguageRating({language: (language !== null ? language.value : null), value: this.state.value}, this.props.index, this.props.learning)
    }    
    
  render() {
    const { classes } = this.props;
    let step;
    this.props.step ? step = this.props.step : step = null    
    return (
      <div className={classes.root}>
        <div className={classes.textField} >
          <AutocompleteTextField handleLanguage={this.handleLanguage} suggestions={this.props.suggestions}/>
        </div>
        <div className={classes.slider}>
          <Slider step={step} value={this.state.value} handleChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

SkillRater.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(SkillRater)
