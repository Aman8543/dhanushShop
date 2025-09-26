


import { BsArrowRight } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import axiosClient from '../axios';
import { useState, useEffect ,useRef} from 'react';
import { addToCart } from '../redux/slice2';
import { useDispatch,useSelector } from 'react-redux';
import categoryContext from '../redux/global';
import { useContext } from 'react';
import App from '../App';
import homeDatacontext from '../redux/homedata';


function HomePage({ searchQuery }) {
  
  const {categoryName,setCategoryName,categories,setcategories,activeCategory, setActiveCategory,selectedCategoryProducts, setSelectedCategoryProducts} = useContext(categoryContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=>state.cart.cartItems);
  
  // const [selectedCategoryProducts, setSelectedCategoryProducts] = useState({});
  // const [activeCategory, setActiveCategory] = useState(null);

  // const [categories, Setcategories] = useState([]);
  

  // State for Product Details Modal
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity in the detail view

  // useEffect(() =>{ 
  //   const fetchCategoryData = async () => {
  //     try {
  //       const response = await axiosClient.get("/fetchdata/categoriesData");
       
  //       Setcategories(response.data); 
  //       setCategoryName(response.data);
  //     } catch (error) {
  //       console.log("Error fetching categories:", error);
  //       // Handle error, e.g., set an error state
  //     }
  //   };
   
  //   fetchCategoryData();
  // }, []);

  //for search bar

  

   
  const containerRef = useRef(null);

  const categoryRefs = useRef({});

  // useEffect(() => {
  //   if (searchQuery && categoryRefs.current[searchQuery]) {
  //     categoryRefs.current[searchQuery].scrollIntoView({
  //       behavior: "smooth",
  //       inline: "center",
  //       block: "nearest",
  //     });
  //   }
  // }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      // ✅ find first category whose name contains the substring
      const foundCategory = categories.find(cat =>
        cat.name.toLowerCase().includes(searchQuery)
      );

      if (foundCategory) {
        const ref = categoryRefs.current[foundCategory.name.toLowerCase()];
        if (ref) {
          ref.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }
    }
  }, [searchQuery]); // only depend on searchQuery

 
  
  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
        <p className="ml-3 text-xl">Loading categories...</p>
      </div>
    );
  }



  const handleCategoryClick = (category) => {
    setSelectedCategoryProducts(category.products);
    setActiveCategory(category._id);
  };

  // Handlers for Product Details Modal
  const handleProductCardClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
    setQuantity(1); // Reset quantity when a new product is selected
  };

  const handleCloseDetails = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1)); // Don't go below 1
  };

  const handleAddToCartFromDetails = () => {
    
    
    
    if (selectedProduct) {
      dispatch(addToCart({
                    name: selectedProduct.name,
                    basePrice: selectedProduct.basePrice,
                    image: selectedProduct.image,
                    description: selectedProduct.description
                  }))
     
      handleCloseDetails(); // Close the details after adding to cart
    }
  };

  


  

  

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans mb-20">
      {/* Navbar */}
      {/* <div className="navbar bg-gradient-to-r from-purple-700 to-indigo-700 shadow-xl sticky top-0 z-50">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-3xl font-extrabold text-white">
            <span className="text-yellow-300">Dhanush</span>Shop
          </a>
        </div>
        <div className="navbar-end space-x-3">
          <button className="btn btn-ghost btn-circle hover:bg-purple-600 transition-colors duration-300">
            <FiShoppingCart className="h-6 w-6 text-white" />
          </button>
          
          <button className="btn btn-ghost btn-circle hover:bg-purple-600 transition-colors duration-300">
            <FaUserCircle className="h-7 w-7 text-white" />
          </button>
          
        </div>
       
      </div> */}

      
      <main className="container mx-auto px-4 py-8 pb-20">
        {/* Featured Section */}
        <section className="relative my-8 h-80 rounded-lg overflow-hidden shadow-lg transform hover:scale-102 transition-transform duration-500 ease-in-out">
          <img
            src="./abc.png"
            alt="Featured Products"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-3 text-white">Discover Amazing Deals!</h1>
              <p className="text-lg text-gray-200 mb-6">
                Explore our curated collection of top-rated products and exclusive offers.
              </p>
              <button className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-semibold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                Shop Now <BsArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Selected Category Products Section */}
        {selectedCategoryProducts.length > 0 && (
          // <section className="my-10 animate-fade-in-up">
          //   <h2 className="text-3xl font-bold text-white mb-6">
          //     Products in <span className="text-yellow-300">
          //       {categories.find(cat => cat._id === activeCategory)?.name}
          //     </span>
          //   </h2>
          //   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          //     {selectedCategoryProducts.map((product) => (
          //       <div
          //         key={product._id}
          //         className="card card-compact bg-gray-800 shadow-xl rounded-lg overflow-hidden
          //                    transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out
          //                    border border-transparent hover:border-purple-500 cursor-pointer" // Added cursor-pointer
          //         onClick={() => handleProductCardClick(product)} // Click handler for quick view
          //       >
          //         <figure className="relative h-40 overflow-hidden">
          //           <img
          //             src={product.image}
          //             alt={product.name}
          //             className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          //           />
          //           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          //         </figure>
          //         <div className="card-body p-4">
          //           <h3 className="card-title text-lg text-white mb-1 leading-tight">{product.name}</h3>
          //           <p className="text-purple-400 font-extrabold text-xl">{product.basePrice}</p>
          //           <div className="card-actions justify-end mt-3">
          //             {/* This button will be handled by the quick view for now */}
          //             <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none rounded-full px-4 py-1
          //                                transform hover:scale-105 transition-transform duration-300 shadow-md"
          //                                onClick={(e) =>{
                                          
                                          
          //                                 dispatch(addToCart({
          //                                   name:product.name,
          //                                   basePrice:product.basePrice,
          //                                   image:product.image,
          //                                   description:product.description
          //                                 }))
          //                                 e.stopPropagation()

          //                                }} // Prevent card click when button is clicked
          //             >
          //               Add to Cart
          //             </button>
          //           </div>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          // </section>

         <section className="my-10 animate-fade-in-up">
  <h2 className="text-3xl font-bold text-white mb-6">
    Products in{" "}
    <span className="text-yellow-300">
      {categories.find(cat => cat._id === activeCategory)?.name}
    </span>
  </h2>

  <div className="overflow-x-auto">
    <div className="grid grid-flow-col auto-cols-[180px] grid-rows-2 gap-6 pb-4">
      {selectedCategoryProducts.map((product) => (
        <div
          key={product._id}
          className="card card-compact bg-gray-800 shadow-xl rounded-lg overflow-hidden
                     transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out
                     border border-transparent hover:border-purple-500 cursor-pointer"
          onClick={() => handleProductCardClick(product)}
        >
          <figure className="relative h-35 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </figure>
          <div className="card-body p-4">
            <h3 className="card-title text-xl text-white mb-1 leading-tight">{product.name}</h3>
            <p className="text-purple-400 font-extrabold text-xl">{product.basePrice}  <span className='text-lg text-white ' >₹/pack</span></p>
            <div className="card-actions justify-end mt-3">
              <button
                className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none rounded-full px-4 py-1
                           transform hover:scale-105 transition-transform duration-300 shadow-md"
                onClick={(e) => {
                  dispatch(addToCart({
                    name: product.name,
                    basePrice: product.basePrice,
                    image: product.image,
                    description: product.description
                  }));
                  e.stopPropagation();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



        )}

        {/* Category Section */}
       

        
   {/* <section className="my-10">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-white">Shop by Category</h2>
    <button className="btn btn-link text-yellow-300 hover:text-yellow-400 flex items-center
                        transform hover:translate-x-1 transition-transform duration-300">
      See All <BsArrowRight className="ml-2" />
    </button>
  </div>

  
  <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
    {categories.map((category) => (
      <div
        key={category._id}
        className={`min-w-[320px] card card-compact bg-gray-800 shadow-xl rounded-lg overflow-hidden cursor-pointer
                    transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out
                    ${activeCategory === category._id ? 'border-4 border-yellow-400' : 'border-4 border-transparent'}`}
        onClick={() => handleCategoryClick(category)}
      >
        <figure className="relative h-48 overflow-hidden">
          <img
            src={category.img}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </figure>
        <div className="card-body p-4 absolute bottom-0 left-0 w-full">
          <h3 className="card-title text-xl text-white">{category.name}</h3>
          <p className="text-gray-300 text-lg">{category.description}</p>
          <div className="card-actions justify-end mt-3">
            <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none rounded-full px-4 py-1
                               transform hover:scale-105 transition-transform duration-300 shadow-md">
              Explore
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>2 */}

<section className="my-10">
      <h2 className="text-3xl font-bold text-white mb-6">Shop by Category</h2>

      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <div
            key={category._id}
            ref={(el) => (categoryRefs.current[category.name.toLowerCase()] = el)
            }
            className="min-w-[320px] card card-compact bg-gray-800 shadow-xl rounded-lg overflow-hidden"
            onClick={() => handleCategoryClick(category)}
          >
            <figure className="relative h-48 overflow-hidden">
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </figure>
            <div className="card-body p-4 absolute bottom-0 left-0 w-full">
              <h3 className="card-title text-xl text-white">{category.name}</h3>
              <p className="text-gray-300 text-lg">{category.description}</p>
              <div className="card-actions justify-end mt-3">
            <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none rounded-full px-4 py-1
                               transform hover:scale-105 transition-transform duration-300 shadow-md">
              Explore
            </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>


        {/* Related Products Section (only if no category is selected) */}
        {selectedCategoryProducts.length === 0 && categories.length > 0 && ( // Ensure categories are loaded
          <section className="my-10 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="flex overflow-x-auto gap-6 py-2 pb-4 scrollbar-hide">
              {/* Using products from the first category as an example for "Related Products" */}
              {categories[0].products.map((product) => (
                <div
                  key={product._id}
                  className="card card-compact w-52 bg-gray-800 shadow-xl rounded-lg overflow-hidden flex-shrink-0
                             transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out
                             border border-transparent hover:border-purple-500 cursor-pointer" // Added cursor-pointer
                  onClick={() => handleProductCardClick(product)} // Click handler for quick view
                >
                  <figure className="relative h-36 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </figure>
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg text-white mb-1 leading-tight">{product.name}</h3>
                    <p className="text-purple-400 font-extrabold text-xl">{product.basePrice}</p>
                    <div className="card-actions justify-end mt-3">
                      <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none rounded-full px-4 py-1
                                         transform hover:scale-105 transition-transform duration-300 shadow-md"
                                         onClick={(e) => e.stopPropagation()} // Prevent card click when button is clicked
                      >
                        Add to Cart                
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    
      {/* Product Details Modal/Block - Placed outside main to ensure it overlays everything */}
      {showProductDetails && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 animate-fade-in"> {/* Increased z-index, added fade-in */}
          <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-6 w-full max-w-lg relative
                          transform scale-100 transition-transform duration-300 ease-out animate-slide-up"> {/* Added slide-up */}
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 flex-shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-2 text-purple-400">{selectedProduct.name}</h2>
                <p className="text-xl text-gray-300 mb-4">
                  Price: <span className="font-extrabold text-white">{selectedProduct.basePrice}</span>
                </p>
                {/* Assuming your product object has a 'description' field. If not, add one to your product data. */}
                <p className="text-gray-400 text-sm mb-6">{selectedProduct.description || "No detailed description available for this product."}</p>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg font-semibold">Quantity:</span>
                  <div className="flex items-center border border-gray-600 rounded-md">
                    {/* <button
                      onClick={handleDecreaseQuantity}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-l-md text-xl"
                    >
                      -
                    </button> */}
                    <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
                    {/* <button
                      onClick={handleIncreaseQuantity}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-r-md text-xl"
                    >
                      +
                    </button> */}
                  </div>
                </div>

                <button
                  onClick={handleAddToCartFromDetails}
                  className="w-full btn bg-purple-600 hover:bg-purple-700 text-white border-none rounded-lg px-6 py-3 text-lg
                             transform hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  Add {quantity} to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {/* <footer className="footer footer-center p-6 bg-gradient-to-r from-purple-700 to-indigo-700 text-white
                       fixed bottom-0 left-0 w-full shadow-inner z-50">
        <p className="text-lg">© 2023 All rights reserved by <span className="font-extrabold text-yellow-300">EcomShop</span></p>
        <p className="text-sm mt-1">Made with ❤️ for modern shopping experiences</p>
      </footer> */}
    </div>
  );
}

export default HomePage;