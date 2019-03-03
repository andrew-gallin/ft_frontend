import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = theme => ({
  root: {
    width: `35%`,
    marginLeft: `${theme.spacing.unit * 3}px`
  },
  slider: {
    padding: '13.25px 0px',
  },
});

class SimpleSlider extends React.Component {
  render() {
    const { classes } = this.props;
    let step;
    this.props.step ? step = this.props.step : step = null

    return (
      <div className={classes.root}>
        <Typography id="label">{this.props.value}</Typography>
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
