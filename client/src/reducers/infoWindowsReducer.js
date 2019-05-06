export default (infoWindows = [], action) => {
    switch(action.type){
        case 'ADD_INFOWINDOW':
            return [...infoWindows, action.payload];
        case 'DELETE_INFOWINDOW':
            return infoWindows.filter(element => element !== action.payload);
        default:
            return infoWindows;
    }
}