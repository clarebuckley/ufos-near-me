import React, { createRef, Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
/** Responsible for rendering the map displaying probability of getting abducted
 * */

class MapDetail extends Component {
    constructor() {
        super()
        this.state = {
            zoom: 8,
            latlng: { lat: 52.570048, lng: -1.899332 }
        }

    }

    mapRef = createRef()

    handleClick = (event) => {
        this.setState({
            hasLocation: true,
            latlng: event.latlng,
        })
        this.props.handleLocationChange(event.latlng);
    }

    //we might not need this?
    handleLocationFound = (event) => {
     /*   this.setState({
            hasLocation: true,
            latlng: event.latlng,
        })
        this.props.handleLocationChange(event.latlng);*/
    }

    render() {
        return (
            <Map
                className="column"
                center={this.state.latlng}
                length={4}
                onClick={this.handleClick}
                onLocationfound={this.handleLocationFound}
                ref={this.mapRef}
                zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={this.state.latlng}>
                    <Popup>
                        You are here
                    </Popup>
                </Marker>
            </Map>
        )

    }
}

export default MapDetail;
