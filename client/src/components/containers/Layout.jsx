import React, {Component} from 'react';
// application components
import GoogleMap from '../maps/GoogleMap';
import SearchBar from '../inputs/SearchBar';
import PlacesList from '../expansion_panels/PlacesList';
import Snackbars from '../snackbars/Snackbar';
// material-ui
import {Grid, Paper} from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
// redux
import {connect} from 'react-redux';
// redux actions
import {addOneLocationToBufferList} from '../../actions/locationBufferActions';
import {initMap} from '../../actions/mapActions';
import {addMarker} from '../../actions/markersActions';
import {addInfoWindow, getCurrentInfoWindows} from '../../actions/infoWindowsActions';
import {changeCurrentSnackbar} from '../../actions/snackbarsActions';
// app functions
import {handleRenderMap} from '../../functions/mapFunctions';

const showAllInfoWindows = false; // [TODO]

class Layout extends Component {
    componentDidMount() {
        handleRenderMap(this.props);
    }
    render(){
        return(
            <div style={{margin: '0 auto', textAlign: 'left'}}>
                <Paper elevation={7}>
                    <br/>
                    <SearchBar map={this.props.map}/>
                    <br/>

                    <Grid container justify="space-between" alignItems="flex-start">
                        <Grid item xs={8}>
                            {/* [TODO] add spinner */}
                            <GoogleMap />
                        </Grid>
                        <Grid item xs={4}>
                            <PlacesList 
                                places={this.props.locationsOnList} 
                                map={this.props.map}
                            />
                        </Grid>
                    </Grid>
                    <Snackbars snackbars={this.props.snackbars}/>
                </Paper>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        locationsOnList: state.locationsOnList,
        map: state.map,
        showAllInfoWindows: showAllInfoWindows,
        snackbars: state.snackbars,
    }
}
export default connect(
    mapStateToProps, 
    {
        addOneLocationToBufferList, 
        initMap, 
        addMarker, 
        addInfoWindow,
        getCurrentInfoWindows,
        changeCurrentSnackbar
    })(Layout);