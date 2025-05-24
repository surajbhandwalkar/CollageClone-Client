import React,{useState,useContext} from "react";
import { AuthContext } from "../Context/AuthContext";
import { signupUser } from '../Utils/api';
import{Link} from "react-router-dom";

const Signup =()=>{
    const {login}= useContext(AuthContext);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");

const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");

    try{
        const userData = await signupUser(name,email,password);
        login(userData);

    }catch(err){
        setError(err);

    }
};
return(
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>


)

}
export default Signup;