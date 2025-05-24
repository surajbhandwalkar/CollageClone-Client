// import React,{useState} from "react";
// import {Link,useNavigate} from 'react-router-dom';
// import "../Styles/Home.css";
// import CollagesByCity from "./CollagesByCity";
// import axios from "axios";

// const Home =()=>{
//     const [searchCity,setSearchCity]=useState("");
//     const[selectedCity,setSelectedCity]=useState("");
//     const [collages,setcollages]=useState([]);
//     const [loding,setLoading]=useState(false);
//     const [error,setError]=useState(null);
//     const navigate=useNavigate();

// const handleSearch=async(e)=>{
//     e.preventDefault();

// if(!searchCity && ! selectedCity){
//     setError("plaese select or event a city");
//     return;
//     }

//     setLoading(true);
//     setError(null);
//     const city=searchCity || selectedCity;

//     try{
//         const response=await axios.get(`http://localhost:5402/getcollageByCity/${city}`);
//         console.log("responce0-->>>>>>",response);
//         setcollages(response.data);
//         navigate(`/collages/city/${city}`);
//     }catch(err){
//         setError("failed to fetch collages");
//     }finally{
//         setLoading(false);
//     }

// }


// return(
//     <div className="home-container">
//     {/* Hero Section */}

//     <div className="hero-section">
//       <h1>Find the best collages </h1>
//       <form onSubmit={handleSearch} className="search-form">
//       <CollagesByCity/>
//         <input type="text" placeholder="Enter city name..."value={searchCity} onChange={(e) => setSearchCity(e.target.value)}/>
//         <button type="submit">Search</button>
//       </form>
//     </div>
  
//     {/* Explore Categories */}
//     <div className="explore-section">
//       <h2>Explore collages by Category</h2>
//       <div className="category-list">
//         <Link to="/collages/category/science">Science Collage</Link>
//         <Link to="/collages/category/commerce">Commerce Collage</Link>
//         <Link to="/collages/category/arts">Arts Collage</Link>
//         <Link to="/collages/category/llb">LLB Collage</Link>
//       </div>
//     </div>

//     {/* Featured collages */}
//     <div className="featured-section">
//       <h2>Top Featured collages</h2>
//       <div className="featured-list">
//         <div className="featured-item">
//           <img src="https://media.gettyimages.com/id/1179453212/photo/new-delhi-india-a-view-of-the-of-the-indian-institute-of-technology-delhi-campus-on-november.jpg?s=612x612&w=0&k=20&c=HBjIi5169ZpI0XZzR1ZibfRmr4uw3WFEw6a1J6VF5Jo=" alt="collages 1" />
//           <p> Delhi</p>
//         </div>
//         <div className="featured-item">
//           <img src="https://media.gettyimages.com/id/535277602/photo/david-sassoon-library-in-bombay-maharashtra.jpg?s=612x612&w=0&k=20&c=C2-qQ7Or_1YuqtAzZZSOUriG4NgZjuBPECYgcQSQiTI=" alt="collages 2" />
//           <p> Mumbai</p>
//         </div>
//         <div className="featured-item">
//           <img src="https://media.gettyimages.com/id/1288712635/photo/oblique-ground-level-view-of-dormitory-with-courtyard-thapar-university-patiala-india.jpg?s=612x612&w=0&k=20&c=Tj6700Zxv1EoJBB7r6A8OTzvDJ83tOMcblMwIxodUvw=" alt="collages 3" />
//           <p> Bangalore</p>
//         </div>
//       </div>
//     </div>
//   </div>

// )
// }
// export default Home;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import CollagesByCity from "./CollagesByCity";
import axios from "axios";

const Home = () => {
  const [searchCity, setSearchCity] = useState("");
  const [collages, setCollages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchCity) {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError(null);
    const city = searchCity;

    try {
      const response = await axios.get(`http://localhost:5402/getcollageByCity/${city}`);
      console.log("response-->>>>>>", response);
      setCollages(response.data);
      navigate(`/collages/city/${city}`);
    } catch (err) {
      setError("Failed to fetch collages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Find the Best Colleges</h1>
        <form onSubmit={handleSearch} className="search-form">
          <CollagesByCity />
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
        {loading && <p className="loading">Loading...</p>}
      </div>

      {/* Explore Categories */}
      <div className="explore-section">
        <h2>Explore Colleges by Category</h2>
        <div className="category-list">
          <Link to="/collages/category/science">Science College</Link>
          <Link to="/collages/category/commerce">Commerce College</Link>
          <Link to="/collages/category/arts">Arts College</Link>
          <Link to="/collages/category/llb">LLB College</Link>
        </div>
      </div>

      {/* Featured Colleges */}
      <div className="featured-section">
        <h2>Top Featured Colleges</h2>
        <div className="featured-list">
          <div className="featured-item">
            <img
              src="https://media.gettyimages.com/id/1179453212/photo/new-delhi-india-a-view-of-the-of-the-indian-institute-of-technology-delhi-campus-on-november.jpg?s=612x612&w=0&k=20&c=HBjIi5169ZpI0XZzR1ZibfRmr4uw3WFEw6a1J6VF5Jo="
              alt="college 1"
            />
            <p>Delhi</p>
          </div>
          <div className="featured-item">
            <img
              src="https://media.gettyimages.com/id/535277602/photo/david-sassoon-library-in-bombay-maharashtra.jpg?s=612x612&w=0&k=20&c=C2-qQ7Or_1YuqtAzZZSOUriG4NgZjuBPECYgcQSQiTI="
              alt="college 2"
            />
            <p>Mumbai</p>
          </div>
          <div className="featured-item">
            <img
              src="https://media.gettyimages.com/id/1288712635/photo/oblique-ground-level-view-of-dormitory-with-courtyard-thapar-university-patiala-india.jpg?s=612x612&w=0&k=20&c=Tj6700Zxv1EoJBB7r6A8OTzvDJ83tOMcblMwIxodUvw="
              alt="college 3"
            />
            <p>Bangalore</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
