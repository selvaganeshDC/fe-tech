import React from 'react';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import OutdoorStand from './Assets/ac-outdoor-stand.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../ApiService/ApiService';

const Card = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const LoggedUser = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/getAllProducts`);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (LoggedUser) {
      try {
        const response = await axios.post(`${baseurl}/api/addtocart`, {
          product_id: product.product_id,
          user_id: LoggedUser.uid,
          quantity: 1,
        });

        alert('Product added to cart successfully!');
        navigate('/User/Cart'); // Navigate to Cart page
      } catch (error) {
        console.error('Error adding product to cart:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Failed to add product to cart.');
      }
    } else {
      alert('Please login to add products to cart.');
      navigate('/Auth/Login'); // Redirect to Login page
    }
  };

  return (
    <div className="container mt-5 mb-3">
      <div className="row g-4"> 
        {products.length > 0?(
          products.map((product) => (
          <div key={product.pid} className="col-6 col-sm-6 col-md-4 col-lg-3"> {/* Responsive column sizes */}
            <div className="card product-card h-100"> {/* Ensure consistent height */}
              <img src={`${baseurl}/${product.images[0]?.image_path || 'default.jpg'}`} className="card-img-top img-fluid rounded-3 p-3"
               alt={product.product_name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.product_name}</h5>
                <span></span>
                <h5 className="card-text mt-3">Rs-{product.mrp_rate}</h5>
                <small className="mb-3">{product.brand_name}</small>
                <div className="text-center mt-auto">
                  <a href="#" className="btn w-100 add-to-card-button"
                  onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Card;
