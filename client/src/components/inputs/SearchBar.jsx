import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Paper, IconButton, Button, Badge} from '@material-ui/core/';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
//redux
import {connect} from 'react-redux';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class SearchBar extends Component {
  render(){
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <IconButton disabled className={classes.iconButton}/>
          <InputBase id="autocomplete_searchbar" className={classes.input} placeholder="Search Google Maps" />
          <IconButton disabled className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchBar);