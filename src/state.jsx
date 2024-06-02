import React, { useEffect, useState } from "react";
import "./state.css";
import axios from "axios";
export default function State() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [submission, setSubmission] = useState(false);
  async function getcountry() {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/countries`
      );
      setCountryList(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getcountry();
  }, []);

  const handleCountryChange = async (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    try {
      const response = await axios.get(
        ` https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      setStateList(response.data);
    } catch (error) {
      console.error("Error fetching state", error);
    }
    setState("");
    setCityList([]);
    setSubmission(false);
  };

  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    setState(selectedState);

    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/state=${selectedState}/cities`
      );

      setCityList(response.data);
    } catch (error) {
      console.error("error fetching cities", error);
    }
    setCity("");
    setSubmission(false);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setSubmission(selectedCity !== "");
  };
  return (
    <div>
      <h1>Select Location</h1>
      <div className="searchbar">
        <select value={country} onChange={handleCountryChange}>
          <option value="">Country</option>
          {countryList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select value={state} onChange={handleStateChange} disabled={!country}>
          <option value="">State</option>
          {stateList.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select value={city} onChange={handleCityChange} disabled={!state}>
          <option value="">city</option>
          {cityList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {submission && (
        <h4>
          {" "}
          You Selected {city}, {state}, {country}
        </h4>
      )}
    </div>
  );
}
