import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Paper, IconButton, Button, Badge} from '@material-ui/core/';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
//app components
import AddToListButton from '../buttons/AddToListButton';
import DeleteAllButton from '../buttons/DeleteAllButton';
//redux actions
import {deleteAllLocationsFromLocationList, deleteOneLocationFromLocationList} from '../../actions/locationListActions';
import {deleteMarker} from '../../actions/markersActions';
import {deleteInfoWindow} from '../../actions/infoWindowsActions';
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
  // handleDeleteAllLocations = () => {
  //   this.props.deleteAllLocationsFromLocationList(this.props);
  // }
  render(){
    const { classes } = this.props;
    return (
      <div>
        {/* // STIFF HEADER - NAVBAR! */}
        <Paper className={classes.root} elevation={1}>
          <IconButton disabled className={classes.iconButton}>
            {/* <MenuIcon /> */}
          </IconButton>
          <InputBase id="autocomplete_searchbar" className={classes.input} placeholder="Search Google Maps" />
          <IconButton disabled className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
          {/* <Divider className={classes.divider} />
          <IconButton color="primary" className={classes.iconButton} >
            <DirectionsIcon />
          </IconButton> */}
        </Paper>
        {/* <AddToListButton/> */}
        {/* // show if something is added to List */}
        {/* <DeleteAllButton handleDeleteAllLocations={this.props.deleteAllLocationsFromLocationList} passProps={this.props}/> */}
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return { 
    locationsOnList: state.locationsOnList,
    markers: state.markers,
    infoWindows: state.infoWindows
}
}
export default withStyles(styles)(
  connect(mapStateToProps, 
    // deleteAllLocationsFromLocationList, 
    // deleteMarker, 
    // deleteOneLocationFromLocationList,
    // deleteInfoWindow 
    null
  )(SearchBar));