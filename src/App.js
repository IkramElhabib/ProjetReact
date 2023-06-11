import React, { useEffect, useState } from 'react';
import GenericCard from './GenericCard';
import CountryModal from './CountryModal';
import './styles.css' ;

function App() {
    // c'est la liste des pays
  const [countries, setCountries] = useState([]);
    //c'est où j'ajoute mes serches dans la serchbar
  const [searchTerm, setSearchTerm] = useState('');
    //c'est la résultat du recherche effectué dans la serchbar
  const [searchResults, setSearchResults] = useState([]);
    //c'est pour le tri des pays aplphabetiquement
  const [sortOrder, setSortOrder] = useState('asc');
    // c'est quand je clique sur un pays il me donne les détails
  const [selectedCountry, setSelectedCountry] = useState(null);
    // c'est où l'affichage du modal des détails du pays
  const [showModal, setShowModal] = useState(false);


    // ici le chargement des pays à partir du l'api on utilisant le hook useEffect
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setSearchResults(data);
      });
  }, []);

  // ici j'utilise le useEffect hook pour trier ma liste des countries

  useEffect(() => {
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
        // en utilisant fonction du trie
    const sortedCountries = filteredCountries.sort((a, b) => {
      //toLowerCase to convert en miniscule les noms des countries
      const nameA = a.name.common.toLowerCase(); 
      const nameB = b.name.common.toLowerCase();

      if (sortOrder === 'asc') {
        //la comparaison avec des noms des countries en ascendant
        return nameA.localeCompare(nameB);
      } else {
        // //la comparaison avec des noms des countries en descendant
        return nameB.localeCompare(nameA);
      }
    });
      //la résultat de tri des pays selon asc ou descendant
    setSearchResults(sortedCountries);
  }, [countries, searchTerm, sortOrder]);

    // la fonction de search dans la searchbar
  const handleSearch = e => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };
    // l'affichage du details du country dans le modal lors du click sur bouton détails

  const handleDetailsClick = country => {
    setSelectedCountry(country);
    setShowModal(true);
  };
    // le handling du tri ascendant et descendant
  const handleSort = e => {
    setSortOrder(e.target.value);
  };
        // lors du click sur country il va m'afficher les détails de ce country
  const handleCountryClick = country => {
    setSelectedCountry(country);
  };

 

  return (
    <div className="container">
      <h1>La liste des pays</h1>
      <div className="search-container">
      <div className="sort-container">
        <label htmlFor="sortOrder">Trier L'ordre</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSort}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-container">
        {searchResults.map((country, index) => (
          //l'appel du composant genericCard pour affiché les détails du country
          <GenericCard
            key={country.name.common}
            title={country.name.common}
            content={
              <>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
               
              </>
            }
            
            onClick={() => handleCountryClick(country)}
            onDetailsClick={() => handleDetailsClick(country)}
          >
            {/* l'appel de la fonction handleDetailsClick */}

            <button onClick={() => handleDetailsClick(country)}>Details</button>
          </GenericCard>
        ))}
      </div>
  
      {showModal && (
        <CountryModal country={selectedCountry} onClose={() => setShowModal(false)} />
      )}
  
      
    </div>
  );
}  

export default App;
