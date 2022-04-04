import { useEffect, useRef, useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox"
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import React from 'react'
import POICard from './POICard'
import NavBar from "./NavBar";

export default function Map() {

  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [timeSec, setTimeSec] = useState(0)
  const [poi, setPoi] = useState([])

  const convertHMS = (value) => {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    setTimeSec(hours == 0 ? minutes + ':' + seconds + ' minutos' : hours + ':' + minutes + ':' + seconds + ' horas')
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
    if (map.getLayer('route')) {
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
          key: "R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi",
          container: mapElement.current,
          stylesVisibility: {
            trafficIncidents: false,
            trafficFlow: false,
          },
          center: [longitude, latitude],
          zoom: 14,
        });
        setMap(map);
        const addMarker = () => {
          const popupOffset = {
            bottom: [0, -35]
          }
          const popup = new tt.Popup({ offset: popupOffset }).setHTML('Você está aqui !')
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
            key: 'R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi',
            language: 'pt-BR',
            limit: 5,

          },
          autocompleteOptions: {
            key: 'R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi',
            language: 'pt-BR'
          }
        };

        const ttSearchBox = new SearchBox(services, options);
        map.addControl(ttSearchBox, 'top-left');
        map.addControl(geolocateControl);
        addMarker()
        var searchMarkersManager = new SearchMarkersManager(map);
        ttSearchBox.on('tomtom.searchbox.resultselected', handleResultSelection);
        ttSearchBox.on('tomtom.searchbox.resultfocused', handleResultSelection);
        ttSearchBox.on('tomtom.searchbox.resultscleared', handleResultClearing);

        function handleResultSelection(event) {
          var result = event.data.result;
          if (result.type === 'category' || result.type === 'brand') {
            return;
          }
          searchMarkersManager.draw([result]);
          fitToViewport(result);

        }

        function fitToViewport(markerData) {
          if (!markerData || markerData instanceof Array && !markerData.length) {
            return;
          }
          var bounds = new tt.LngLatBounds();
          if (markerData instanceof Array) {
            markerData.forEach(function (marker) {
              bounds.extend(getBounds(marker));
            });
          } else {
            bounds.extend(getBounds(markerData));
          }
          map.fitBounds(bounds, { padding: 100, linear: true });
        }

        function getBounds(data) {
          var btmRight;
          var topLeft;
          if (data.viewport) {
            btmRight = [data.viewport.btmRightPoint.lng, data.viewport.btmRightPoint.lat];
            topLeft = [data.viewport.topLeftPoint.lng, data.viewport.topLeftPoint.lat];
          }
          return [btmRight, topLeft];
        }

        function handleResultClearing() {
          searchMarkersManager.clear();
        }

        function SearchMarkersManager(map, options) {
          this.map = map;
          this._options = options || {};
          this._poiList = undefined;
          this.markers = {};
        }

        SearchMarkersManager.prototype.draw = function (poiList) {
          this._poiList = poiList;
          this.clear();
          this._poiList.forEach(function (poi) {
            var markerId = poi.id;
            var poiOpts = {
              name: poi.poi ? poi.poi.name : undefined,
              address: poi.address ? poi.address.freeformAddress : '',
              distance: poi.dist,
              classification: poi.poi ? poi.poi.classifications[0].code : undefined,
              position: poi.position,
              entryPoints: poi.entryPoints
            };
            displayPOIInformation(poi.id)
            var marker = new SearchMarker(poiOpts, this._options);
            marker.addTo(this.map);
            this.markers[markerId] = marker;
          }, this);
        };

        SearchMarkersManager.prototype.clear = function () {
          for (var markerId in this.markers) {
            var marker = this.markers[markerId];
            marker.remove();
          }
          this.markers = {};
          this._lastClickedMarker = null;
        };

        function SearchMarker(poiData, options) {
          this.poiData = poiData;
          this.options = options || {};
          const element = document.createElement('div')
          element.className = 'marker'
          this.marker = new tt.Marker({
            element: element,
            anchor: 'bottom'
          });
          var lon = this.poiData.position.lng || this.poiData.position.lon;
          this.marker.setLngLat([
            lon,
            this.poiData.position.lat
          ]);

        }

        SearchMarker.prototype.addTo = function (map) {
          this.marker.addTo(map);
          destinations.push(this.marker._lngLat)
          recalculateRoutes()
          this._map = map;
          return this;
        };

        SearchMarker.prototype.createMarker = function () {
          var elem = document.createElement('div');
          elem.className = 'tt-icon-marker-black tt-search-marker';
          if (this.options.markerClassName) {
            elem.className += ' ' + this.options.markerClassName;
          }
          var innerElem = document.createElement('div');
          innerElem.setAttribute('style', 'background: white; width: 10px; height: 10px; border-radius: 50%; border: 3px solid black;');

          elem.appendChild(innerElem);
          return elem;
        };

        SearchMarker.prototype.remove = function () {
          this.marker.remove();
          this._map = null;
        };

        const sortDestinations = (locations) => {
          const pointsForDestinations = locations.map((destination) => {
            return convertToPoints(destination);
          })
          const callParameters = {
            key: 'R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi',
            destinations: pointsForDestinations,
            origins: [convertToPoints(origin)]
          }
          return new Promise((resolve, reject) => {
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
                key: 'R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi',
                locations: sorted,
              })
              .then((routeData) => {
                const geoJson = routeData.toGeoJson()
                drawRoute(geoJson, map)
              })
          })
        }

        map.on('click', (e) => {

          const touchingLayer = map.queryRenderedFeatures(e.point)[0]
          destinations.push(e.lngLat)
          addDeliveryMarker(e.lngLat, map)
          recalculateRoutes()

          if (touchingLayer.layer.id === 'POI') {
            if (touchingLayer.properties.id) {
              displayPOIInformation(touchingLayer.properties.id)
            }
          }
        })

        const displayPOIInformation = (id) => {
          ttapi.services.placeById({
            key: "R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi",
            entityId: id
          })
            .then((response) => {
              const firstResult = response.results[0]
              const poiName = firstResult.poi.name
              const poiAdress = firstResult.address.freeformAddress
              setPoi([poiName, poiAdress])
              if (firstResult.dataSources) {
                const id = firstResult.dataSources.poiDetails[0].id
                fetchPOIDetails(id)
              }
            })
        }

        const fetchPOIDetails = (id) => {
          ttapi.services.poiDetails({
            id: id,
            key: "R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi"
          })
            .then((response) => {
              if (response.result.rating) {
                const poiRating = 'Avaliação: ' + response.result.rating.value + ' (' + response.result.rating.totalRatings + ' avaliações)'
                setPoi(poi => [...poi, poiRating])
              } else {
                setPoi(poi => [...poi, null])
              }
              if (response.result.popularHours) {
                const poiBH = response.result.popularHours[3].timeRanges[0].startTime.hour + ':00h - ' + response.result.popularHours[3].timeRanges[1].endTime.hour + ':00h'
                setPoi(poi => [...poi, poiBH])
              } else {
                setPoi(poi => [...poi, null])
              }
              if (response.result.photos) {
                const photoId = response.result.photos[0].id
                fecthPhoto(photoId)
              } else {
                setPoi(poi => [...poi, null])
              }
            })
        }

        const fecthPhoto = (id) => {
          ttapi.services.poiPhotos({
            id: id,
            key: "R9bCYFNCUsbVAuCseQIUGeavUNAmgdwi",
          })
            .then((data) => {
              const poiPhoto = data
              setPoi(poi => [...poi, poiPhoto])
            })
        }

        return () => map.remove()
      })
    }
  }, [long, lat]);

  return (
    <div style={{ width: "100%", height: "100vh" }} className="app">
      <div className="map" ref={mapElement} />
      <div className="nav-bar">
        <NavBar />
      </div>
      {poi.length !== 0 ?
        <div className="poi-box">
          <POICard poiFields={poi} distancia={timeSec}></POICard>
        </div>
        :
        null
      }
    </div>
  );
}