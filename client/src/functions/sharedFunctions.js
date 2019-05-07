export const findInArray = (array, itemToFind) => {
    for (let i=0; i < array.length; i++){
      if (array[i] === itemToFind){
        return array[i];
      }
    }
    return null;
}

export const openOneInfoWindow = (infoWindows, infoWindowToFind, markerToFind, map) => {
  for (let i=0; i<infoWindows.length; i++){
    if(infoWindows[i] !== infoWindowToFind)
      infoWindows[i].close();
    else
      infoWindows[i].open(map, markerToFind);
  }
}
export const openAllInfoWindows = (infoWindows, markers, map) => {
  for (let i=0; i<infoWindows.length; i++){
      // infoWindows[i].open(map, markerToFind); //[TODO]
  }
}

export const createGoogleMapObject = (parameters) => {

}

//[TODO - corrections]
export const createContentStringAutoComplete = (object) => {
  const cuttedLatLng = cutLatLng(object.latLng, 9);

  return `<div>`+
            `<p><b>${object.locationName}</b></p>`+
            `<p>` +
            `lat: ${cuttedLatLng.lat} lng: ${cuttedLatLng.lng}`+
            `.</p>`+
            `<p> <a href="${object.url}">`+
            `find more</a> `+
            `</p>`+
          `</div>`;

}
export const createContentStringMapClick = (object) => {
  const cuttedLatLng = cutLatLng(object.latLng, 9);

  return `<div>`+
            `<p><b>${object.locationName}</b></p>`+
            `<p>` +
            `lat: ${cuttedLatLng.lat} lng: ${cuttedLatLng.lng}`+
            `</p>`+
          `</div>`;

}
export const cutLatLng = (latLng, length) => {
  const splitted = latLng.split(',');
  const lat = splitted[0].substring(0, length); 
  const lng = splitted[1].substring(0, length); 
  return {
    lat: lat,
    lng: lng
  }
}