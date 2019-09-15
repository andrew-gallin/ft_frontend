import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = theme => ({
  root: {
    width: `100%`,
  },
  slider: {
    padding: '8px 0px',
  },
});

//Takes in the props:
//step : The size of the group you want the slider to jump by
//value: default value for slider
//onChange: handler for change
class SimpleSlider extends React.Component {
  render() {
    const { classes } = this.props;
    let step;
    this.props.step ? step = this.props.step : step = null

    return (
      <div className={classes.root} id="slider">
        <Typography id="label">{this.props.value}</Typography>
        <input type="hidden" name="difficulty" value={this.props.value}></input>
        <Slider
          classes={{ container: classes.slider }}
          value={this.props.value}
          step={step}
          aria-labelledby="label"
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
