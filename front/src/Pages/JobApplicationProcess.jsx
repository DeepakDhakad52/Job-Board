import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./JobApplicationProcess.css";
import { useNavigate } from "react-router-dom";

export default function JobApplicationProcess() {
  const [jobStatus, setJobStatus] = useState([]);

  const token = Cookies.get("CandidateToken") || Cookies.get("EmployeeToken");

  const userData = JSON.parse(Cookies.get("userData"));

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://bright-worm-fedora.cyclic.app/jobapplications/application/${userData._id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setJobStatus(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const VieDetailFunc = (id) => {
    navigate(`/jobdetail/${id}`);
  };
  return (
    <div className="Job_application_page_main_container">
      <h2>Job Application Status</h2>
      {jobStatus.length > 0 ? (
        <div className="job_application_con">
          <div className="Header_table_of_status">
            <p>Company Name</p>
            <p>Job Title</p>
            <p>View Details</p>
            <p>Status</p>
          </div>
          {jobStatus.map((item, index) => (
            <div key={index} className="Itme_box_status">
              <p> {item.jobData.companyName}</p>
              <p>{item.jobData.jobTitle}</p>
              <p>
                <button onClick={() => VieDetailFunc(item.jobData._id)}>
                  View Details
                </button>
              </p>
              <p className={item.status ? "status_green" : "status_red"}>
                {" "}
                {item.status ? "Success" : "Pending"}{" "}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
