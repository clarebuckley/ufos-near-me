import React, { createRef, Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
/** Responsible for rendering the map displaying probability of getting abducted
 * */

class MapDetail extends Component {
    constructor() {
        super()
        this.state = {
            zoom: 8,
            latlng: { lat: 52.570048, lng: -1.899332 },
            markers: [{ lat: 52.570048, lng: -1.899332 }, { lat: 53.570048, lng: 1.899332 }]
        }
    }

    mapRef = createRef()

    handleClick = (event) => {
        this.props.handleLocationChange(event.latlng);
        this.addMarkers(this.props.sightings);
        this.setState({
            latlng: event.latlng
        })

    }

    //Add markers from each sighting to map
    addMarkers = (sightings) => {
        let markers = [];
        for (let sighting of sightings) {
            markers.push({lng:sighting.obj.loc[0], lat:sighting.obj.loc[1]})
        }
        this.setState({
            markers: markers
        })
    }


    render() {
        return (
            <Map
                className="column"
                center={this.state.latlng}
                length={4}
                onClick={this.handleClick}
                ref={this.mapRef}
                zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.markers.map((marker, index) => (
                    <Marker position={marker} key={index}> marker_index={index}>
                        <Popup>
                            {index + 1} here
                        </Popup>
                    </Marker>
                ))}
            </Map>
        )

    }
}

export default MapDetail;
