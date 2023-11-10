import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import RegisterLogin from "../RegisterAndLogin/RegisterLogin";
import JobDetail from "../Pages/JobDetail";
import JobListings from "../Pages/JobListings";
import JobApplicationProcess from "../Pages/JobApplicationProcess";
import CandidateDashboard from "../Pages/CandidateDashboard";
import EmployeeDashboard from "../Pages/EmployeeDashboard";
import EmployeePostJobs from "../Pages/EmployeePostJobs";
import PrivateRouteEmp from "./PrivateEmp";
import PrivateRouteCan from "./PrivateRouteCan";

export default function Allroutes() {
  const isAuth = localStorage.getItem("isAuth");
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/registerandlogin" element={<RegisterLogin />}></Route>
      <Route path="/joblistings" element={<JobListings />}></Route>
      <Route path="/jobdetail/:id" element={<JobDetail />}></Route>
      <Route
        path="/jobapplications"
        element={
          <PrivateRouteCan>
            <JobApplicationProcess />
          </PrivateRouteCan>
        }
      ></Route>
      <Route
        path="/candidate"
        element={
          <PrivateRouteCan>
            <CandidateDashboard />
          </PrivateRouteCan>
        }
      ></Route>
      <Route
        path="/employee"
        element={
          <PrivateRouteEmp>
            <EmployeeDashboard />
          </PrivateRouteEmp>
        }
      ></Route>
      <Route
        path="/employeejobpost"
        element={
          <PrivateRouteEmp>
            <EmployeePostJobs />
          </PrivateRouteEmp>
        }
      ></Route>
    </Routes>
  );
}
