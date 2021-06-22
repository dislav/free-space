import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './locales/i18n';
import 'leaflet-control-geocoder/dist/Control.Geocoder';

ReactDOM.render(<App />, document.getElementById('root'));
