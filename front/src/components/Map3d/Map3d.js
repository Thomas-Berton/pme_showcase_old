import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'
import './Map3d.scss';
mapboxgl.accessToken = 'pk.eyJ1IjoicG1lbWFuYWdldXIiLCJhIjoiY2wwcHJ2eDZkMXh0MzNqcHd2ZnpzbTV3aCJ9.lwW_Blrjj_3gaH5UzvJUCg';

const Map3d = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 5.365751760846829
  const lat = 43.29385976316366;
  const zoom = 13;
  const pitch = 45;

  const rotateCamera = (timestamp) => {
    map.current.rotateTo((timestamp / 350) % 360, { duration: 0 });
    window.requestAnimationFrame(rotateCamera);
  }

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/pmemanageur/cl0pugk24005z14mqgn9aaust',
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch
    });
    rotateCamera(0);
  }, []);

  return (
    <div ref={mapContainer} id="map" className="w-4/5 h-80  rounded-md shadow-md"></div>
  )
};

export default Map3d;







