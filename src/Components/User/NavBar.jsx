import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import notify from "../User/Assets/notify.png";
import RIM from "../User/Assets/RimLogo.png";
import UserLogo from "../User/Assets/user-logo.png";
import hamburger from "../User/Assets/hamburger.png";
import ProfilePic from "../User/Assets/user-logo.png";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';
import { MdOutlineLogout, MdLogin, MdShoppingCart, MdAccountCircle, MdHistory, MdLogout } from "react-icons/md";
import { LuUserCircle } from "react-icons/lu";

const NavBar = () => {
  const [isToggleUserDropdown, setToggleUserDropdown] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    const userData = JSON.parse(localStorage.getItem("userData"));
    setLoggedUser(userData);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const notifications = [
    { id: 1, type: "order", title: "Order Received", message: "Order #123 has been received." },
    { id: 2, type: "complaint", title: "Complaint", message: "New complaint received." },
    { id: 3, type: "order", title: "Order Update", message: "Order #124 has been shipped." },
  ];

  const handleClickNotify = () => setShowNotifications(!showNotifications);

  const toggleUserDropdown = () => setToggleUserDropdown(!isToggleUserDropdown);

  const toggleMobileDropdown = () => setIsMobileDropdownOpen(!isMobileDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
    alert("Logout successfully");
  };

  const getIcon = (type) => {
    switch (type) {
      case "taken":
        return <i className="bi bi-box-seam text-primary"></i>;
      case "complete":
        return <i className="bi bi-exclamation-circle text-warning"></i>;
      default:
        return <i className="bi bi-info-circle text-secondary"></i>;
    }
  };

  return (
    <nav>
      {screenWidth > 768 ? (
        <div className="navbar py-2 container-fluid d-flex align-items-center">
          <div className="d-flex align-items-center">
            <a href="#" className="text-decoration-none">
              <i className="bi bi-geo-alt-fill text-danger"></i>{" "}
              <span style={{ color: "black" }}>Location</span>
            </a>
          </div>
          <div className="d-flex align-items-center">
            <img src={RIM} alt="RIM Logo" style={{ height: "50px" }} />
          </div>
          <div className="d-flex align-items-center gap-3 position-relative">
            <img
              src={notify}
              alt="Notifications"
              onClick={handleClickNotify}
              style={{ cursor: "pointer" }}
            />
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
                {!loggedUser ? (
                  <a className="dropdown-item" href="/Auth/Login">
                    <MdLogin className="me-2" />
                    Login
                  </a>
                ) : (
                  <>
                    {loggedUser.role === "technician" && (
                      <a className="dropdown-item" href="/User/ProfileInfo">
                        <LuUserCircle className="me-2" />
                        Profile
                      </a>
                    )}
                    {loggedUser.role === "distributor" && (
                      <>
                        <a className="dropdown-item" href="/User/OrderHistory">
                          <MdShoppingCart className="me-2" />
                          Orders
                        </a>
                        <a className="dropdown-item" href="/User/ProfileInfo">
                          <LuUserCircle className="me-2" />
                          Profile
                        </a>
                      </>
                    )}
                    <a className="dropdown-item text-danger" onClick={handleLogout}>
                      <MdOutlineLogout className="me-2" />
                      Logout
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Mobile Navigation Bar */}
          <div className="Mob-nav bg-white d-flex justify-content-between align-items-center px-3 py-2">
            {/* Hamburger Menu Button */}
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#userSidebar"
              aria-controls="userSidebar"
            >
              <img
                src={hamburger}
                alt="Menu"
                className="img-fluid"
                style={{ width: "24px", height: "24px" }}
              />
            </button>

            {/* Mobile Logo */}
            <img src={RIM} alt="RIM Logo" className="mobile-logo" />

            {/* Profile Picture */}
            <img
              src={ProfilePic}
              alt="Profile"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            />
          </div>

          {/* Offcanvas Sidebar */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="userSidebar"
            aria-labelledby="userSidebarLabel"
          >
            <div className="offcanvas-header">
              {/* Back Button */}
              <div className="p-3 d-flex align-items-center justify-content-between w-100">
                <div className='d-flex align-items-center justify-content-between' ><img src={ProfilePic} style={{ width: '50px', height: '50px', border: '50%' }} alt="logo" className="img-fluid" />
                  <span><h6 className='mb-0 ms-3'>{loggedUser?.username || 'Guest user'}</h6></span></div>
                <div>
                  <button
                    type="button"
                    className='btn text-white'
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ><span><i class="bi bi-chevron-left text-white"></i></span> Back</button></div>

              </div>
            </div>
            <div className="offcanvas-body ms-3">
              {/* Sidebar Content */}
              <div className="text-white small fw-bold mb-3">Menu</div>
              <ul className="list-unstyled mt-3">
                {/* Login Link (if no loggedUser) */}
                {!loggedUser ? (
                  <li className="py-2">
                    <a
                      href="/Auth/Login"
                      className="text-white text-decoration-none px-3 d-flex align-items-center"
                    >
                      <MdLogin className="me-2" /> {/* Login Icon */}
                      Login
                    </a>
                  </li>
                ) : (
                  <>
                    {/* Profile Link for Technicians */}
                    {loggedUser.role === "technician" && (
                      <li className="py-2">
                        <a
                          href="/User/ProfileInfo"
                          className="text-white text-decoration-none px-3 d-flex align-items-center"
                        >
                          <MdAccountCircle className="me-2" /> {/* Profile Icon */}
                          Profile
                        </a>
                      </li>
                    )}
                    {/* Order History and Profile Links for Distributors */}
                    {loggedUser.role === "distributor" && (
                      <>
                        <li className="py-2">
                          <a
                            href="/User/OrderHistory"
                            className="text-white text-decoration-none px-3 d-flex align-items-center"
                          >
                            <MdHistory className="me-2" /> {/* Orders Icon */}
                            Orders
                          </a>
                        </li>
                        <li className="py-2">
                          <a
                            href="/User/ProfileInfo"
                            className="text-white text-decoration-none px-3 d-flex align-items-center"
                          >
                            <MdAccountCircle className="me-2" /> {/* Profile Icon */}
                            Profile
                          </a>
                        </li>
                      </>
                    )}
                    {/* Logout Link */}
                    <li className="py-2">
                      <a
                        href="/"
                        className="text-white text-decoration-none px-3 d-flex align-items-center text-danger"
                        onClick={handleLogout}
                      >
                        <MdLogout className="me-2" /> {/* Logout Icon */}
                        Logout
                      </a>
                    </li>
                  </>
                )}
              </ul>

            </div>

          </div>
        </div>


      )}
      {showNotifications && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-start justify-content-end" style={{ zIndex: 2000 }}>
          {/* Semi-transparent background overlay */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            onClick={() => setShowNotifications(false)}
          ></div>

          {/* Notification panel */}
          <div className="position-relative bg-white mt-4 mx-3 rounded shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Notifications</h5>
                <button
                  className="btn btn-link border border-danger rounded-circle text-decoration-none p-0 text-danger"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="fs-5" />
                </button>
              </div>

              <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="d-flex align-items-start p-3 mb-2 border-bottom"
                  >
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-light me-3"
                      style={{ width: '40px', height: '40px' }}
                    >
                      {getIcon(notification.type)}
                    </div>

                    <div className="flex-grow-1">
                      <strong className="d-block mb-1">{notification.title}</strong>
                      <small className="text-muted">{notification.message}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;