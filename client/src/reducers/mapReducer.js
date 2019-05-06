export default (map = null, action) => {
    switch(action.type){
        case 'INIT_GOOGLE_MAP':
            return action.payload;
        default:
            return map;
    }
}
