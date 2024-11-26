import React from 'react'
import StoreImg from '../User/Assets/store-img.png'
import phone from '../User/Assets/phone.png'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar';
import UserSearch from './UserSearch';
import SearchBarLocation from './SearchBarLoction';

const StoreDetails = () => {
    const navigate = useNavigate();
  return (
    <>
    <NavBar/>
    <UserSearch/>
    <SearchBarLocation/>
     <div className="container mt-5">
      <div className="row g-4"> {/* Bootstrap grid with gutters */}
        {/* Each card will be placed in a column */}
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-3"> {/* Responsive column sizes */}
            <div className="card product-card h-100"> {/* Ensure consistent height */}
              <img src={StoreImg} className="card-img-top img-fluid rounded-3 p-3" alt="Outdoor Stand" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bolder">Smart Accessories</h5>
                <h6 className="card-text mt-1">AC Spare parts Wholesalers</h6>
                <h6 className="card-text mt-1">Gandhipuram Coimbatore</h6>
                <div className="text-center mt-auto">
                  <a href="#" className="btn w-100 fw-semibold view-mobile-no"
                  onClick={() => navigate("")}
                  >
                    <img src={phone} alt="" /> View Mobile Number
                  </a>
                </div>
                <div className="text-center mt-auto">
                  <a href="#" className="btn w-100 fw-semibold contact-supplier-btn"
                  onClick={() => navigate("")}
                  >
                    Contact Supplier
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default StoreDetails