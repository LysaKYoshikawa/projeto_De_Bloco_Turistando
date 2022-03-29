import { useEffect, useRef, useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox"
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import React from 'react'

export default function Map(){

const mapElement = useRef();
const [map, setMap] = useState({});
const [lat, setLat] = useState();
const [long, setLong] = useState();
const [timeSec, setTimeSec] = useState(0)

const convertHMS = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours   = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  setTimeSec(minutes+':'+seconds)
}

const convertToPoints = (lngLat) => {
  return {
    point: {
      latitude: lngLat.lat,
      longitude: lngLat.lng
    }
  }
}

const drawRoute = (geoJson, map) => {
  if(map.getLayer('route')) {
    map.removeLayer('route')
    map.removeSource('route')
  }
  map.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: geoJson
    },
    paint: {
      'line-color': 'red',
      'line-width': 3
    }
  })
}

const addDeliveryMarker = (lngLat, map) => {
  const element = document.createElement('div')
  element.className = 'marker-delivery'
  new tt.Marker({
    element: element
  }).setLngLat(lngLat).addTo(map)
}

useEffect(() => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;


      const destinations = []
      const origin = {
        lng: longitude,
        lat: latitude,
      }
      let map = tt.map({
        key: "GebQrBNEFGzfq8vfTQb7Q4tssOAd9Gc0",
        container: mapElement.current,
        stylesVisibility: {
          trafficIncidents: false,
          trafficFlow: false,
        },
        center: [longitude, latitude],
        zoom: 17,
      });
      setMap(map);
      const addMarker = () => {
        const popupOffset = {
          bottom: [0, -35]
        }
        const popup = new tt.Popup({offset: popupOffset}).setHTML('Você está aqui !')
        const element = document.createElement('div')
        element.className = 'marker'
        const marker = new tt.Marker({
          draggable: false,
          element: element,
        })
        .setLngLat([longitude, latitude])
        .addTo(map)
        marker.setPopup(popup).togglePopup()
      }
      var geolocateControl = new tt.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: false
        }
    });

    var options = {
      searchOptions: {
          key: 'GebQrBNEFGzfq8vfTQb7Q4tssOAd9Gc0',
          language: 'en-GB',
          limit: 5
      },
      autocompleteOptions: {
          key: 'GebQrBNEFGzfq8vfTQb7Q4tssOAd9Gc0',
          language: 'en-GB'
      }
  };

    const ttSearchBox = new SearchBox(services, options);
    map.addControl(ttSearchBox, 'top-left');
    map.addControl(geolocateControl);
    addMarker()

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination);
      })
      const callParameters = {
        key: 'GebQrBNEFGzfq8vfTQb7Q4tssOAd9Gc0',
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)]
      }
      return new Promise((resolve, reject ) => {
        ttapi.services
        .matrixRouting(callParameters)
        .then((matrixAPIResults) => {
          const results = matrixAPIResults.matrix[0]
          const resultsArray = results.map((result, index) => {
            return {
              location: locations[index],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            }
          })
          resultsArray.sort((a, b) => {
            return a.drivingtime - b.drivingtime

          })
          const sortedLocations = resultsArray.map((result) => {

            convertHMS(result.drivingtime)
            return result.location
          })
          resolve(sortedLocations)
        })
      })
    }

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin)

        ttapi.services
        .calculateRoute({
          key: 'GebQrBNEFGzfq8vfTQb7Q4tssOAd9Gc0',
          locations: sorted,
        })
        .then((routeData) => {
          const geoJson = routeData.toGeoJson()
          drawRoute(geoJson, map)
        })
      })
    }


    map.on('click', (e) => {
      destinations.push(e.lngLat)
      addDeliveryMarker(e.lngLat, map)
      recalculateRoutes()
    })

    return () => map.remove()
    })
  }
}, [long, lat]);

return (
  <div style={{ width: "100%", height: "100vh" }} className="app">
    <div className="map" ref={mapElement} />
    {timeSec ? 
      <div className="second-time">
        <h3>
          A localização escolhida fica dá ao total
          <h2 className="second">{timeSec}</h2> 
          minutos de distancia
        </h3>
      </div> 
    : 
    null}


  </div>
);
}