import React, { useState, useEffect } from "react";
import compressor from "../User/Assets/compressor-img.png";
import baseurl from "../ApiService/ApiService";
import axios from "axios";

// FeedCard component
const FeedCard = ({ imagePath, productName, quantity, postedBy, location, closeDate }) => (
  <div
    className="FeedCard col-md-5 mb-4"
    style={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#f8f9fa",
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      padding: "16px",
      marginLeft: "auto", // Ensures consistent left spacing
      marginRight: "auto", // Centers the card when needed
      marginBottom: "16px", // Space between rows
    }}
  >
    <div className="image-container" style={{ marginRight: "16px" }}>
      <img
        src={imagePath}
        alt={productName}
        onError={(e) => {
          e.target.src = compressor; // Default image on error
        }}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          marginTop: "40px"
        }}
      />
    </div>
    <div className="content-container" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <p
        className="info-item"
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="label" style={{ fontWeight: "bold", marginRight: "5px" }}>
          Product Name:
        </span>
        <span className="value" style={{ textAlign: "right" }}>{productName}</span>
      </p>
      <p
        className="info-item"
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="label" style={{ fontWeight: "bold", marginRight: "5px" }}>
        Needed Quality:
        </span>
        <span className="value" style={{ textAlign: "right" }}>{quantity}</span>
      </p>
      <p
        className="info-item"
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="label" style={{ fontWeight: "bold", marginRight: "5px" }}>
        Post by:
        </span>
        <span className="value" style={{ textAlign: "right" }}>{postedBy}</span>
      </p>
      <p
        className="info-item"
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="label" style={{ fontWeight: "bold", marginRight: "5px" }}>
        Distributor Location:
        </span>
        <span className="value" style={{ textAlign: "right" }}>{location}</span>
      </p>
      <p
        className="info-item"
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="label" style={{ fontWeight: "bold", marginRight: "5px" }}>
        Close Date:
        </span>
        <span className="value" style={{ textAlign: "right" }}>{closeDate}</span>
      </p>
      <button
        className="take-button"
        style={{
          marginTop: "10px",
          width: "40%",
          alignSelf: "flex-end",
          backgroundColor: "#ff5722",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Take
      </button>
    </div>
  </div>
);

// Forum component
const Forum = () => {
  const [forums, setForums] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseurl + "/api/getAllProducts");
        setProducts(response.data || []); // Ensure fallback to empty array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to empty array in case of error
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    fetch("https://develop.rimhub.in/api/forums")
      .then((response) => response.json())
      .then((data) => {
        setForums(data.data || []); // Ensure fallback to empty array
      })
      .catch((error) => {
        console.error("Error fetching forums:", error);
      });
  }, []);

  const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const forumChunks = chunkArray(forums, 2); // Split forums into chunks of 2

  return (
    <div className="FeedCardContainer" style={{ padding: "16px" }}>
      {forums.length > 0 ? (
        <div className="container">
          {forumChunks.map((chunk, rowIndex) => (
            <div className="row" key={rowIndex} style={{ marginBottom: "16px" }}>
              {chunk.map((forum, columnIndex) => {
                const matchingProduct = products.find(
                  (product) => product.product_name === forum.product_name
                );
                const imagePath = matchingProduct
                  ? `${baseurl}/${matchingProduct.images[0]?.image_path || "default_image.png"}`
                  : "path_to_default_image.png";

                return (
                  <FeedCard
                    key={columnIndex}
                    imagePath={imagePath}
                    productName={matchingProduct?.product_name || forum.product_name || "Unknown"}
                    quantity={forum.quantity || "N/A"}
                    postedBy={forum.distributor_name || "Unknown"}
                    location={forum.location || "Not Provided"}
                    closeDate={forum.close_date || "No Date"}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <p>No forums available.</p>
      )}
    </div>
  );
};

export default Forum;
