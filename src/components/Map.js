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
          draggable: true,
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
      console.log(e.lngLat)
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
  </div>
);
}