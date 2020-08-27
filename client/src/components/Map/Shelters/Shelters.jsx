import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';
const mapStyles = {
    width: '80%',
    height: '80%'
}

const Shelters = ({ google }) => {

    return (
        <Fragment>
            <h1>Shelter</h1>
            <Map
                google={google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: -1.2884,
                    lng: 36.8233
                }}
            />
        </Fragment>
    )
}

Shelters.propTypes = {
    google: PropTypes.any,
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyCnUyERFHLkchPS__Ldc8uQMfKV40jpNaQ' })(Shelters);