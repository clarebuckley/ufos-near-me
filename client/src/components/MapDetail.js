import React, { createRef, Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

/** Responsible for rendering the map displaying probability of getting abducted
 * */

class MapDetail extends Component {
    constructor() {
        super()
        this.state = {
            zoom: 8,
            latlng: { lat: 52.570048, lng: -1.899332 },
            markers: [{ lat: 52.570048, lng: -1.899332 }, { lat: 53.570048, lng: 1.899332 }],
            heatmapData: {
                max: 10,
                data: [
                    [-37.8839, null, "571"],
                    [-37.8869090667, 175.3657417333, "486"],
                    [-37.8894207167, 175.4015351167, "807"],
                    [-37.8927369333, 175.4087452333, "899"],
                    [-37.90585105, 175.4453463833, "1273"]
                ]
            }
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
            markers.push({ lng: sighting.obj.loc[0], lat: sighting.obj.loc[1] })
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
                <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    points={this.state.heatmapData.data}
                    max={this.state.heatmapData.max}
                    radius={this.state.heatmapData.radius}
                    longitudeExtractor={m => m[1]}
                    latitudeExtractor={m => m[0]}
                    intensityExtractor={m => parseFloat(m[2])}
                />
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
