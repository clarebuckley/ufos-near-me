import React, { Component } from 'react'
import { MapDetail, TileLayer, Marker, Popup } from 'react-leaflet'

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
          <TileLayer
            attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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