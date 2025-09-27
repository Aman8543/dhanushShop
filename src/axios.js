import axios from "axios";

const axiosClient = await axios.create({
    baseURL: "http://localhost:2500",
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosClient;

// 'https://dhanush-backend.onrender.com'