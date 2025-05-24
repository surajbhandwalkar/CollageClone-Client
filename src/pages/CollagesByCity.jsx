import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/App.css";


const CollagesByCity = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [collages, setcollages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const navigate= useNavigate();
  useEffect(() => {
    // Fetch all collages to extract unique cities
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/collages`)
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data)) {
          const uniqueCities = [
            ...new Set(response.data.map((e) => e.city)),
          ];
          setCities(uniqueCities);
        }
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setLoading(true);
    setError(null);

    //axios.get(`${process.env.REACT_APP_SERVER_URL}/collages/city/${city}`)

  axios.get(`${process.env.REACT_APP_SERVER_URL}/getcollagesByCity/${city}`)
  .then((response) => {
    
    console.log(response.data);
    
      if (response.data.collagesList && Array.isArray(response.data.collagesList)) {
        setcollages(response.data.collagesList);
        navigate(`/collages/city/${city}`);
      } else {
        setcollages([]);
      }
    })
    .catch((error) => {
      setError("Failed to fetch collages.");
      setLoading(false);
    });
  }



  return (
  
      <div>
        <label>Select a City: </label>
        <select onChange={handleCityChange} value={selectedCity}>
          <option value="">-- Select --</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
  );
};

export default CollagesByCity;



