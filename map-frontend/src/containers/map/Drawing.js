import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, DrawingManager } from '@react-google-maps/api';


const ExampleDrawing = ({ center }) => (
    <div className='map'>
        <div className='map-container'>
                id='drawing-example'
                zoom={2}
                center={center}
            >
                <DrawingManager />
        </div>
    </div>
);

export default ExampleDrawing;
