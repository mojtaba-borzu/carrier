import React from 'react'
import NeshanMap from 'react-neshan-map-leaflet'

function SimpleMap({
  deliveryAddressLatitude,
  deliveryAddressLongitude,
  nameLocation,
  basketLocation,
}) {
  return (
    <NeshanMap
      options={{
        key: 'web.0095d652c6ef48c08cc8b231ce7fd0d6',
        maptype: 'dreamy',
        poi: true,
        traffic: true,
        center: [
          deliveryAddressLatitude ? deliveryAddressLatitude : 35.699739,
          deliveryAddressLongitude ? deliveryAddressLongitude : 51.338097,
        ],
        zoom: 13,
      }}
      onInit={(L, myMap) => {
        L.marker([
          deliveryAddressLatitude ? deliveryAddressLatitude : 35.699739,
          deliveryAddressLongitude ? deliveryAddressLongitude : 51.338097,
        ])
          .addTo(myMap)
          .bindPopup(nameLocation + '  ' + basketLocation)
      }}
      style={{
        width: `${window?.innerWidth}px`,
        height: `${window?.innerHeight}px`,
        margin: 0,
        padding: 0,
        background: '#eee',
      }}
    />
  )
}

export default SimpleMap
