import {openOneInfoWindow, createContentStringAutoComplete} from './sharedFunctions';
import {createObjectFromResult} from './mapFunctions';

export const handleSearchBarSelection = (autocomplete, map, props) => {
    var infowindow = new window.google.maps.InfoWindow({maxWidth: 350});

    var place = autocomplete.getPlace();
    if (!place.geometry) {
        // user entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }
    // if the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
    }
    // create new marker after search + set position on map
    var marker = new window.google.maps.Marker({
        position: place.latLng,
        map: map,
        animation: window.google.maps.Animation.DROP
    });
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    // determine latLng
    const latLng = `${marker.getPosition().lat()},${marker.getPosition().lng()}`;
    // create object
    const objToSend = {
        latLng: latLng, 
        locationName: place.address_components[0].long_name,
        photos: place.photos,
        url: place.url,
        sendToList: false,
        marker: marker,
        infowindow: infowindow,
        detailed: createObjectFromResult(place)
    }
    // call action - add marker after search bar selection to markers store
    props.addMarker(marker);
    // call action add info window to store
    props.addInfoWindow(infowindow);

    // infowindow.setContent(objToSend.locationName);
    infowindow.setContent(createContentStringAutoComplete(objToSend));
    // get current state of infowindows
    const currentInfoWindows = props.getCurrentInfoWindows();

    if (props.showAllInfoWindows)
        infowindow.open(map, marker); //[TODO]
    else {
        openOneInfoWindow(currentInfoWindows, infowindow, marker, map);
    }
    // call action - add location to location buffer store
    props.addOneLocationToBufferList(objToSend);
}