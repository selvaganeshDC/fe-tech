import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import compressor from '../User/Assets/compressor-img.png'

const EnterpriseAi = () => {
  return (
    <div className="container-fluid p-4">
      {/* Stats Cards Row */}
      <div className="row mb-4">
        {[
          {
            title: 'Total User',
            value: '40,689',
            percentage: '8.5% Up from yesterday',
            icon: 'bi-people',
            iconClass: 'text-primary',
            bgClass: 'bg-primary bg-opacity-10',
          },
          {
            title: 'Total Order',
            value: '10,293',
            percentage: '1.3% Up from past week',
            icon: 'bi-box',
            iconClass: 'text-warning',
            bgClass: 'bg-warning bg-opacity-10',
          },
          {
            title: 'Total Sales',
            value: 'Rs 89,000',
            percentage: '4.3% Down from yesterday',
            icon: 'bi-graph-up',
            iconClass: 'text-success',
            bgClass: 'bg-success bg-opacity-10',
          },
          {
            title: 'Total Pending',
            value: '2,040',
            percentage: '1.8% Up from yesterday',
            icon: 'bi-clock',
            iconClass: 'text-danger',
            bgClass: 'bg-danger bg-opacity-10',
          },
        ].map((card, idx) => (
          <div className="col-md-3 mb-2" key={idx}>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="mb-0">{card.value}</h3>
                    <p className="text-muted mb-0">{card.title}</p>
                    <small className={`text-${card.iconClass.split('-')[1]}`}>
                      <i className={`bi bi-arrow-${card.percentage.includes('Up') ? 'up' : 'down'}`}></i> {card.percentage}
                    </small>
                  </div>
                  <div className={`${card.bgClass} p-3 rounded`}>
                    <i className={`bi ${card.icon} ${card.iconClass} fs-4`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Forum Section */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Forum</h5>
          <button className="btn btn-danger w-25">Post</button>
        </div>

        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <img
                      src={compressor}
                      alt="Compressor"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="mb-2">
                      <strong>Product Name:</strong> Emerson Refrigerator Compressor New
                    </div>
                    <div className="mb-2">
                      <strong>Needed Quality:</strong> 2 Quality
                    </div>
                    <div className="mb-2">
                      <strong>Post by:</strong> Tools Mart
                    </div>
                    <div className="mb-2">
                      <strong>Close Date:</strong> 24-Sep-2024
                    </div>
                    <button className="btn btn-primary w-25">Take</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary and Charts Row */}
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="list-group">
                <div className="list-group-item bg-light">Received (20)</div>
                <div className="list-group-item bg-warning bg-opacity-10">Shipping (39)</div>
                <div className="list-group-item bg-danger bg-opacity-10">Complaint (1)</div>
                <div className="list-group-item bg-danger bg-opacity-10">Canceled (4)</div>
                <div className="list-group-item bg-success bg-opacity-10">Done (2034)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Average sales</h5>
                <select className="form-select w-auto">
                  <option>Month</option>
                </select>
              </div>
              <h3>Rs-975,993</h3>
              <div className="bg-primary rounded-circle mx-auto" style={{ width: '150px', height: '150px' }}></div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Average visitor</h5>
                <select className="form-select w-auto">
                  <option>Weekly</option>
                </select>
              </div>
              <h3>560,395</h3>
              <div className="d-flex justify-content-between align-items-end" style={{ height: '150px' }}>
                {['Mon', 'Tue', 'Wed', 'Thu'].map((day, idx) => (
                  <div key={idx} className="d-flex flex-column align-items-center">
                    <div
                      className="bg-primary"
                      style={{ width: '20px', height: `${Math.random() * 100 + 20}px` }}
                    ></div>
                    <small className="mt-2">{day}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAi;
