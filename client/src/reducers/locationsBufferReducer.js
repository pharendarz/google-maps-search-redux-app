export default (locationsBuffer = [], action) => {
    switch(action.type){
        case 'ADD_ONE_LOCATION_TO_BUFFER':
            return [...locationsBuffer, action.payload];
        case 'DELETE_BUFER_AFTER_MERGE':
            return action.payload;
        // case 'MOVE_TO_LOCATIONS_BUFFER':
        //     return [...locations, action.payload];
        // case 'DELETE_FROM_BUFFER_LOCATIONS':
        //     return locations;
        // case 'DELETE_ALL_LOCATIONS_FROM_LIST':
        //     return locations;
        // case 'UNDO_ONE_ACTION_LIST':
        //     return locations;
        // case 'REDO_ONE_ACTION_LIST':
        //     return locations;
        default:
            return locationsBuffer;
    }
}