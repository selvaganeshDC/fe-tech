import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import baseurl from "../ApiService/ApiService";
import "./AdminPanel.css";

const Transport = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredTransports, setFilteredTransport] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [transports, setTransports] = useState([]);
  const [viewTransport, setViewTransport] = useState(null);
  const [currentTransport, setCurrentTransport] = useState({
    travels_name: "",
    location: "",
    dirver_name: "",
    contact_person_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchTransport();
  }, []); // Removed currentTransport dependency

  const fetchTransport = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/transport`);
      // Ensure we have valid data before processing
      if (response.data && Array.isArray(response.data)) {
        const validTransports = response.data.filter(
          (transport) => transport && typeof transport === "object"
        );
        setTransports(validTransports);
      } else {
        console.error("Invalid response format:", response.data);
        setTransports([]);
      }
    } catch (error) {
      console.error("Error fetching transports:", error);
      setTransports([]);
    }
  };

  const fetchTransportDetails = async (tid) => {
    try {
      const response = await axios.get(`${baseurl}/api/transport/${tid}`);
      if (response.data && response.data) {
        setViewTransport(response.data);
        setIsViewModalOpen(true);
      } else {
        throw new Error("Transport details not found");
      }
    } catch (error) {
      console.error("Error fetching transport details:", error);
      alert("Failed to fetch transport details. Please try again later.");
    }
  };

  const handleViewTransport = async (transport) => {
    await fetchTransportDetails(transport.tid);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewTransport(null);
  };

  const itemsPerPage = 6;
  const indexOfLastTransport = currentPage * itemsPerPage;
  const indexOfFirstTransport = indexOfLastTransport - itemsPerPage;
  const currentTransports = transports.slice(
    indexOfFirstTransport,
    indexOfLastTransport
  );
  const totalPages = Math.ceil(transports.length / itemsPerPage);

  const handleSearch = () => {
    if (selectedCity) {
      setFilteredTransport(
        transports.filter((transport) => transport.location === selectedCity)
      );
    } else {
      setFilteredTransport(transports);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(
      pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber
    );
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      // Reset form when opening modal
      setCurrentTransport({
        travels_name: "",
        location: "",
        dirver_name: "",
        contact_person_name: "",
        phone: "",
        email: "",
      });
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert transportName to travels_name in the handler
    const fieldName = name === "transportName" ? "travels_name" : name;
    setCurrentTransport((prev) => ({ ...prev, [fieldName]: value }));
  };

  const validateForm = () => {
    if (
      !currentTransport.travels_name ||
      !currentTransport.location ||
      !currentTransport.dirver_name
    ) {
      alert("Please fill in all required fields!");
      return false;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(currentTransport.phone)) {
      alert("Please enter a valid 10-digit phone number!");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentTransport.email)) {
      alert("Please enter a valid email address!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (currentTransport.tid) {
        // Update existing transport
        const response = await axios.put(
          `${baseurl}/api/updatetransport/${currentTransport.tid}`,
          currentTransport
        );

        if (response.status === 200) {
          setTransports((prev) =>
            prev.map((transport) =>
              transport.tid === currentTransport.tid ? response.data : transport
            )
          );
          alert("Transport updated successfully!");
        }
      } else {
        // Add new transport
        const response = await axios.post(
          `${baseurl}/api/addtransport`,
          currentTransport
        );

        if (response.status === 200 || response.status === 201) {
          alert("Transport added successfully!");
          await fetchTransport(); // Refresh the list after successful addition
        } else {
          throw new Error("Failed to add transport");
        }
      }

      toggleModal();
    } catch (error) {
      console.error("Error adding/updating transport:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while saving the transport. Please try again later."
      );
    }
  };

  const handleEditTransport = (transport) => {
    setCurrentTransport({
      ...transport,
      phone: transport.phone || "",
      email: transport.email || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteTransport = async (transport) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transport?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${baseurl}/api/deletetransport/${transport.tid}`
        );

        if (response.status === 204) {
          await fetchTransport();
          alert("Transport deleted successfully!");
        } else {
          throw new Error("Failed to delete transport");
        }
      } catch (error) {
        console.error("Error deleting transport:", error);
        alert(
          error.response?.data?.message ||
            "An error occurred while deleting the transport. Please try again later."
        );
      }
    }
  };

  return (
    <>
      <div className="container mt-3 bg-white p-4 rounded shadow-sm">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3">
            <select
              className="form-select select-transport-city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="" disabled>
                Select a city
              </option>
              {currentTransports.map((transport, index) => (
                <option key={index} value={transport.location}>
                  {transport.location}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <button className="btn w-50 search-transport-button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="col-md-3 mb-3 text-md-end ">
            <button className="btn add-transport-btn " onClick={toggleModal}>
              <i className="bi bi-plus-circle"></i> Add Transport
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="container-fluid p-0 mt-5">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <div className="shadow-sm rounded bg-white">
                <table className="table table-striped table-hover mb-0 align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3 px-4">S.No</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Travel name</th>
                      <th className="py-3 px-4">Phone Number</th>
                      <th className="py-3 px-4">driver Number</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransports.length > 0 ? (
                      filteredTransports.map((transport, index) => (
                        <tr key={transport.tid || index}>
                          <td className="py-3 px-4">{index + 1 + indexOfFirstTransport}</td>
                          <td className="py-3 px-4">{transport.location || "N/A"}</td>
                          <td className="py-3 px-4">{transport.travels_name || "N/A"}</td>
                          <td className="py-3 px-4">{transport.phone || "N/A"}</td>
                          <td className="py-3 px-4">{transport.dirver_name || "N/A"}</td>
                          <td className="py-3 px-4">
                            <div className="d-flex gap-2">
                            <button
                              className="btn btn-link p-0"
                              onClick={() => handleViewTransport(transport)}
                            >
                              <Eye size={20} className="text-primary" />
                            </button>
                            <button
                              className="btn btn-link p-0"
                              onClick={() => handleEditTransport(transport)}
                            >
                              <PencilLine size={20} className="text-info" />
                            </button>
                            <button
                              className="btn btn-link p-0"
                              onClick={() => handleDeleteTransport(transport)}
                            >
                              <Trash2 size={20} className="text-danger" />
                            </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No transports found in this location
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Showing {currentTransports.length === 0 ? "0" : "1"} to{" "}
          {currentTransports.length} of {transports.length} entries
        </span>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {isViewModalOpen && viewTransport && (
        <div className="modal-overlay" onClick={closeViewModal}>
          <div className="modal-content transport-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header d-flex justify-content-between align-items-center mb-4">
              <h2>Transport Details</h2>
              <button onClick={closeViewModal} className="btn-close" aria-label="Close"></button>
            </div>
            <div className="transport-details">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="detail-group">
                    <label className="fw-bold">Transport Name:</label>
                    <p className="detail-value">{viewTransport.travels_name || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="detail-group">
                    <label className="fw-bold">Location:</label>
                    <p className="detail-value">{viewTransport.location || 'N/A'}</p>
                  </div>
                </div>
              </div>
  
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="detail-group">
                    <label className="fw-bold">Driver Name:</label>
                    <p className="detail-value">{viewTransport.dirver_name || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="detail-group">
                    <label className="fw-bold">Contact Person:</label>
                    <p className="detail-value">{viewTransport.contact_person_name || 'N/A'}</p>
                  </div>
                </div>
              </div>
  
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="detail-group">
                    <label className="fw-bold">Phone Number:</label>
                    <p className="detail-value">{viewTransport.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="detail-group">
                    <label className="fw-bold">Email:</label>
                    <p className="detail-value">{viewTransport.email || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
  <div className="modal-overlay" onClick={toggleModal}>
    <div className="modal-content mt-3 transport-modal" onClick={(e) => e.stopPropagation()}>
      {/* Close button */}
      <button
        className="close-button"
        onClick={toggleModal}
        aria-label="Close Modal"
      >
        &times;
      </button>
      
      <h2>{currentTransport.tid ? "Edit Transport" : "Add Transport"}</h2>
      <form onSubmit={handleSubmit} className="transport-registration-form">
        <div className="form-row">
          <div className="form-group">
            <label>Transport Name</label>
            <input
              type="text"
              name="transportName"
              value={currentTransport.travels_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={currentTransport.location}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label>Driver Name</label>
            <input
              type="text"
              name="dirver_name"
              value={currentTransport.dirver_name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row d-flex flex-column">
          <p>Who can we contact for this transport?</p>
          <div className="d-flex justify-content-around flex-row gap-3">
            <div className="form-group w-100">
              <label>Contact Person Name</label>
              <input
                type="text"
                name="contact_person_name"
                value={currentTransport.contact_person_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group w-100">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={currentTransport.phone}
                onChange={handleInputChange}
                required
                pattern="\d{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={currentTransport.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn-submit p-3 "
        style={{backgroundColor: '#F24E1E', border: 'none', color: 'white', borderRadius: '10px'}}
        >
          {currentTransport.tid ? "Update" : "Add Transport"}
        </button>
      </form>
    </div>
  </div>
)}
    </>
  );
};

export default Transport;
