import React from 'react';
import {GoogleMap, LoadScriptNext, OverlayView} from "@react-google-maps/api";

const initialPosition = {lat: 37.284315, lng: 127.044504};

const OverlayContainer = () => {
  return (
      <>
          <LoadScriptNext region="ko">
              <GoogleMap
                  id="overlay-view-example"
                  googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE"
                  mapContainerStyle={{
                      height: "400px",
                      width: "800px"
                  }}
                  zoom={11}
                  center={initialPosition}
              >
                  <OverlayView
                      position={initialPosition}>
                      <div style={{
                              background: `white`,
                              border: `1px solid #ccc`,
                              padding: 15
                          }}>
                          <h1>OverlayView</h1>
                      </div>
                  </OverlayView>
              </GoogleMap>
          </LoadScriptNext>
          </>
  )
};

export default OverlayContainer;
