import React, { useState, useEffect } from "react";
import FeedViews from "../User/FeedViews";
import baseurl from "../ApiService/ApiService";
import axios from "axios";

const Forum = () => {
  // const [forums, setForums] = useState([]);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(baseurl + "/api/getAllProducts");
  //       setProducts(response.data || []);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setProducts([]);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/forums")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setForums(data.data || []);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching forums:", error);
  //     });
  // }, []);

  return (
    <></>
    // <div className="FeedCardContainer">
    //   {forums.length > 0 ? (
    //     <div className="container">
    //       {forums.map((forum, index) => {
    //         const matchingProduct = products.find(
    //           (product) => product.product_name === forum.product_name
    //         );
    //         const imagePath = matchingProduct
    //           ? `${baseurl}/${matchingProduct.images[0]?.image_path || "default_image.png"}`
    //           : "path_to_default_image.png";

    //         return (
    //           <div className="row justify-content-center" key={index}>
    //             <FeedViews
    //               imagePath={imagePath}
    //               productName={forum.product_name || "Unknown"}
    //               quantity={forum.quantity || "N/A"}
    //               postedBy={forum.distributor_name || "Unknown"}
    //               location={forum.location || "Not Provided"}
    //               closeDate={forum.close_date || "No Date"}
    //             />
    //           </div>
    //         );
    //       })}
    //     </div>
    //   ) : (
    //     <p>No forums available.</p>
    //   )}
    // </div>
  );
};

export default Forum;
