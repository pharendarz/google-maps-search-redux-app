export default (locationsOnList = [], action) => {
    switch(action.type){

        case 'ADD_ONE_LOCATION_TO_LIST':
            return [...locationsOnList, action.payload];
        case 'MERGE_LOCATIONS_WITH_BUFFER':
            return [...locationsOnList, ...action.payload];
        case 'DELETE_ONE_LOCATION_FROM_LOCATION_LIST':
            return locationsOnList.filter(element => element !== action.payload);
        case 'DELETE_ALL_LOCATIONS_FROM_LOCATION_LIST':
            return action.payload;
        // case 'UNDO_ONE_ACTION_LIST': [TODO]
        //     return locations;
        // case 'REDO_ONE_ACTION_LIST': [TODO]
        //     return locations;
        default:
            return locationsOnList;
    }
}