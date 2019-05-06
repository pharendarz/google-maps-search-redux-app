import React from 'react';
import {Button} from '@material-ui/core';

const DeleteAllButton = (props) => {
    return (
        <Button onClick={() => props.handleDeleteAllLocations(props.passProps)}>Delete all</Button> 
    )
}

export default DeleteAllButton;