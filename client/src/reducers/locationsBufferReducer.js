export default (locationsBuffer = [], action) => {
    switch(action.type){
        case 'ADD_ONE_LOCATION_TO_BUFFER':
            return [...locationsBuffer, action.payload];
        case 'DELETE_BUFER_AFTER_MERGE':
            return action.payload;
        default:
            return locationsBuffer;
    }
}