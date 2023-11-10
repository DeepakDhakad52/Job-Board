import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./JobDetail.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlineSave } from "react-icons/ai";

import { GoLocation, GoNote } from "react-icons/go";

import { FaRupeeSign, FaToolbox } from "react-icons/fa";

export default function JobDetail() {
  const [jobData, setJobData] = useState({});

  const [whatLookingInColleague, setWhatLookingInColleague] = useState([""]);
  const [skills, setSkills] = useState([""]);
  const [jobDescription, setJobDescription] = useState([""]);
  const [aboutCompany, setAboutCompany] = useState([""]);
  const [isAuthCan, setIsAuthCan] = useState(false);
  console.log({ isAuthCan });

  const token = Cookies.get("CandidateToken") || Cookies.get("EmployeeToken");

  const isAuthCandidate = Cookies.get("isAuthCan");

  const userData = JSON.parse(Cookies.get("userData"));
  console.log({ userData });
  const { id } = useParams();

  function customFormatDistanceToNow(date) {
    const now = new Date();
    const diffInMilliseconds = now - date;
    const secondsAgo = Math.floor(diffInMilliseconds / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo >= 30) {
      const monthsAgo = Math.floor(daysAgo / 30);
      return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
    } else if (daysAgo >= 1) {
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    } else if (hoursAgo >= 1) {
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    } else if (minutesAgo >= 1) {
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    } else {
      return `${secondsAgo} second${secondsAgo === 1 ? "" : "s"} ago`;
    }
  }

  useEffect(() => {
    GetData();
    setIsAuthCan(isAuthCandidate);
  }, []);

  const GetData = async () => {
    try {
      await fetch(`https://bright-worm-fedora.cyclic.app/jobs/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setJobData(res);
          setWhatLookingInColleague(res.what_looking_in_collegue);
          setSkills(res.skills);
          setJobDescription(res.jobDescription);
          setAboutCompany(res.aboutCompany);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const JobApplyFunc = async () => {
    if (isAuthCan == "true") {
      const obj = {
        status: false,
        candidateName: userData.name,
        jobData: jobData,
      };
      console.log(obj);
      try {
        await fetch(
          `https://bright-worm-fedora.cyclic.app/jobapplications/apply`,
          {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-type": "application/json",
              Authorization: token,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            toast.success(res.msg);
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Only candidates can apply!");
    }
  };

  return (
    <div className="job_details_main_container">
      <div key={jobData._id} className="job_cards">
        <div className="job_card_first_container">
          <div>
            <h3>{jobData.jobTitle}</h3>
            <p>{jobData.companyName}</p>
          </div>
          <div>
            <img src={jobData.CompanyLogo} alt="" />
          </div>
        </div>
        <div className="job_card_second_container">
          <div>
            <FaToolbox /> <p>{jobData.experience} year</p>
          </div>
          <div>
            <FaRupeeSign /> <p>{jobData.salary} lakh per anual</p>
          </div>

          <div>
            <GoLocation /> <p>{jobData.location}</p>
          </div>
        </div>

        <div className="job_card_third_container">
          <GoNote size={30} className="third_container_sticker" />
          <p>{}</p>
          <p>
            {`${whatLookingInColleague[1]}.
                        ${whatLookingInColleague[2]} & ${whatLookingInColleague[3]}`}
          </p>
        </div>

        <div className="job_card_container_four">
          {skills.map((skill, index) => (
            <React.Fragment key={index}>
              <p>{skill}</p>
              {index !== skills.length - 1 && <p>•</p>}
            </React.Fragment>
          ))}
        </div>

        <div className="job_card_container_five">
          <div>
            {" "}
            {customFormatDistanceToNow(new Date(jobData.JobPostDate), {
              addSuffix: true,
            })}
          </div>

          <button className="Apply_button_jobs" onClick={JobApplyFunc}>
            Apply
          </button>

          <div>
            <AiOutlineSave size={25} />
            <p>Save</p>
          </div>
        </div>
      </div>
      <div className="JobDetail_container">
        <div className="Jobdetail_header">
          <h3>Job description</h3>
        </div>
        <div className="Jobdetail_descriptions">
          {
            // jobData.jobDescription
            jobDescription.map((ele, ind) => (
              <div className="Jobdetail_descriptions_inner_div" key={ind}>
                <b>○</b>
                <p>{ele}</p>
              </div>
            ))
          }
        </div>
        <div className="Jobdetail_header">
          <h3>Required Skills</h3>
        </div>
        <div className="Jobdetail_descriptions">
          {
            // jobData.jobDescription
            whatLookingInColleague.map((ele, ind) => (
              <div className="Jobdetail_descriptions_inner_div" key={ind}>
                <b>○</b>
                <p>{ele}</p>
              </div>
            ))
          }
        </div>
        <div className="Jobdetail_roll_and_other_details">
          <div className="Jobdetail_roll_flex_div">
            <b>Role :</b>
            <p>{jobData.role}</p>
          </div>
          <div className="Jobdetail_roll_flex_div">
            <b>Industry Type :</b>
            <p>{jobData.industryType}</p>
          </div>
          <div className="Jobdetail_roll_flex_div">
            <b>Department :</b>
            <p>{jobData.department}</p>
          </div>
          <div className="Jobdetail_roll_flex_div">
            <b>Employment Type :</b>
            <p>{jobData.employmentType}</p>
          </div>
          <div className="Jobdetail_roll_flex_div">
            <b>Role Category :</b>
            <p>{jobData.employmentType}</p>
          </div>
        </div>
        <div className="Jobdetails_educations">
          <div className="Jobdetail_header">
            <h3>Educations</h3>
          </div>

          <div className="Jobdetail_roll_flex_div">
            <p>{jobData.educations}</p>
          </div>
        </div>
        <div className="Jobdetail_header_keyskills">
          <h3>Key Skills</h3>
        </div>
        <div className="Jobdetail_key_skills_div">
          {skills.map((ele, ind) => (
            <div key={ind}>{ele}</div>
          ))}
        </div>
        <hr className="line_jobdetails" />
        <div className="jobdetails_social_media_div">
          <a href="">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/016/716/481/small/facebook-icon-free-png.png"
              alt=""
            />
          </a>
          <a href="">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXP0NPJipBfozB_rrJK8v0RDzk9Z3pphKZoJL_-I8OAQ&s"
              alt=""
            />
          </a>
          <a href="">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png?20140125013055"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="jobDetails_about_company">
        <div className="jobdetail_header_img">
          <h3>About company</h3>
          <img src={jobData.CompanyLogo} alt="" />
        </div>
        <div className="jobdetail_paragraph">
          {aboutCompany.map((ele, ind) => (
            <p key={ind}>{ele}</p>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
