import axiosClient from '../axios';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import categoryContext from '../redux/global';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [productCreated, setProductCreated] = useState(false); // New state

  const {categoryName,setCategoryName} = useContext(categoryContext);
  
  console.log(categoryName);
  useEffect(() => {
    const fetchCategories = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCategories(categoryName);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('category', selectedCategory);
      formData.append('description', description);
      formData.append('basePrice', basePrice);
      if (image) {
        formData.append('image', image);
      }

      const response = await axiosClient.post("/product/createProduct", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message and change state
      setSubmitSuccess(true);
      setProductCreated(true);

      // Optionally reset form fields but keep state to show the button
      resetFormFields();

    } catch (error) {
      console.log('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormFields = () => {
    setProductName('');
    setSelectedCategory('');
    setDescription('');
    setBasePrice('');
    setImage(null);
    setImagePreview(null);
  };

  const handleCreateNew = () => {
    setProductCreated(false);
    setSubmitSuccess(false);
    resetFormFields();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (productCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center ">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Created Successfully!</h2>
          <button
            className="btn btn-primary"
            onClick={handleCreateNew}
          >
            Create New Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center mb-30 justify-center">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl rounded-xl overflow-hidden">
        <div className="card-body p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary ">Create New Product</h2>
            <p className="text-gray-600 mt-2">Fill in the details below to add a new product to your catalog</p>
          </div>

          {submitSuccess && (
            <div className="alert alert-success mb-6 shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Product created successfully!</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form content remains unchanged */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Product Name</span></label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered input-primary w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Category</span></label>
                <select
                  className="select select-bordered select-primary w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Description</span></label>
              <textarea
                className="textarea textarea-bordered textarea-primary h-24 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your product in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Base Price (₹)</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input input-bordered input-primary w-full pl-7 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Product Image</span></label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <label className="btn btn-outline btn-primary cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        required
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {image && <span className="text-sm text-gray-600 truncate">{image.name}</span>}
                </div>
              </div>
            </div>

            {imagePreview && (
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Image Preview</span></label>
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-40 w-40 object-cover rounded-lg border-2 border-dashed border-gray-300"
                  />
                </div>
              </div>
            )}

            <div className="form-control mt-8 flex flex-row justify-end space-x-4">
              <button
                type="button"
                onClick={resetFormFields}
                className="btn btn-outline btn-secondary px-8"
                disabled={isSubmitting}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
