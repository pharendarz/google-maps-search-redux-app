//app config
import {loadScript} from '../config';
import {keys} from '../config/keys';
import {handleSearchBarSelection} from './autocompleteFunctions';
import {findInArray, openOneInfoWindow, createContentStringMapClick} from './sharedFunctions';

export const handleRenderMap = (props) => {
    window.initMap = () => {_initGoogleMap(props)};
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${keys.googleMapsJavaScriptApiKey}&libraries=places&callback=initMap`);
}
const _initGoogleMap = (props) => {
    // map initialization
    const defaultLoc = new window.google.maps.LatLng(50 , 50);

    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: defaultLoc,
        zoom: 11
    });
    // call action to add map to state
    props.initMap(map);

    // set geolocalization
    getCurrentLocationFromBrowser(map);
    // set SearchBar as input  
    var input = document.getElementById('autocomplete_searchbar');
    var options = {
        types: ['(cities)'],
    };
    var autocomplete = new window.google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);

    // #LISTENERS
    // add listener for mouse click on map
    map.addListener('click', (event) => {
        placeMarkerAndPanTo(event.latLng, map, props);
    });
    // add listener for autocomplete after selection from SearchBar
    autocomplete.addListener('place_changed', () => {
        handleSearchBarSelection(autocomplete, map, props);
    })
}

export const getPlaceByGeocodeLatLng = (input, map, place, props, next , marker) => {

    const geocoder = new window.google.maps.Geocoder;
    // const infowindow = new window.google.maps.InfoWindow;

    const latlngStr = input.split(',', 2);
    const latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

    geocoder.geocode({'location': latlng}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(7);
          // call next function
          switch(next){
              case '_addMarkerAfterClickOnMap': {
                  const parameters = {
                      latlng: latlng, 
                      map: map, 
                      input: input, 
                      results: results[0].formatted_address, 
                      props: props,
                      marker: marker,
                  };

                  _addMarkerAfterClickOnMap(parameters);
                  break;
              }
              case '_findAndSelectStoredMarker': {
                  const parameters = {
                      props: props,
                      map: map, 
                      results: results[0].formatted_address, 
                      place: place
                  };

                  _findAndSelectStoredMarker(parameters);
                  break;
              }
              case '_findAndDeleteStoredMarker': {
                  const parameters = {
                      props: props,
                      place: place
                  };

                  _findAndDeleteStoredMarker(parameters);
                  break;
              }
              default:
                break;
          }
        } else {
          window.alert('No results found');

        }
      } else {
        // delete marker when no result has been found
        if(marker)
          marker.setMap(null);

        window.alert('Geocoder failed due to: ' + status); // << add chips [TODO]
      }
    });
}
const _findAndDeleteStoredMarker = (parameters) => {

    var {props, place} = parameters;

    // search for existing marker & infoWindow
    let markerFromStore = findInArray(props.markers, place.marker);
    let infoWindowFromStore = findInArray(props.infoWindows, place.infowindow);

    // delete marker
    if(markerFromStore && infoWindowFromStore){
        markerFromStore.setMap(null);
        // call action - delete marker
        props.deleteMarker(markerFromStore);
        
        // call action - delete infowindow
        props.deleteInfoWindow(infoWindowFromStore);

        // delete stored location element
        props.deleteOneLocationFromLocationList(place);
    }
}
export const placeMarkerAndPanTo = (latLng, map, props) => {
    // calculate lat lng
    const marker = new window.google.maps.Marker({
        position: latLng,
        map: map
    });

    map.panTo(latLng);
    
    const input = `${marker.getPosition().lat()},${marker.getPosition().lng()}`;

    // translate latlng to place object >> call redux action
    getPlaceByGeocodeLatLng(input, map,  null, props, '_addMarkerAfterClickOnMap', marker);
}

export const getCurrentLocationFromBrowser = (map) => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
      });
    } else {
        // Browser doesn't support Geolocation
        _handleLocationError(false, map.getCenter(), map);
    }
}
const _handleLocationError = (infoWindow, pos, map) => {
    const browserHasGeolocation = new window.google.maps.InfoWindow;

    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

const _addMarkerAfterClickOnMap = (parameters) => {
    
    var {props, map, results, input, marker} = parameters;

    // add marker & infowindow after click on map 
    props.addMarker(marker);
    const infowindow = new window.google.maps.InfoWindow;

    // infowindow.setContent(results + ` ${input}`);

    const objToSend = {
        latLng: input, 
        locationName: results,
        photos: null, //results[0].photos,
        sendToList: false,
        marker: marker,
        infowindow: infowindow
    }
    // set label
    infowindow.setContent(createContentStringMapClick(objToSend));
    
    // call action - add location to location buffer store
    props.addOneLocationToBufferList(objToSend);

    // call action - add infowindow to store
    props.addInfoWindow(infowindow);

    // get current state of infowindows
    const currentInfoWindows = props.getCurrentInfoWindows();
    // open infoWindow
    if (props.showAllInfoWindows)
      infowindow.open(map, marker);
    else {
      openOneInfoWindow(currentInfoWindows, infowindow, marker, map);
    }

}

const _findAndSelectStoredMarker = (parameters) => {

    var {props, map, results, place} = parameters;
    //search for existing marker & infowindow in store
    let markerFromStore = findInArray(props.markers, place.marker);
    let infoWindowFromStore = findInArray(props.infoWindows, place.infowindow);
    if (infoWindowFromStore){
      const input = `${markerFromStore.getPosition().lat()},${markerFromStore.getPosition().lng()}`; // [TODO] > throw to shared functions
      const objToSend = {
        latLng: input, 
        locationName: results,
    }
      infoWindowFromStore.setContent(createContentStringMapClick(objToSend));
      // infoWindowFromStore.setContent(results);
      if (props.showAllInfoWindows)
        infoWindowFromStore.open(map, markerFromStore);  
      else
        openOneInfoWindow(props.infoWindows, infoWindowFromStore, markerFromStore, map);
    }
}


