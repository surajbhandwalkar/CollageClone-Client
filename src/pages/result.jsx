import { useLocation,useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Results(){
    const location= useLocation();
    const queryParams = new URLSearchParams(location.search);
    const {city,category}=useParams();
    console.log("city,category-->>>",city,category);
    const [collages,setcollages]=useState([]);
    const[error,setError]=useState(null);


    useEffect(()=>{
        const fetchcollages=async()=>{
            try{
                let url="";
                if(city){
                    url=`http://localhost:5402/getcollagesByCity/${city}`;
                     }else if(category){
                        url=`http://localhost:5402/getcollagesByCategory/${category}`
                     }
                     if(url){
                        const responce = await axios.get(url);
                        console.log("responec data:",responce.data);
                        setcollages(responce.data.collagesList || []);                        
                     }
                     }catch(err){
                        setError("failed to fetch collages");

                     }
        };
        if(city || category){
            fetchcollages();

        }
    },[city,category]);

    return(
<div>
      <h1>
        collages in {city ? city : category ? category : "Our Collection"}
      </h1>

      {error && <p className="error">{error}</p>}

      <div className="collages-list">
        {collages.length > 0 ? (
          collages.map((collages) => (
            <div key={collages.id} className="collages-card">
              <Link to={`/collages/${collages.id}`} className="collages-link">
                <img
                  src={collages.image || "/default-restaurant.jpg"} // Default image if not provided
                  alt={collages.collages}
                  className="collages-image"
                />
                <div className="collages-details">
                  <h2>{collages.collages}</h2>
                  <p>📍 {collages.city}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No collages found.</p>
        )}
      </div>
    </div>

    )
}
    export default Results;

