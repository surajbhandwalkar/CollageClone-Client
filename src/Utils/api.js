import axios from "axios";


// const API_BASE_URL="http://localhost:5402";
const API_BASE_URL = process.env.REACT_APP_SERVER_URL;


//fetch all collages
export const fetchCollages = async()=>{
    try{
        const response= await axios.get(`${API_BASE_URL}/collages`);
        return response.data;

    }catch(error){
        console.log("Error fetching Collages",error);
        return[];

    }
}
    //fetch collages Details
export const fetchCollagesDetails = async(id)=>{
    try{
        const response = await axios.get(`${API_BASE_URL}/collages/${id}`);
        return response.data.collages;
    }catch(error){
        console.log("Error fetchig collages",error);
        return null;
    }
};
//fetch collages by city
export const fetchCollagesByCity = async(city)=>{
    try{
        const response=await axios.get(`${API_BASE_URL}/getcollagesByCity/${city}`);
        return response.data;

    }catch(error){
        console.log("Error fetching collages in city",error);
        return [];
    }
}
//user signup
export const signupUser=async(userData)=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/signup`,userData);
        return response.data;
    }catch(error){
        console.log("Signup failed",error);
        return{error:"Signup failed"};
    }
};

//user login
export const loginUser=async(Credential)=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/login`);
        return response.data;
    }catch(error){
        console.log("Login failed",error);
        return{error:"login failed"};
    }
}