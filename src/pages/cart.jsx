
import React from 'react';

import { addToCart } from '../redux/slice2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slice2';
const CartPage = () => {

  const dispatch = useDispatch();


  // Example array of cart items
  const cartItems = useSelector((state)=>state.cart.cartItems);
  console.log(cartItems);
//   const cartItems = [
//     {
//       id: 1,
//       name: 'Stylish Headphones',
//       image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Headphones',
//       basePrice: 99.99,
//       description: 'Experience immersive audio with these comfortable and stylish headphones.',
//     },
//     {
//       id: 2,
//       name: 'Vintage Camera',
//       image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Camera',
//       basePrice: 249.00,
//       description: 'Capture timeless moments with this classic vintage camera.',
//     },
//     {
//       id: 3,
//       name: 'Smartwatch Pro',
//       image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Smartwatch',
//       basePrice: 199.50,
//       description: 'Stay connected and track your fitness goals with the Smartwatch Pro.',
//     },
//   ];

  const numberOfItemsInCart = cartItems.length;
  const subtotal = cartItems.reduce((acc, item) => acc + item.basePrice, 0).toFixed(2);

  return (
    <div className="container mx-auto mb-25 p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-left text-primary ">Items Cart</h1>

      {numberOfItemsInCart === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Your cart is empty. Start shopping now!</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Items ({numberOfItemsInCart})</h2>
              {/* You might add a "Clear Cart" button here */}
            </div>
            <div className="space-y-4">
              {cartItems.map((item,index) => (
                <div key={index} className="card card-side bg-base-100 shadow-xl border border-base-200">
                  <figure>
                    <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-l-box" />
                  </figure>
                  <div className="card-body p-4">
                    <h3 className="card-title text-xl">{item.name}</h3>
                    <p className="text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-lg text-secondary">₹{item.basePrice.toFixed(2)}</span>
                      <div className="flex items-center space-x-2">
                        {/* <button className="btn btn-sm btn-ghost">-</button> */}
                        {/* <span className="text-lg font-medium">1</span> Placeholder for quantity */}
                        {/* <button className="btn btn-sm btn-ghost">+</button> */}
                        <button className="btn btn-sm btn-error" onClick={(e)=>{
                          dispatch(removeFromCart(index))

                        }} >Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-4">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal ({numberOfItemsInCart} items)</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping Estimate</span>
                  <span className="font-semibold">₹5.00</span> {/* Example shipping */}
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                  <span>Total</span>
                  <span>₹{(parseFloat(subtotal) + 5.00).toFixed(2)}</span>
                </div>
                <div className="card-actions justify-end mt-6">
                  <button className="btn btn-primary btn-block">Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;