import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import {ExpansionPanel, Button, IconButton, Tooltip, Grid, FormControl, Input, InputLabel, ExpansionPanelSummary, ExpansionPanelDetails,
  Typography} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withSnackbar } from 'notistack';
// app functions
import {getPlaceByGeocodeLatLng, findAndDeleteStoredMarker} from '../../functions/mapFunctions';
import {cutLatLng} from '../../functions/sharedFunctions';
// redux
import {connect} from 'react-redux';
// app actions
import {deleteMarker} from '../../actions/markersActions';
import {deleteInfoWindow} from '../../actions/infoWindowsActions'
import {deleteOneLocationFromLocationList, deleteAllLocationsFromLocationList} from '../../actions/locationListActions';
import {changeCurrentSnackbar} from '../../actions/snackbarsActions';
// app components
import AddToListButton from '../buttons/AddToListButton';
import DeleteAllButton from '../buttons/DeleteAllButton';
// icons
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
    
    handleSelectListItem = place => {
      getPlaceByGeocodeLatLng(
        place.latLng, 
        this.props.map, 
        place, 
        this.props, 
        '_findAndSelectStoredMarker', 
        null
      );
    }
    handleDeleteListItem = async place => {
      const parameters = {
        props: this.props,
        place: place
      };
      findAndDeleteStoredMarker(parameters);
      this.props.enqueueSnackbar(
        `Deleted [${place.locationName}] from list.`,
        {variant: 'info',});
    }
    render(){
        const { expanded } = this.state;
        const { classes } = this.props;

        const selectedPlaces = this.props.places.map(place => {
            const {streetNumber, route, political, area, country, postalCode, town} = place.detailed;
            const lat = cutLatLng(place.latLng).lat;
            const lng = cutLatLng(place.latLng).lng;
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
                    <Grid container justify="space-between" alignItems="flex-start">
                        {route ?
                          <Grid item xs={6}>
                            <FormControl >
                              <InputLabel>Street:</InputLabel>
                              <Input readOnly value={`${route} ${streetNumber ? streetNumber : null}`}/>
                            </FormControl>  
                          </Grid>
                        : 
                        null}
                        {town ?
                        <Grid item xs={6}>
                          <FormControl >
                            <InputLabel>Town:</InputLabel>
                            <Input readOnly value={town}/>
                          </FormControl>  
                        </Grid>
                        : 
                        null}
                        {political ?
                        <Grid item xs={6}>
                          <FormControl >
                            <InputLabel>Region:</InputLabel>
                            <Input value={political}/>
                          </FormControl> 
                        </Grid>
                        : 
                        null}
                        {area ?
                        <Grid item xs={6}>
                          <FormControl >
                            <InputLabel>Area:</InputLabel>
                            <Input value={area}/>
                          </FormControl>  
                        </Grid>
                        : 
                        null}
                        {country ?
                        <Grid item xs={6}>
                          <FormControl >
                            <InputLabel>Country:</InputLabel>
                            <Input value={country}/>
                          </FormControl>  
                        </Grid>
                        : 
                        null}
                        {postalCode ?
                        <Grid item xs={6}>
                          <FormControl >
                            <InputLabel>Postal code:</InputLabel>
                            <Input value={postalCode}/>
                          </FormControl>  
                        </Grid>
                        : 
                        null}
                        {lat ?
                        <Grid item xs={6}>
                          <FormControl >
                            <InputLabel>Lattitude:</InputLabel>
                            <Input value={lat}/>
                          </FormControl>  
                        </Grid>
                        : 
                        null}
                        {lng ?
                        <Grid item xs={6}>
                          <FormControl >
                            <InputLabel>Longtitude:</InputLabel>
                            <Input value={lng}/>
                          </FormControl>  
                        </Grid>
                        : 
                        null}
                    </Grid>
                  </ExpansionPanelDetails>
              </ExpansionPanel>
            )
        })
      return (
        <div className={classes.root}>
          <Grid container justify="space-between" alignItems="flex-start">
              {/* buttons */}
              <Grid item xs={3}>
                <AddToListButton/>
              </Grid>
              <Grid item xs={3}>
                <DeleteAllButton deleteAllLocationsFromLocationList={this.props.deleteAllLocationsFromLocationList} passProps={this.props}/>
              </Grid>
              {/* dummy item */}
              <Grid item xs={6}/>
              {/* locations */}
              <Grid item xs={12}>
                {selectedPlaces}
              </Grid>
          </Grid>
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
    deleteAllLocationsFromLocationList,
    changeCurrentSnackbar
  })(withSnackbar(LocationsList)));
