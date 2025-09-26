import { useSelector } from "react-redux";
import categoryContext from "./global";
import { useContext } from "react";
import axiosClient from "../axios";
import { useEffect } from "react";

const Homedata =()=>{
 
const {setCategoryName,setcategories} = useContext(categoryContext);

   useEffect(()=>{
     const fetchCategoryData = async () => {

    

      try {
        const response = await axiosClient.get("/fetchdata/categoriesData");
       setCategoryName(response.data);
        setcategories(response.data);
        
      
      } catch (error) {
        console.log("Error fetching categories:", error);
        // Handle error, e.g., set an error state
      }
    };
    fetchCategoryData();
   },[])

    return<></>
}
export default Homedata ;