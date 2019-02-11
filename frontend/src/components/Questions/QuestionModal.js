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
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
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
    
    // componentDidUpdate(prevProps, prevState) {
    // if(prevProps.open!==this.props.open){
    //     console.log('aha');
        
    //     this.setState({open: this.props.open});
    //     }
    // }

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
            <Typography variant="h6" id="modal-title">
              Correct
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              You're a superstar!!!
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
