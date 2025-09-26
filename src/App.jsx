import { useState ,useEffect, useContext,useRef } from 'react'
import { FiShoppingCart } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

import Category from './pages/category';
import CategoryForm from './adminpages/createCategory';
import ProductForm from './adminpages/createProduct';
import {Routes,Route,Navigate, useNavigate,useLocation} from "react-router";
import Signup from './pages/singUp';
import Login from './pages/login';

import HomePage from './pages/home';
import CartPage from './pages/cart';

import { Provider } from 'react-redux'
import { NavLink } from 'react-router';
import { store } from './redux/stores';
import UserProfileDropdown from './component/quickprofile';

import { checkAuth } from './redux/slice1';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logoutUser } from './redux/slice1';
import UsersPage from './adminpages/users';
import categoryContext from './redux/global';

import { FaSearch } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

import Homedata from './redux/homedata';

function App() {  

    const {user,isAuthenticated,loading,error} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  // Example: { name: "Aman", role: "admin" } or null
  console.log(user);
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);
 

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log("User logged out");
  };

 const navigate= useNavigate();
  const location = useLocation();

  // Hide back button on home page
  const showBackButton = location.pathname !== "/";

  //to fetch category name 
  const [categoryName,setCategoryName] = useState({});
  const [categories,setcategories] = useState([]);
  
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);

  //for scrolling 
    const [searchQuery, setSearchQuery] = useState("");

  
  

  return (
  
    <div >
         <div className="navbar bg-gradient-to-r from-purple-700 to-indigo-700 shadow-xl sticky top-0 z-50">
              <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-2xl font-extrabold text-white">
                  <span className="text-yellow-300">Dhanush</span>Shop
                </a>
              </div>
              {!showBackButton&&<div className="items-center ">
          <input
            type="text"
            placeholder="category..."
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase().trim())}
            className="input bg-transparent border-1 text-lg input-bordered rounded-full text-white"
          />
        </div>}
              <div className="navbar-end space-x-3">

                {showBackButton && <button
        onClick={() => navigate(-1)} // Go to previous page
        className=" text-2xl "
      >
        ⬅
      </button>}

                <NavLink to={"/cart"} className="btn btn-ghost btn-circle hover:bg-purple-600 transition-colors duration-300">
                  <FiShoppingCart className="h-6 w-6 text-white" />
                </NavLink>
                
                <div className="btn btn-ghost btn-circle hover:bg-purple-600 transition-colors duration-300">
                  {/* <FaUserCircle className="h-7 w-7 text-white" /> */}
                  {!user ? (
        // Show Sign Up if no user
        <NavLink
          to="/signup"
          className="text-xl"
        >
          Sign
        </NavLink>
      ) : (
        // Show user profile quick view
        <UserProfileDropdown
          user={user}
          onLogout={handleLogout}
          
        />
      )}
                </div>
                
              </div>
             
         </div>
         


     < categoryContext.Provider value={{categoryName,setCategoryName,categories,setcategories,selectedCategoryProducts, setSelectedCategoryProducts ,activeCategory, setActiveCategory}} >
     <Homedata></Homedata>
    <Routes >
        {/* <Route path='/' element={<Category></Category>}></Route> */}
        <Route path='/admin/category' element={user?.role=="admin"?<CategoryForm></CategoryForm>:<Navigate to={'/'} ></Navigate>} ></Route>
        <Route path='/admin/product' element={user?.role=="admin"?<ProductForm></ProductForm>:<Navigate to={'/'} ></Navigate>} ></Route>
        <Route path='/admin/allUsers' element={user?.role=="admin"?<UsersPage></UsersPage>:<Navigate to={'/'} ></Navigate>} ></Route>
        <Route path="/" element={<HomePage searchQuery={searchQuery} ></HomePage>}></Route>
        <Route path='/signup' element={<Signup></Signup>} ></Route>
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path="/cart"  element={<CartPage></CartPage>} ></Route>
    </Routes>
      </categoryContext.Provider>
           <footer className="footer footer-center p-6 bg-gradient-to-r from-purple-700 to-indigo-700 text-white
                       fixed bottom-0 left-0 w-full shadow-inner z-50">
        <p className="text-lg">© 2023 All rights reserved by <span className="font-extrabold text-yellow-300">DhanushShop</span></p>
        {/* <p className="text-sm mt-1"></p> */}
      </footer>

    </div>

   
    
    
  )
}

export default App



 
