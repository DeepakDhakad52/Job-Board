import React, { useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const [hamburger, setHamburger] = useState(false);

  const isAuthCan = Cookies.get("isAuthCan");
  const isAuthEmp = Cookies.get("isAuthEmp");

  const navigate = useNavigate();

  const LogoutFuncMobileCan = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      Cookies.remove("EmployeeToken");
      Cookies.remove("userData");
      Cookies.remove("isAuthCan");
      Cookies.remove("isAuthEmp");
      navigate("/registerandlogin");
      window.location.reload();
    }
  };
  const LogoutFuncMobileEmp = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      Cookies.remove("EmployeeToken");
      Cookies.remove("userData");
      Cookies.remove("isAuthCan");
      Cookies.remove("isAuthEmp");
      navigate("/registerandlogin");
      window.location.reload();
    }
  };

  const toggleHamburger = () => {
    setHamburger(!hamburger);
  };

  const closeHamburgerFunc = () => {
    setHamburger(false);
  };

  return (
    <div className="Navbar">
      <div className="Navbar_normal">
        <div className="Nav_logo_con">
          <Link to="/">CODSOFT</Link>
        </div>
        <div className="Nav_right_items">
          <Link to="/joblistings">Jobs</Link>

          {isAuthEmp == "true" ? (
            <Link to="/employeejobpost">Post Jobs</Link>
          ) : (
            ""
          )}
          {isAuthCan == "true" ? (
            <Link to="/jobapplications">Job Applications</Link>
          ) : (
            ""
          )}
          {isAuthEmp == "true" ? <Link to="/employee">Emp Dashboard</Link> : ""}
          {isAuthCan == "true" ? (
            <Link to="/candidate">Can Dashboard</Link>
          ) : (
            ""
          )}
          {isAuthCan == "true" || isAuthEmp == "true" ? (
            ""
          ) : (
            <Link to="/registerandlogin">Register & Login</Link>
          )}
        </div>
      </div>
      <div className="Navbar_mobile">
        <div className="mobile_nav_container">
          <div>
            <Link to="/">CODSOFT</Link>
          </div>
          <div>
            <button onClick={toggleHamburger}>
              {hamburger ? (
                <RxCrossCircled size="25px" />
              ) : (
                <GiHamburgerMenu size="25px" />
              )}
            </button>
          </div>
        </div>
        <div className={`mobile_nav_items ${hamburger ? "show" : "hide"}`}>
          <Link onClick={closeHamburgerFunc} to="/joblistings">
            Jobs
          </Link>

          {isAuthEmp === "true" ? (
            <Link onClick={closeHamburgerFunc} to="/employeejobpost">
              Post Jobs
            </Link>
          ) : (
            ""
          )}
          {isAuthCan === "true" ? (
            <Link onClick={closeHamburgerFunc} to="/jobapplications">
              Job Applications
            </Link>
          ) : (
            ""
          )}
          {isAuthEmp === "true" ? (
            <Link onClick={closeHamburgerFunc} to="/employee">
              Dashboard Emp
            </Link>
          ) : (
            ""
          )}
          {isAuthCan === "true" ? (
            <Link onClick={closeHamburgerFunc} to="/candidate">
              Dashboard Can
            </Link>
          ) : (
            ""
          )}

          {isAuthCan === "true" || isAuthEmp === "true" ? (
            ""
          ) : (
            <Link
              onClick={closeHamburgerFunc}
              style={{ border: "unset" }}
              to="/registerandlogin"
            >
              Register & Login
            </Link>
          )}

          {isAuthCan == "true" ? (
            <Link onClick={LogoutFuncMobileCan}>Logout</Link>
          ) : (
            ""
          )}
          {isAuthEmp == "true" ? (
            <Link onClick={LogoutFuncMobileEmp}>Logout</Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
