// src/components/CountryData.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Country {
  name: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  area: number;
  region: string;
  subregion: string;
}

const CountryData: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const data = response.data.map((country: any) => ({
          name: country.name.common,
          population: country.population,
          flags: country.flags,
          area: country.area,
          region: country.region,
          subregion: country.subregion,
        }));
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Country Data</h1>

        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {selectedCountry ? (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition transform hover:scale-105">
            <button
              onClick={handleBack}
              className="mb-4 text-blue-500 underline hover:text-blue-700"
            >
              Back to Country List
            </button>
            <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name}`} className="w-full h-48 object-cover mb-4 rounded-md shadow-md" />
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{selectedCountry.name}</h2>
            <p className="text-gray-700">Population: {selectedCountry.population.toLocaleString()}</p>
            <p className="text-gray-700">Area: {selectedCountry.area.toLocaleString()} km²</p>
            <p className="text-gray-700">Region: {selectedCountry.region}</p>
            <p className="text-gray-700">Subregion: {selectedCountry.subregion}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country) => (
              <div
                key={country.name}
                className="bg-white p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => handleCountryClick(country)}
              >
                <img src={country.flags.png} alt={`Flag of ${country.name}`} className="w-full h-24 object-cover mb-4 rounded-md shadow-md" />
                <h2 className="text-xl font-bold mb-2 text-gray-800">{country.name}</h2>
                <p className="text-gray-700">Population: {country.population.toLocaleString()}</p>
                <p className="text-gray-700">Area: {country.area.toLocaleString()} km²</p>
                <p className="text-gray-700">Region: {country.region}</p>
                <p className="text-gray-700">Subregion: {country.subregion}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p>Powered by KimTech</p>
        <p>Email: elijahkimani1293@gmail.com | Phone: 0791337188</p>
      </footer>
    </div>
  );
};

export default CountryData;
