import React, { Component } from 'react'
import { TileLayer, Marker, Popup } from 'react-leaflet'
import MapDetail from './MapDetail'

export default class RealMap extends Component {
  state = {
    lat: 37.7749,
    lng: -122.4194,
    zoom: 13,
  }

  render() {
    return (
      this.props.sightings ?
        <MapDetail
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          style={{ width: '100%', height: '900px' }}
        >

          {
            this.props.sightings.map(sightings => {
              const point = [sightings['loc']['0'][0], sightings['loc']['1'][0]]


              return (
                <Marker position={point} key={sightings['_id']} >
                  <Popup>
                    <span>ADDRESS: {sightings['city']}, {sightings['state']}}</span>
                  </Popup>
                </Marker>
              )
            })
          }
        </MapDetail>
        :
        'Data is loading...'
    )
  }
}