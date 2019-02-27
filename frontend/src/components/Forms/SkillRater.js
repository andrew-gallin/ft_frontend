import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


import AutocompleteTextField from './AutocompleteTextField';
import Slider from './Slider'

const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'flex-end'
    },
  });

export class SkillRater extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AutocompleteTextField />
        <Slider />
      </div>
    )
  }
}

SkillRater.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SkillRater)
