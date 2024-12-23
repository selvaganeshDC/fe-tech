import React, { useState, useEffect } from "react";
import axios from "axios"; 
import baseurl from "../ApiService/ApiService";
import { Pagination } from 'react-bootstrap';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
  Box,
  Search,
  Package,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import ShipmentDetails from "./ShipmentsDetails";

const Shipments = () => {
  const [showShipmentDetails, setShowShipmentDetails] = useState(false);
  const [selectedOrderOid, setSelectedOrderOid] = useState(null);
  const [shipments, setShipments] = useState([]); 
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderStats, setOrderStats] = useState({
    onDelivery: 0,
    totalPending: 0
  });
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch shipments data
    const fetchShipments = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/getAllShipments`);
        if (response.data && response.data.data) {
          setShipments(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching shipments:", error);
      }
    };

    // Fetch orders data
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/orders`);
        if (response.data && response.data.data) {
          const ordersData = response.data.data;
          setOrders(ordersData);
          
          // Calculate totals
          const stats = ordersData.reduce((acc, order) => {
            if (order.status === 'Shipping') {
              acc.onDelivery += 1;
            } else if (order.status === 'Received') {
              acc.totalPending += 1;
            }
            return acc;
          }, { onDelivery: 0, totalPending: 0 });
          
          setOrderStats(stats);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchShipments();
    fetchOrders();

    const pendingShipmentOid = localStorage.getItem("pendingShipmentOid");
    if (pendingShipmentOid) {
      setSelectedOrderOid(pendingShipmentOid);
      setShowShipmentDetails(true);
      localStorage.removeItem("pendingShipmentOid");
    }
  }, []);

  const handleShipmentClose = () => {
    setShowShipmentDetails(false);
    setSelectedOrderOid(null);
  };

  // Enhanced filter function
  const filteredShipments = shipments.filter(shipment =>
    shipment.shipment_items.some(item => 
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination calculations
  const indexOfLastShipment = currentPage * itemsPerPage;
  const indexOfFirstShipment = indexOfLastShipment - itemsPerPage;
  const currentShipments = filteredShipments.slice(indexOfFirstShipment, indexOfLastShipment);
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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

  const statusStyles = {
    'Shipment': {
      color: '#267309',
      background: '#E7F7E1',
      borderRadius: '10px',
      padding: '6px 12px',
      display: 'inline-block'
    },
    'Delivered': {
      color: '#267309',
      background: '#E7F7E1',
      borderRadius: '10px',
      padding: '6px 12px',
      display: 'inline-block'
    },
    'Canceled': {
      color: '#808080',
      background: '#E5E7E5',
      borderRadius: '10px',
      padding: '6px 12px',
      display: 'inline-block'
    },
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                <div className="bg-primary bg-opacity-10 p-2 rounded">
                  <Box className="text-primary" size={20} />
                </div>
                <h5 className="mb-0">Shipment Analysis</h5>
                <span className="badge bg-primary px-3 py-2 rounded-pill">
                  Group 35
                </span>
              </div>

              <div className="chart-container position-relative" style={{ height: "300px" }}>
                <div className="d-flex align-items-end justify-content-between h-100 overflow-x-auto pb-4">
                  {chartData.map((data, index) => (
                    <div key={index} className="text-center mx-1" style={{ minWidth: "30px" }}>
                      <div
                        className={`${
                          data.month === "Aug"
                            ? "bg-primary"
                            : "bg-primary bg-opacity-10"
                        }`}
                        style={{
                          height: `${(data.orders / 35) * 200}px`,
                          borderRadius: "4px",
                        }}
                      ></div>
                      <small className="d-block mt-2 text-muted">
                        {data.month}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex flex-column gap-3">
                <div className="p-3 rounded" style={{ backgroundColor: "#F5F9FF" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <Users size={20} className="text-primary opacity-75" />
                      <span className="text-secondary">Total Delivery</span>
                    </div>
                    <h3 className="mb-0 fw-bold">10</h3>
                  </div>
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <TrendingUp size={16} className="text-success" />
                    <span className="text-success" style={{ fontSize: "0.875rem" }}>
                      Total Delivery
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: "#FFFAF0" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <Package size={20} className="text-warning opacity-75" />
                      <span className="text-secondary">On Delivery</span>
                    </div>
                    <h3 className="mb-0 fw-bold">{orderStats.onDelivery}</h3>
                  </div>
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <TrendingUp size={16} className="text-success" />
                    <span className="text-success" style={{ fontSize: "0.875rem" }}>
                    Active shipping orders
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: "#FFF5F5" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <Clock size={20} className="text-danger opacity-75" />
                      <span className="text-secondary">Total Pending</span>
                    </div>
                    <h3 className="mb-0 fw-bold">{orderStats.totalPending}</h3>
                  </div>
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <TrendingUp size={16} className="text-success" />
                    <span className="text-success" style={{ fontSize: "0.875rem" }}>
                      Orders pending shipment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-primary bg-opacity-10 p-2 rounded">
                    <Package className="text-primary" size={20} />
                  </div>
                  <h6 className="mb-0">All Shipments</h6>
                </div>
                <div className="d-flex gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <Search size={18} />
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search Shipments"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Name</th>
                      <th>Dispatch date</th>
                      <th>Destination</th>
                      <th>Shipment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentShipments.length > 0 ? (
                      currentShipments.map((shipment) => (
                        <tr key={shipment.id}>
                          <td className="py-3 px-4">{shipment.sid}</td>
                          <td className="py-3 px-4">{shipment.shipment_items.map(item => item.product_name).join(', ')}</td>
                          <td className="py-3 px-4">{shipment.distributor_name}</td>
                          <td className="py-3 px-4">{shipment.dispatch_date}</td>
                          <td className="py-3 px-4">{shipment.dispatch_address}</td>
                          <td className="py-2 px-3">
                            <span style={statusStyles[shipment.status] || {}}>
                              {shipment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No shipments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span>
                  Showing {currentShipments.length} of {filteredShipments.length} entries
                </span>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <MdChevronLeft />
                  </Pagination.Prev>
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <MdChevronRight />
                  </Pagination.Next>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showShipmentDetails && (
        <ShipmentDetails
          shipmentOid={selectedOrderOid}
          onClose={handleShipmentClose}
        />
      )}
    </div>
  );
};

export default Shipments;