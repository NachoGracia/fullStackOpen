import { useEffect, useState } from "react";
import { getAllCountries } from "./services/services";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [findCountries, setFindCountries] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  //console.log("🚀 ~ App ~ selectedCountry:", selectedCountry.capital[0]);

  const [weather, setWheather] = useState(null);
  //console.log("🚀 ~ App ~ weather:", weather);

  const handleFilterCountries = (event) => {
    setFindCountries(event.target.value);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(findCountries.toLowerCase())
  );

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_SOME_KEY;
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital;

      axios
        .get(
          `
http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capital}&aqi=no`
        )
        .then((response) => {
          setWheather(response.data.current.condition.text);
        });
    }
  }, [filteredCountries]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_SOME_KEY;

    if (selectedCountry) {
      const capital = selectedCountry.capital[0];

      axios
        .get(
          `
  http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capital}&aqi=no`
        )
        .then((response) => {
          setWheather(response.data.current.condition.text);
        });
    }
  }, [selectedCountry]);

  return (
    <>
      <label>
        Find countries: <input type="text" onChange={handleFilterCountries} />
      </label>
      <div>
        {findCountries ? (
          filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : filteredCountries.length > 1 && filteredCountries.length < 10 ? (
            filteredCountries.map((country) => (
              <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleShowCountry(country)}>SHOW</button>
              </div>
            ))
          ) : filteredCountries.length === 1 ? (
            <div>
              <h2>{filteredCountries[0].name.common}</h2>
              <p>capital {filteredCountries[0].capital}</p>
              <p>population {filteredCountries[0].population}</p>
              <h3>languages</h3>
              <ul>
                {Object.values(filteredCountries[0].languages).map(
                  (language) => (
                    <li key={language}>{language}</li>
                  )
                )}
              </ul>
              <img
                src={`${filteredCountries[0].flags.png}`}
                alt={`flag of ${filteredCountries[0].name.common}`}
                height="150"
                width="150"
              />
              <p>{weather}</p>
            </div>
          ) : null
        ) : null}

        {selectedCountry && (
          <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>capital {selectedCountry.capital}</p>
            <p>population {selectedCountry.population}</p>
            <h3>languages</h3>
            <ul>
              {Object.values(selectedCountry.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={`${selectedCountry.flags.png}`}
              alt={`flag of ${selectedCountry.name.common}`}
              height="150"
              width="150"
            />
            <p>{weather}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
