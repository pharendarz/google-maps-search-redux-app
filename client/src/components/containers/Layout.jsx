import React, {Component} from 'react';
//application components
import GoogleMap from '../maps/GoogleMap';
import SearchBar from '../inputs/SearchBar';
import PlacesList from '../expansion_panels/PlacesList';
//style
import {Grid, Paper} from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
//redux
import {connect} from 'react-redux';
//redux actions
import {addOneLocationToBufferList} from '../../actions/locationBufferActions';
import {initMap} from '../../actions/mapActions';
import {addMarker} from '../../actions/markersActions';
import {addInfoWindow, getCurrentInfoWindows} from '../../actions/infoWindowsActions';
//app functions
import {handleRenderMap} from '../../functions/mapFunctions';
const showAllInfoWindows = false;

const styles = theme => ({
    root: {
        flexGrow: 1,
        background: '#C96567',
        overflowX: 'hidden',
        paddingTop: '5px',
        paddingBottom: '8px',
    },
    paper: {
        height: 140,
        width: 100,
    },
  });

class Layout extends Component {
    componentDidMount() {
        handleRenderMap(this.props);
    }
    render(){
        const classes = this.props;
        return(
            <div style={{margin: '0 auto', textAlign: 'center'}}>
                <Paper style={{
                    // background: '#fff', 
                    // height: 600,
                    // width: 800,
                    // flexGrow: 1,
                }} 
                    elevation={7}
                >
                    <br/>
                    <SearchBar map={this.props.map}/>
                    <br/>

                    <Grid container justify="space-between" alignItems="flex-start">
                        <Grid item xs={8}>
                            {/* //add spinner */}
                            <GoogleMap />
                        
                        </Grid>
                        <Grid item xs={4}>
                            <PlacesList 
                                places={this.props.locationsOnList} 
                                map={this.props.map}
                            />
                        
                        </Grid>
                    </Grid>
                
                </Paper>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        locationsOnList: state.locationsOnList,
        map: state.map,
        showAllInfoWindows: showAllInfoWindows
    }
}
export default connect(
    mapStateToProps, 
    {
        addOneLocationToBufferList, 
        initMap, 
        addMarker, 
        addInfoWindow,
        getCurrentInfoWindows
    })(withStyles(styles)(Layout));