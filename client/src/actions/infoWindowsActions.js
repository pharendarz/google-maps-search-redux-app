export const addInfoWindow = (infoWindow) => {
    return {
        type: 'ADD_INFOWINDOW',
        payload: infoWindow
    }
}
export const deleteInfoWindow = (infoWindow) => {
    return {
        type: 'DELETE_INFOWINDOW',
        payload: infoWindow
    }
}
export const getCurrentInfoWindows = () => (dispatch, getState) => {
    const infoWindows = getState().infoWindows;
    return infoWindows;
}