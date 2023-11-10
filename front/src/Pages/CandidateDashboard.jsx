import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function CandidateDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(Cookies.get("userData"));

  const LogoutFunc = () => {
    Cookies.remove("EmployeeToken");
    Cookies.remove("userData");
    Cookies.remove("isAuthCan");
    Cookies.remove("isAuthEmp");
    Cookies.remove("CandidateToken");

    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <div className="Profile_container_dashboard">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1uO9yM0Gp_F2e2oAGZT5dBwsG8yf-WhG-KWYAJVEgsTSx0VAJHUmEv7pO8u9Y8CsXZNM&usqp=CAU"
            alt=""
          />
        </div>
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.mobile}</p>
          <p>Role : {user.role}</p>
          <button onClick={LogoutFunc}>Logout</button>
        </div>
      </div>
    </div>
  );
}
