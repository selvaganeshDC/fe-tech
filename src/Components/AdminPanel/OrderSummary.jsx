import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import baseurl from '../ApiService/ApiService';

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/orders`);
        setOrders(response.data.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleOrderItems = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container mt-4">
      {/* Search Box */}
      <div className="searches row align-items-center gx-3 mt-3 mb-3">
        {/* Search Input */}
        <div className="col-12 col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Product"
              id="productSearchBox"
            />
          </div>
        </div>

        {/* Add Product Button */}
        <div className="col-12 col-md-4 mt-3 mt-md-0">
          <button
            id="addProductBtn"
            className="btn p-3 d-flex align-items-center justify-content-center"
          >
            <i className="bi bi-plus-circle me-2"></i> Add Product
          </button>
        </div>
      </div>

      {/* Order Tabs */}
      <div className="mb-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#!">
              All Orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Received
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Shipping
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Complaint
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Canceled
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Done
            </a>
          </li>
        </ul>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Order Date</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <React.Fragment key={order.oid}>
                  <tr onClick={() => toggleOrderItems(order.oid)}>
                    <td className="py-3 px-4">{index + 1 + indexOfFirstOrder}</td>
                    <td className="py-3 px-4">{order.order_id}</td>
                    <td className="py-3 px-4">{order.username}</td>
                    <td className="py-3 px-4">{order.order_date}</td>
                    <td className="py-3 px-4">{order.total_amount}</td>
                    <td className="py-3 px-4">{order.status}</td>
                  </tr>
                  {expandedOrderId === order.oid && (
                    <tr>
                      <td colSpan="6">
                        <div className="d-flex flex-wrap gap-3 p-3">
                          {order.OrderItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="card"
                              style={{ width: '150px' }}
                            >
                              <img
                                src={`${baseurl}/${item.Product.images[0].image_path}`}
                                className="card-img-top"
                                alt={item.Product.product_name}
                              />
                              <div className="card-body">
                                <h6 className="card-title">
                                  {item.Product.product_name}
                                </h6>
                                <p className="card-text">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="card-text">
                                  Price: {item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Showing {currentOrders.length} of {orders.length} entries
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
  );
};

export default OrderSummary;
