import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Collages from "./pages/Collages";
import CollagesDetails from "./pages/CollagesDetails";
import CollagesByCity from "./pages/CollagesByCity";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Results from "./pages/result";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/collages" element={<Collages />} />
          <Route path="/collages/:id" element={<CollagesDetails />} />
          <Route path="/getcollagesByCity/:city" element={<CollagesByCity />} />

           <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/collages/city/:city" element={<Results />} />
          <Route path="/collages/category/:category" element={<Results />} />
          
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
  
};

export default App;
