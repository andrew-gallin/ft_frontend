import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth-context'
import './AppBar.css'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (context) => (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
      {!context.token && (
        <div>
          <MenuItem onClick={this.handleMenuClose}><NavLink to="/auth">Login</NavLink></MenuItem>
        </div>
        )}
      {context.token && (
        <div>
          <MenuItem onClick={this.handleMenuClose}><NavLink to="/profile">Profile</NavLink></MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={context.logout}>Logout</MenuItem>
        </div>
      )}
      </Menu>
    );

    const renderMobileMenu = (context) => (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
      {!context.token && (
        <React.Fragment>
          <MenuItem onClick={this.handleMenuClose}><NavLink to="/auth">Login</NavLink></MenuItem>
        </React.Fragment>
        )}
      {context.token && (
        <React.Fragment>
          <MenuItem onClick={this.handleMenuClose}><NavLink to="/profile">Profile</NavLink></MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={context.logout}>Logout</MenuItem>
        </React.Fragment>
      )}
      </Menu>
    );

    return (
        <AuthContext.Consumer>
            {(context)=>
                <div className={classes.root}>
                    <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className='main-navigation__items' color="inherit" noWrap>
                            <NavLink to="/lessons">Lesson</NavLink>
                        </Typography>
                        <Typography variant="h6" className='main-navigation__items' color="inherit" noWrap>
                            <NavLink to="/create-lesson">Create Lessons</NavLink>
                        </Typography>
                        
                        {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                        />
                        </div> */}
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                        <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                        </div>
                    </Toolbar>
                    </AppBar>
                    {renderMenu(context)}
                    {renderMobileMenu(context)}
                </div>
            }
        </AuthContext.Consumer>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);