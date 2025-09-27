import axios from "axios";

const axiosClient = await axios.create({
    baseURL: 'https://dhanush-backend.onrender.com',
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosClient;

