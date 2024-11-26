import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import "./AdminPanel.css";
import {
  Box,
  Upload,
  Eye,
  PencilLine,
  Trash2,
  X,
  SearchIcon,
} from "lucide-react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import baseurl from "../ApiService/ApiService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Distributors = () => {
  const navigate = useNavigate();
  const [distributors, setDistributors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDistributor, setCurrentDistributor] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/getAllDistributors`);
      setDistributors(response.data || []);
    } catch (error) {
      console.error("Error fetching distributors:", error);
      setDistributors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();

      // Add all distributor fields
      const distributorData = {
        companyname: currentDistributor?.companyname || "",
        location: currentDistributor?.location || "",
        gstnumber: currentDistributor?.gstnumber || "",
        creditlimit: currentDistributor?.creditlimit || "",
        contact_person_name: currentDistributor?.contact_person_name || "",
        phoneno: currentDistributor?.phoneno || "",
        email: currentDistributor?.email || "",
      };

      // Add distributor data as a JSON string
      Object.entries(distributorData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Handle images
      if (currentDistributor?.did) {
        // Update case
        formData.append("did", currentDistributor.did);

        // Add existing images as JSON string
        if (existingImages.length > 0) {
          formData.append("existingImages", JSON.stringify(existingImages));
        }
      }

      // Add new images
      imageFiles.forEach((file, index) => {
        formData.append("image", file);
      });

      const url = currentDistributor?.did
        ? `${baseurl}/api/updateDistributorById/${currentDistributor.did}`
        : `${baseurl}/api/addDistributor`;

      const response = await axios({
        method: currentDistributor?.did ? "put" : "post",
        url,
        data: formData,
      });

      alert(response.data.message);
      fetchDistributors();
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response?.data?.message || "Failed to save distributor");
    }
  };

  const resetForm = () => {
    setCurrentDistributor(null);
    setImageFiles([]);
    setExistingImages([]);
    setError("");
  };

  const handleViewDetails = (distributor) => {
    navigate(`DistributorsViewDetails/${distributor.did}`);
  };

  const handleEditDistributor = (distributor) => {
    setCurrentDistributor(distributor);
    setExistingImages(
      distributor.image?.map((img, index) => ({
        id: index,
        image_path: img.image_path,
      })) || []
    );
    setIsModalOpen(true);
    setError("");
  };

  const handleDeleteDistributor = async (distributor) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this distributor?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `${baseurl}/api/deleteDistributorById/${distributor.did}`
        );
        alert("Distributor deleted successfully");
        fetchDistributors();
      } catch (error) {
        console.error("Error deleting distributor:", error);
        alert("Failed to delete distributor");
      }
    }
  };

  const handleDeleteImage = async (imageIndex) => {
    setExistingImages(
      existingImages.filter((_, index) => index !== imageIndex)
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
    setError("");
  };

  const removeNewImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDistributor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      resetForm();
    }
  };

  // Pagination calculations
  const indexOfLastDistributor = currentPage * itemsPerPage;
  const indexOfFirstDistributor = indexOfLastDistributor - itemsPerPage;
  const currentDistributors = distributors.slice(
    indexOfFirstDistributor,
    indexOfLastDistributor
  );
  const totalPages = Math.ceil(distributors.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid py-4">
      {/* Search and Add Section */}
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
            onClick={toggleModal}
          >
            <i className="bi bi-plus-circle me-2"></i> Add Distributor
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            All Distributors
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Archive
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            New Distributors
          </a>
        </li>
      </ul>

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
                      <th className="py-3 px-4">Organization Name</th>
                      <th className="py-3 px-4">Contact Person</th>
                      <th className="py-3 px-4">Contact Number</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDistributors?.map((distributor, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4">{indexOfFirstDistributor + index + 1}</td>
                        <td className="py-3 px-4">{distributor.companyname}</td>
                        <td className="py-3 px-4">{distributor.contact_person_name}</td>
                        <td className="py-3 px-4">{distributor.phoneno || "-"}</td>
                        <td className="py-3 px-4">
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-link p-0"
                              onClick={() => handleViewDetails(distributor)}
                            >
                              <Eye className="text-primary" size={20} />
                            </button>
                            <button
                              className="btn btn-link p-0"
                              onClick={() => handleEditDistributor(distributor)}
                            >
                              <PencilLine className="text-info" size={20} />
                            </button>
                            <button
                              className="btn btn-link p-0"
                              onClick={() =>
                                handleDeleteDistributor(distributor)
                              }
                            >
                              <Trash2 className="text-danger" size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="distributorpagination container d-flex mt-2 justify-content-between">
        <div className="results-count text-center mb-3">
          Showing{" "}
          {currentDistributors.length === 0 ? "0" : indexOfFirstDistributor + 1}{" "}
          to {Math.min(indexOfLastDistributor, distributors.length)} of{" "}
          {distributors.length} entries
        </div>
        <Pagination className="justify-content-center" style={{ gap: "10px" }}>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdChevronLeft />
          </Pagination.Prev>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content distributor-form">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentDistributor?.did
                    ? "Edit Distributor"
                    : "Distributor Registration"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyname"
                        placeholder="Enter company name"
                        onChange={handleInputChange}
                        value={currentDistributor?.companyname || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        placeholder="Enter location"
                        onChange={handleInputChange}
                        value={currentDistributor?.location || ""}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">GST Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gstnumber"
                        placeholder="Enter GST number"
                        onChange={handleInputChange}
                        value={currentDistributor?.gstnumber || ""}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Credit Limit</label>
                      <input
                        type="text"
                        className="form-control"
                        name="creditlimit"
                        placeholder="Enter credit limit"
                        onChange={handleInputChange}
                        value={currentDistributor?.creditlimit || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Contact Person Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contact_person_name"
                        placeholder="Enter contact person's name"
                        onChange={handleInputChange}
                        value={currentDistributor?.contact_person_name || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phoneno"
                        placeholder="Enter phone number"
                        onChange={handleInputChange}
                        value={currentDistributor?.phoneno || ""}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                        value={currentDistributor?.email || ""}
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div className="col-12">
                      <label className="form-label">Images</label>
                      <div className="d-flex gap-3 flex-wrap">
                        {/* Existing Images */}
                        {existingImages.map((image, index) => (
                          <div
                            key={`existing-${index}`}
                            className="position-relative"
                          >
                            <img
                              src={`${baseurl}/${image.image_path}`}
                              alt={`Existing ${index}`}
                              className="rounded"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute top-0 end-0"
                              onClick={() => handleDeleteImage(index)}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}

                        {/* New Images */}
                        {imageFiles.map((file, index) => (
                          <div
                            key={`new-${index}`}
                            className="position-relative"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`New ${index}`}
                              className="rounded"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute top-0 end-0"
                              onClick={() => removeNewImage(index)}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}

                        {/* Upload Button */}
                        <label
                          className="d-flex align-items-center justify-content-center border rounded"
                          style={{
                            width: "100px",
                            height: "100px",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="d-none"
                          />
                          <Upload size={24} className="text-muted" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-danger px-4">
                      {currentDistributor?.did ? "Update" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {isModalOpen && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default Distributors;
