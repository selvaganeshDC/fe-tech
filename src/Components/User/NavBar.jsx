import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import RimLogo from "./Assets/RiM-Logo.png";
import RIM from "./Assets/RimLogo.png"
import UserLogo from "./Assets/user-logo.png";
import hamburger from "./Assets/hamburger.png";
import ProfilePic from "./Assets/user-logo.png";
import { useNavigate } from "react-router-dom";
import "./User.css";
import { TbNotes} from "react-icons/tb";
import { MdOutlineLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { LuUserCircle } from "react-icons/lu";


const NavBar = () => {
  const [isToggleUserDropdown, setToggleUserDropdown] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loggeduser, setloggerUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    const loggeduser = JSON.parse(localStorage.getItem('userData'));
    setloggerUser(loggeduser);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleUserDropdown = () => {
    setToggleUserDropdown(!isToggleUserDropdown);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
  };

  const handleOrderHistoryClick = () => {
    console.log("Order History clicked");
  };

  const handleDistributorsClick = () => {
    console.log("Distributors clicked");
  };

  const handleAddToCartClick = () => {
    console.log("Add to Cart clicked");
  };

  const handleLogout = ()=>{
    localStorage.removeItem("userData");
    alert('Logout successfully');
   }

  return (
    <nav>
      {screenWidth > 768 ? (
        <div className="navbar py-2 container-fluid d-flex align-items-center">
          {/* Left Section: Location */}
          <div className="d-flex align-items-center">
            <a href="" className="text-white text-decoration-none">
              <span>
                <i style={{ color: "red" }} class="bi bi-geo-alt-fill"></i>
              </span>{" "}
              <span style={{color: 'black'}}>Location</span>
            </a>
          </div>

          {/* Center Section: Logo */}
          <div className="d-flex align-items-center">
            <a href="/" ><img
              src={RIM} // Replace with your logo path
              alt="RIM Logo"
              style={{ height: "50px" }}
            /></a>
          </div>

          {/* Right Section: Profile Image */}
          <div className="d-flex align-items-center position-relative">
            <img
              src={UserLogo}
              alt="Profile"
              onClick={toggleUserDropdown}
              style={{
                height: "50px",
                width: "50px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            {isToggleUserDropdown && (
              <div
                className="dropdown-menu show position-absolute"
                style={{ top: "60px", right: "0" }}
              >
                {!loggeduser ? (
                <a className="dropdown-item" href="/Auth/Login">
                  <span className="pe-2"><MdLogin /></span>
                  <span className="text-center">Login</span>
                </a>
                ) : (
                  <>
                <a className="dropdown-item " href="/User/ProfileInfo">
                <span className="pe-2"><LuUserCircle /></span>
                  <span className="text-center">Profile</span>
                </a>
                <a className="dropdown-item" href="/User/OrderHistory">
                  <span className="pe-2"><TbNotes /></span>
                  <span className="text-center">Orders</span>
                </a>
                <a className="dropdown-item text-danger" href="" onClick={handleLogout}>
                  <span className="pe-2"><MdOutlineLogout />
                  </span>
                  <span className="text-center">Logout</span>
                </a>
                </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <nav>
          {/* Mobile Navbar */}
          <div className="Mob-nav bg-white d-flex justify-content-between align-items-center px-3 py-2"
          onClick={toggleMobileDropdown}
          >
            <button className="btn btn-link p-0" onClick={toggleMobileDropdown}>
              <img
                src={hamburger}
                alt="Hamburger Menu"
                style={{ width: "30px", height: "30px" }}
              />
            </button >
            <img  className="mobile-logo" src={RIM} alt="" />
            <img
              src={ProfilePic}
              alt="Profile"
              style={{ width: "30px", height: "30px" }}
            />
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileDropdownOpen && (
            <div
              className="position-fixed top-0 start-0 w-50 h-100 text-white z-3"
              style={{ backgroundColor: "#0024FF" }}
            >
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <button
                  className="btn btn-link text-white p-0 text-decoration-none"
                  onClick={toggleMobileDropdown}
                >
                  <span>
                    <i className="bi bi-arrow-left"></i>
                  </span>{" "}
                  <span>Back</span>
                </button>
              </div>
              <ul className="list-unstyled mt-3">
                <li className="border-bottom py-2">
                  <a
                    href="/Auth/Login"
                    className="text-white text-decoration-none px-3"
                    onClick={handleLoginClick}
                  >
                    Login
                  </a>
                </li>
                <li className="border-bottom py-2">
                  <a
                    href="/User/ProfileInfo"
                    className="text-white text-decoration-none px-3"
                  >
                    Profile
                  </a>
                </li>
                <li className="border-bottom py-2">
                  <a
                    href="/User/OrderHistory"
                    className="text-white text-decoration-none px-3"
                    onClick={handleOrderHistoryClick}
                  >
                    Order History
                  </a>
                </li>
                {/* <li className="border-bottom py-2">
                  <a
                    href="#"
                    className="text-white text-decoration-none px-3"
                    onClick={handleDistributorsClick}
                  >
                    Distributors
                  </a>
                </li>
                <li className="border-bottom py-2">
                  <a
                    href="#"
                    className="text-white text-decoration-none px-3"
                    onClick={handleAddToCartClick}
                  >
                    Add to Cart
                  </a>
                </li> */}
                <li className="py-2">
                  <a href="/" className="text-white text-decoration-none px-3"
                  onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
      )}
    </nav>
  );
};

export default NavBar;
