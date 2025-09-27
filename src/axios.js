import axios from "axios";
const token = localStorage.getItem("token");

const axiosClient = await axios.create({
    baseURL: 'https://dhanush-backend.onrender.com',
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosClient;

// 