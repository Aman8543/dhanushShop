

import React, { useState } from 'react';
import axiosClient from '../axios';

const CategoryForm = () => {
 
  const token = localStorage.getItem("token");

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [debugMode, setDebugMode] = useState(false);
  const [mockSuccess, setMockSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If mock success is enabled, simulate a successful response
    if (mockSuccess) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitStatus('success');
        setCategoryName('');
        setDescription('');
        setImage(null);
        setImagePreview(null);
        setIsSubmitting(false);
        console.log('Mock successful submission');
      }, 1500);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorDetails(null);

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('description', description);
    if (image) {
      formData.append('img', image);
    }

    // Log form data for debugging
    // console.log('FormData contents:');
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : value}`);
    // }

    try {
      const response = await axiosClient.post("/category/createCategory", formData, {
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setSubmitStatus('success');
      // Reset form on successful submission
      setCategoryName('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
      
      
    } catch (error) {
      setSubmitStatus('error');
      console.error("Error submitting category:", error);
      
      // Store error details for debugging
      if (error.response) {
        setErrorDetails({
          status: error.response.status,
          statusText: error.response.statusText,
          data: typeof error.response.data === 'string' ? 
                error.response.data.substring(0, 200) + '...' : 
                error.response.data
        });
      } else {
        setErrorDetails({
          message: error.message
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitStatus('error');
        setErrorDetails({
          message: 'Please select an image file (JPEG, PNG, etc.)'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus('error');
        setErrorDetails({
          message: 'Image must be less than 5MB'
        });
        return;
      }
      
      setImage(file);
      setSubmitStatus(null);
      setErrorDetails(null);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleRetry = () => {
    setSubmitStatus(null);
    setErrorDetails(null);
  };

  return (
    <div className="min-h-screen bg-base-200 flex mb-30 items-center justify-center p-4 -mt-12 ">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-2">
            <h2 className="card-title text-2xl text-primary font-bold">Create New Category</h2>
           
          </div>
          
          {debugMode && (
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-sm" 
                    checked={mockSuccess}
                    onChange={() => setMockSuccess(!mockSuccess)}
                  />
                  <span className="label-text">Mock successful submission (for testing UI)</span>
                </label>
              </div>
              <div className="mt-2 text-xs">
                <p>Backend issue: ReferenceError: img is not defined at createCotagory</p>
                <p>Check your backend code in createCategory.js at line 23</p>
              </div>
            </div>
          )}
          
          <p className="text-sm text-gray-500 mb-6">Add a new product category to your inventory</p>
          
          {submitStatus === 'error' && (
            <div className="alert alert-error mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span>Error creating category. {errorDetails?.message || 'Please check your backend implementation.'}</span>
                  {errorDetails?.message && (
                    <button className="btn btn-xs btn-ghost ml-2" onClick={handleRetry}>Retry</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {debugMode && errorDetails && !errorDetails.message && (
            <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-auto max-h-60">
              <h3 className="font-bold text-sm mb-2">Error Details (Backend Issue):</h3>
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(errorDetails, null, 2)}
              </pre>
              <p className="text-xs mt-2 text-error">
                The error indicates a problem in your backend code. Check createCategory.js at line 23 where 'img' is referenced but not defined.
              </p>
            </div>
          )}

          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Category Created Successfully!</h3>
              <p className="text-gray-500 mb-6">Your new category has been added to the system.</p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => setSubmitStatus(null)}
              >
                Create Another Category
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Brushes, Dhoop, Mosquito Killer"
                  className="input input-bordered w-full"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Tell us about this category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Category Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category Image</span>
                </label>
                
                {imagePreview ? (
                  <div className="mb-4 relative">
                    <div className="w-full h-48 rounded-lg overflow-hidden border">
                      <img 
                        src={imagePreview} 
                        alt="Category preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="btn btn-sm btn-circle btn-error absolute top-2 right-2"
                      disabled={isSubmitting}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                    disabled={isSubmitting}
                  />
                )}
                <label className="label">
                  <span className="label-text-alt">Supported formats: JPEG, PNG, GIF. Max size: 5MB</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Category...' : 'Create Category'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;