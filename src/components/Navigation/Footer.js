import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import './Footer.css'

const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];

  const social_links = [
    {
      icon: "fa-facebook",
      link: ""
    }, {
      icon: "fa-twitter",
      link: ""
    }, {
      icon: "fa-github",
      link: ""
    }, {
      icon: "fa-instagram",
      link: ""
    }
  ];

  
const styles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
        minWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    footer: {
      marginTop: theme.spacing.unit * 8,
      borderTop: `1px solid ${theme.palette.divider}`,
      backgroundColor: "#eee"
    },
    footerDiv:{
        backgroundColor: "#eee"
    },
    footerSocial:{
        backgroundColor: "#3f51b5",
        color: "#eee",
        padding: "0 48px"
    },
    footerContent:{
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 6}px`,
    },
    socialButtonContianer:{
        display:"flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    icons:{
        color:"#eee",
        fontSize: "x-large"
    }
  });
  

const Footer = (props) => {
    const {classes} = props;
  return (
    <div className={classes.footerDiv}>
        <footer className={classNames(classes.footer)}>
        
        <Grid container spacing={32} justify="space-evenly" className={classNames(classes.layout, classes.footerContent)}>
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography key={item} variant="subtitle1" color="textSecondary">
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={32} justify="space-evenly" className={classes.footerSocial}>
            <Grid item xs><p>&copy; {new Date().getFullYear()} Copyright: Fluent Truant</p></Grid>
            <Grid item xs={4} className={classes.socialButtonContianer}>
                {social_links.map(link => (
                   <a href="text-lesson" key={link.icon}>
                   <div
                    //  onClick={item.click}
                     key={link.icon}
                   >
                     <i className={classNames("fa " + link.icon, classes.icons)}
                       key={link.icon}
                       aria-hidden="true"
                     ></i>
                   </div>
                 </a>
                ))}
            </Grid>
        </Grid>
      </footer>
    </div>
  )
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Footer);