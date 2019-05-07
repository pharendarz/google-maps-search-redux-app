import React from 'react';
import {Button, Badge} from '@material-ui/core';
import { withSnackbar } from 'notistack';

const handleDeleteAllLocations = (props) => {
    props.deleteAllLocationsFromLocationList(props.passProps)
    props.enqueueSnackbar(
        `Deleted ${props.passProps.locationsOnList.length} locations from list.`,
        {variant: 'info',});
}

const DeleteAllButton = (props) => {
    return (
        <Badge 
            badgeContent={props.passProps.locationsOnList.length} 
            max={9} color="secondary" 
            invisible={props.passProps.locationsOnList.length === 0}
        >
            <Button 
                disabled={props.passProps.locationsOnList.length === 0}
                variant="outlined" 
                onClick={() => {handleDeleteAllLocations(props)}}
            >
                Delete all
            </Button> 
        </Badge>
    )
}

export default withSnackbar(DeleteAllButton);