export default (markers = [], action) => {
    switch(action.type){
        case 'ADD_MARKER':
            return [...markers, action.payload];
        case 'DELETE_MARKER':
            return markers.filter(element => element !== action.payload);
        case 'DELETE_ALL_MARKERS':
            return [];
        default:
            return markers;
    }
}