import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';

export const DashBoard = () => {
  //@ts-ignore
  const onSuccess = (position: Position) => {
    console.log(position)
  }
    //@ts-ignore
  const onError = (error: PositionError) => {
    console.log(error);
  }
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    })
  }, []);
  return (
    <div>
      <div className="overflow-hidden" style={{ width: window.innerWidth, height: "90vh" }}>
      <GoogleMapReact
          defaultZoom={10}
          defaultCenter={{ lat: 59.95, lng: 60 }}
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAP}` }}
        >
      </GoogleMapReact>
      </div>
    </div>
  )
}
