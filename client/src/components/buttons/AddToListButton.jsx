import React, {Component} from 'react';
import {Button, Checkbox, FormControlLabel, Badge} from '@material-ui/core';

//redux
import {connect} from 'react-redux';
//redux actions
import {mergeLocationsWithBufferList} from '../../actions/locationListActions';


class AddToListButton extends Component {

    handleAddToListFromBuffer = () => {
        this.props.mergeLocationsWithBufferList(this.props.locationsBuffer);
    }

    render(){
        const locationCounter = (
            <Badge badgeContent={this.props.locationsBuffer.length} max={9} color="primary" invisible={this.props.locationsBuffer.length === 0}>
                <Button 
                    onClick={this.handleAddToListFromBuffer}
                    color="secondary">Add to List
                </Button>
            </Badge>
        )
        return (
            <div>

                {locationCounter}
                {/* <FormControlLabel
                    control={
                    <Checkbox
                        checked={true}  
                        onChange={()=>{}}
                        value="checkedB"
                        color="secondary"
                    />
                }
                label="add automatically to list after click"
                /> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        locationsOnList: state.locationsOnList,
        locationsBuffer: state.locationsBuffer
    }
}
export default connect(mapStateToProps, {mergeLocationsWithBufferList})(AddToListButton);