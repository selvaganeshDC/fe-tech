import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Shipments = () => {
  const chartData = [
    { month: "Jan", orders: 20 },
    { month: "Feb", orders: 25 },
    { month: "Mar", orders: 30 },
    { month: "Apr", orders: 22 },
    { month: "May", orders: 28 },
    { month: "Jun", orders: 18 },
    { month: "Jul", orders: 24 },
    { month: "Aug", orders: 35 },
    { month: "Sep", orders: 30 },
    { month: "Oct", orders: 27 },
    { month: "Nov", orders: 22 },
    { month: "Dec", orders: 26 },
  ];

  const maxOrders = Math.max(...chartData.map((data) => data.orders));

  const shipments = [
    {
      id: 1,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
    {
      id: 2,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
    {
      id: 3,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
    {
      id: 4,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
  ];

  return (
    <div className="container py-4">
      {/* Shipment Analysis Section */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Shipment Analysis</h5>
              <div className="d-flex align-items-end justify-content-between mt-4">
                {chartData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`bg-primary ${
                        data.orders === maxOrders ? "bg-opacity-75" : "bg-opacity-50"
                      }`}
                      style={{
                        width: "30px",
                        height: `${data.orders * 3}px`,
                        marginBottom: "5px",
                        borderRadius: "4px",
                      }}
                    ></div>
                    <small className="d-block">{data.month}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Statistics</h6>
              <div className="row gy-2 mt-3">
                <div className="col-12">
                  <div className="p-3 bg-light rounded shadow-sm">
                    <h6 className="mb-1">Total Delivery</h6>
                    <h4 className="fw-bold">40,689</h4>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-light rounded shadow-sm">
                    <h6 className="mb-1">On Delivery</h6>
                    <h4 className="fw-bold">10,293</h4>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-light rounded shadow-sm">
                    <h6 className="mb-1">Total Pending</h6>
                    <h4 className="fw-bold">2,040</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment List Section */}
      <div className="card mt-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Shipping List</h5>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Shipping list"
          />
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Organization Name</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.product}</td>
                    <td className="py-3 px-4">{item.org}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.destination}</td>
                    <td className="py-3 px-4">
                      <button className="btn btn-success btn-sm">Shipment</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipments;
