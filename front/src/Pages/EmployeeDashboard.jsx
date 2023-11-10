import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./EmployeeDashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EmployeeDashboard() {
  const [data, setData] = useState([]);
  const token = Cookies.get("CandidateToken") || Cookies.get("EmployeeToken");

  console.log({ data });

  const navigate = useNavigate();

  const LogoutFunc = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      Cookies.remove("EmployeeToken");
      Cookies.remove("userData");
      Cookies.remove("isAuthCan");
      Cookies.remove("isAuthEmp");
      navigate("/");
      window.location.reload();
    }
  };

  const user = JSON.parse(Cookies.get("userData"));
  const id = user._id;
  console.log({ user });

  const getData = async () => {
    try {
      const response = await fetch(
        `https://bright-worm-fedora.cyclic.app/jobapplications/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const res = await response.json();
        setData(res);
      } else {
        console.log("Error fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const jubStatusFunc = async (id) => {
    try {
      await fetch(
        `https://bright-worm-fedora.cyclic.app/jobapplications/update/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: true }),
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          alert(res.message);
          getData();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Employe_dashboard_main_container">
      <div className="Profile_container_dashboard">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1uO9yM0Gp_F2e2oAGZT5dBwsG8yf-WhG-KWYAJVEgsTSx0VAJHUmEv7pO8u9Y8CsXZNM&usqp=CAU"
            alt=""
          />
        </div>
        <div style={{ textAlignLast: "left", lineHeight: "0.7cm" }}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.mobile}</p>
          <p>Role : {user.role}</p>
          <button onClick={LogoutFunc}>Logout</button>
        </div>
      </div>

      <h1>Candidates apply</h1>
      <div className="employe_container">
        <div className="Employ_table_header">
          <p>Candidate Name</p>
          <p>Job Role</p>
          <p>Status</p>
        </div>
        {data.map((ele) => (
          <div key={ele._id} className="employe_table_data">
            <p>{ele.candidateName}</p>
            <p> {ele.jobData.jobTitle}</p>
            <p>
              <button
                onClick={() => jubStatusFunc(ele._id)}
                disabled={ele.status == true}
                className={
                  ele.status
                    ? "employe_status_btn"
                    : "employe_status_btn_pending"
                }
              >
                {ele.status ? "Approved" : "pending"}
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
