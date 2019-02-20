import { withFormsy } from 'formsy-react';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    //controls default
    cssLabel: {
      '&$cssFocused': {
        color: purple[100],
        fontSize:"1rem",
        
      },
    },
    cssFocused: {
    },
    cssUnderline: {
      '&:after': {
        borderBottomColor: blue[500],
      },
    },
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: blue[800],
        fontSize:"2rem",
        textAlign:"center",
      },
    },
    notchedOutline: {
        
    },
    cssOutlinedLabel:{
    },
    cssShrink:{
        '&$cssOutlinedLabel':{
        transform:"translate(-20px, -6px) scale(0.75)"
        }
    }
  });


  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: { useNextVariants: true },
  });

class FormsyText extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }
 
  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }
 
  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();
    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <TextField
            onChange={this.changeValue}
            type="text"
            value={this.props.getValue() || ''}
            className={classes.margin}
            InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
                outlined: classes.cssOutlinedLabel,
                formControl: classes.cssFormControl,
                shrink: classes.cssShrink
            },
            }}
            InputProps={{
            classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                shrink: classes.cssShrink
            },
            }}
            label={this.props.name}
            variant="outlined"
            id="custom-css-outlined-input"
            inputStyle={{ textAlign: 'center' }}
            hintStyle={{ textAlign: 'center', width: '100%' }}
            floatingLabelStyle={{ textAlign: 'center', width: '100%', transformOrigin: 'center top 0px' }}
            // labelWidth="40"
        />
        <br></br>
        <span>{errorMessage}</span>
        </div>

      );
    }
  }
  
  FormsyText.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(withFormsy(FormsyText));
