import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50 
    const left = 50 
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 80,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
      height: theme.spacing.unit * 40,
    },
  });

export class QuestionModal extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         open:false
      }
    }
    
    handleClose = () => {
        this.setState({ open: false });
        this.props.closeModal()
      };


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.open !== prevState.open){
        return { open: nextProps.open};
    }
        else return null;
    }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h2" id="modal-title">
              {this.props.response}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {this.props.children}
            </Typography>
          </div>
        </Modal>
      </div>
    )
  }
}

QuestionModal.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(QuestionModal)
