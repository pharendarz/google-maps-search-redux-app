export default (snackbars = [], action) => {
    switch(action.type){
        case 'CHANGE_SNACKBAR':
            return [action.payload, ...snackbars];
        default:
            return snackbars;
    }
}