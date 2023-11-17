import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
 
  const position = [33.494113, 36.302488];

  return (
    <div className="map-container">
      <MapContainer 
        center={position} 
        zoom={15} 
        style={{ height: '300px', width: '150%' }}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={false}
        doubleClickZoom={true}
        zoomControl={true}
        keyboard={true}>
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        
        <Marker position={position} style={{color:"red"}}>
          <Popup>
            .نحن هنا 
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
