import axiosClient from "../axios";
import { useEffect,useState } from "react";



const Category =()=>{

    const [Data,setData]= useState({});

    useEffect(()=>{

        const fetchData = async()=>{
            try{
                const response = await axiosClient.get("/fetchdata/categoriesData");
                setData(response.data);
                
            }
            catch(err){
                console.log("data is not found"+err);
            }
            
        }
         fetchData();
        

    },[]);

    console.log(Data);


    return(<>

    <div>hello</div>

    </>)
}

export default Category;