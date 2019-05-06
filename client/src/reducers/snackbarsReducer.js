export default (snackbars = [], action) => {
    switch(action.type){
        case 'CHANGE_SNACKBAR':
            return [...snackbars, action.payload];
        default:
            return snackbars;
    }
}