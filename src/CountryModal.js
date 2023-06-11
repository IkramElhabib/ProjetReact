import React from 'react';
import './styles.css' ;


function CountryModal({ country, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
        <p>Time Zones: {Object.values(country.timezones).join(', ')}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CountryModal;
