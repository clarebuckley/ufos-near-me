import React, { createRef, Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from "leaflet";
import HeatmapLayer from 'react-leaflet-heatmap-layer';

/** Responsible for rendering the map displaying probability of getting abducted
 * */

class MapDetail extends Component {
    constructor() {
        super()
        this.state = {
            zoom: 8,
            latlng: { lat: 52.570048, lng: -1.899332 },
            markers: [{ lat: 52.570048, lng: -1.899332 }],
            heatmapData: {
                max: 10,
                data: [[52.570048, -1.899332, "120"]]
            },
            userClickedHere: { lat: 52.570048, lng: -1.899332 }
        }
    }

    mapRef = createRef()

    componentDidMount() {
        this.getMapData();
    }

    getMapData = () => {
        this.populateHeatmap(this.props.sightings);
        this.addMarkers(this.props.sightings);
    }

    handleClick = (event) => {
        this.getMapData();
        this.setState({
            latlng: event.latlng,
            userClickedHere: event.latlng
        })
        this.props.handleLocationChange(event.latlng);
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

    populateHeatmap = (sightings) => {
        let latLngValues = [];
        let newHeatmapData = [];

        for (let sighting of sightings) {
            newHeatmapData.push([sighting.obj.loc[1], sighting.obj.loc[0], "120"]);
            latLngValues.push(sighting.obj.loc[1] + "," + sighting.obj.loc[0])
        }

        let sightingsCount = this.countSightingsInEachLocation(latLngValues);

        for (let sighting in sightingsCount) {
            let lat = sighting.split(",")[0];
            let lng = sighting.split(",")[1];
            newHeatmapData.push([lat, lng, sightingsCount[sighting]]);
        }

        this.setState({
            heatmapData: {
                data: newHeatmapData
            }
        })
    }

    countSightingsInEachLocation(latLngValues) {
        let count = {};
        latLngValues.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
        return count;
    }

    render() {
        const icon = new Icon({
            iconUrl: "./ufo-icon.png",
            iconSize: [25, 25]
        });

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
                <Marker position={this.state.userClickedHere} icon={icon}>
                        <Popup>
                        You Clicked Here
                        </Popup>
                </Marker>
                {this.state.markers.map((marker, index) => (
                    <Marker position={marker} key={index}> marker_index={index}>
                        <Popup>
                            {index + 1} sightings were recorded here
                        </Popup>
                    </Marker>
                ))}
            </Map>
        )
    }
}

export default MapDetail;
