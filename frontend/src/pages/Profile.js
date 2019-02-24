import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FTCard from '../components/Profile/Card'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container:{
    padding: `0 ${theme.spacing.unit * 10}px`,
    justifyContent: 'center',
  },
  cardly:{
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>User Profile</h1>
        <Grid container spacing={24} className={classes.container} justify={"center"}>
          <Grid item xs={6}>
            <FTCard className={classes.cardly} />
            <FTCard className={classes.cardly} />
          </Grid>
          <Grid item xs={6}>
            <FTCard className={classes.card} />
            <FTCard className={classes.card} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Profile)