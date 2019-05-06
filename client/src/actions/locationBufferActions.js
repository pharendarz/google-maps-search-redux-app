export const addOneLocationToBufferList = (objPlace) => { 
    if(!objPlace.sendToList)
        return {
            type: 'ADD_ONE_LOCATION_TO_BUFFER',
            payload: objPlace,
        }
    else
    // send to list directly if [AddToList Checkbox] is hecked
    return {
        type: 'ADD_ONE_LOCATION_TO_LIST',
        payload: objPlace,
    }
}


export const deleteFromBufferAfterMerge = () => {
    return {
        type: 'DELETE_BUFER_AFTER_MERGE',
        payload: []
    }
}