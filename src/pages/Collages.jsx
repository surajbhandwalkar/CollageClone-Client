
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/App.css";

const Collages = () => {
  const [collages, setcollages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/collages`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        if (Array.isArray(response.data)) {
          setcollages(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setcollages([]); // Fallback to an empty array
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Collages List</h2>
      <ul>
        {Array.isArray(collages) && collages.length > 0 ? (
          collages.map((collages) => (
            
            <li key={collages.id}>
              <strong>
                <a href={`/collages/${collages.id}`}>{collages.collages}</a>
              </strong> - {collages.city}

              <p>
                <a href={`/getcollagesByCity/${collages.city}`}>
                  See more collages in {collages.city}
                </a>
              </p>

            </li>

            
          ))
        ) : (
          <p>No collages available.</p>
        )}
      </ul>

      
    </div>
  );
};

export default Collages;

