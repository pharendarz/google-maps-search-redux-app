import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ExpansionPanel, Button, IconButton, Tooltip, Grid} from '@material-ui/core/';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// app functions
import {getPlaceByGeocodeLatLng} from '../../functions/mapFunctions';
// redux
import {connect} from 'react-redux';
// app actions
import {deleteMarker} from '../../actions/markersActions';
import {deleteInfoWindow} from '../../actions/infoWindowsActions'
import {deleteOneLocationFromLocationList, deleteAllLocationsFromLocationList} from '../../actions/locationListActions';
// app components
import AddToListButton from '../buttons/AddToListButton';
import DeleteAllButton from '../buttons/DeleteAllButton';
// icons
import DirectionsIcon from '@material-ui/icons/Directions';
import {PinDrop, DeleteForever} from '@material-ui/icons/';
const styles = theme => ({
  root: {
    width: '30vw',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class LocationsList extends React.Component {
    // component behaviour state
    state = {
      expanded: null,
    };
    handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
    };
    
    handleSelectListItem = (place) => {
      getPlaceByGeocodeLatLng(
        place.latLng, 
        this.props.map, 
        place, 
        this.props, 
        '_findAndSelectStoredMarker', 
        null
      );
    }
    handleDeleteListItem = (place) => {
      getPlaceByGeocodeLatLng(
          place.latLng, 
          this.props.map, 
          place, 
          this.props, 
          '_findAndDeleteStoredMarker',
          null);
    }
    render(){
        const { expanded } = this.state;
        const { classes } = this.props;

        const selectedPlaces = this.props.places.map(place => {
            return (
              <ExpansionPanel expanded={expanded === place.latLng} onChange={this.handleChange(place.latLng)}>
                  <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />}>
                    {/* container in summary */}
                    <Grid container justify="space-between" alignItems="flex-start">
                      <Grid item xs={6}>
                        {/* first item - Title*/}
                        <Grid container justify="flex-start" alignItems="flex-start">
                          <Grid item >
                            <Typography className={classes.heading}>{place.locationName}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                      {/* second item - Buttons*/}
                        <Grid container justify="flex-end" alignItems="flex-end">
                          <Grid item >
                            {/* Select Marker Button */}
                            <Tooltip
                              id="tooltip_SelectMarker"
                              title="Select Marker"
                            >
                              <IconButton onClick={() => this.handleSelectListItem(place)}>
                                <PinDrop style={{color: "tomato"}}/>
                              </IconButton>
                            </Tooltip>
                            {/* Delete Marker Button */}
                            <Tooltip
                              id="tooltip_DeleteMarker"
                              title="Delete Marker"
                            >
                              <IconButton onClick={() => this.handleDeleteListItem(place)}>
                                <DeleteForever/>
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{background: '#F1F1F1'}}>
                  <Typography>
                      {place.latLng} 
                  </Typography>
                  </ExpansionPanelDetails>
              </ExpansionPanel>
            )
        })
      return (
          //zrob tez disabled jak nic nie ma
        <div className={classes.root}>
          <Grid container justify="space-between" alignItems="flex-start">
              <Grid item xs={6}>
                <AddToListButton/>
              </Grid>
              <Grid item xs={6}>
                <DeleteAllButton handleDeleteAllLocations={this.props.deleteAllLocationsFromLocationList} passProps={this.props}/>

              </Grid>
              <Grid item xs={12}>
                {selectedPlaces}
              </Grid>
          </Grid>
            {/* <Button>Show/Hide List</Button> */}
        </div>
      );

  }
}

LocationsList.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return { 
    markers: state.markers,
    infoWindows: state.infoWindows,
    locationsOnList: state.locationsOnList,
  }
}
export default withStyles(styles)(
  connect(mapStateToProps, {
    deleteMarker, 
    deleteInfoWindow, 
    deleteOneLocationFromLocationList,
    deleteAllLocationsFromLocationList
  })(LocationsList));
