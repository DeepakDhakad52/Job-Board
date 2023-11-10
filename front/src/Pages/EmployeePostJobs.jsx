import React, { useEffect, useState } from "react";
import "./EmployeePostJobs.css";
import Cookies from "js-cookie";

import { AiOutlineSave } from "react-icons/ai";

import { GoLocation, GoNote } from "react-icons/go";

import { FaRupeeSign, FaToolbox } from "react-icons/fa";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export default function EmployeePostJobs() {
  const [formContainer, setFormContainer] = useState(false);

  const [jobsData, setJobData] = useState([]);
  console.log(jobsData);

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [applications, setApplications] = useState(0);
  const [jobDescription, setJobDescription] = useState([""]);
  const [whatLookingInColleague, setWhatLookingInColleague] = useState([""]);
  const [role, setRole] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [roleCategory, setRoleCategory] = useState("");
  const [educations, setEducations] = useState("");
  const [skills, setSkills] = useState([""]);
  const [aboutCompany, setAboutCompany] = useState([""]);

  const navigate = useNavigate();

  const GotoDetailPageFunc = (id) => {
    navigate(`/jobdetail/${id}`);
  };

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

  // =============Job Description============
  const addJobDescriptionField = () => {
    setJobDescription([...jobDescription, ""]);
  };

  const handleJobDescriptionChange = (index, value) => {
    const updatedJobDescriptions = [...jobDescription];
    updatedJobDescriptions[index] = value;
    setJobDescription(updatedJobDescriptions);
  };

  const removeJobDescriptionField = (index) => {
    const updatedJobDescriptions = [...jobDescription];
    updatedJobDescriptions.splice(index, 1);
    setJobDescription(updatedJobDescriptions);
  };

  const renderJobDescriptionFields = () => {
    return jobDescription.map((description, index) => (
      <div key={index} className="jobdescription_extra_input_div">
        <input
          type="text"
          placeholder="Job Description"
          value={description}
          onChange={(e) => handleJobDescriptionChange(index, e.target.value)}
        />
        {index === 0 ? null : (
          <button onClick={() => removeJobDescriptionField(index)}>✖</button>
        )}
      </div>
    ));
  };
  // =======================================
  // =======================================
  const addWhatLookingInColleagueField = () => {
    setWhatLookingInColleague([...whatLookingInColleague, ""]);
  };

  const handleWhatLookingInColleagueChange = (index, value) => {
    const updatedWhatLookingInColleague = [...whatLookingInColleague];
    updatedWhatLookingInColleague[index] = value;
    setWhatLookingInColleague(updatedWhatLookingInColleague);
  };

  const removeWhatLookingInColleagueField = (index) => {
    const updatedWhatLookingInColleague = [...whatLookingInColleague];
    updatedWhatLookingInColleague.splice(index, 1);
    setWhatLookingInColleague(updatedWhatLookingInColleague);
  };

  const renderWhatLookingInColleagueFields = () => {
    return whatLookingInColleague.map((description, index) => (
      <div key={index} className="jobdescription_extra_input_div">
        <input
          type="text"
          placeholder="What We're Looking For in a Colleague"
          value={description}
          onChange={(e) =>
            handleWhatLookingInColleagueChange(index, e.target.value)
          }
        />
        {index === 0 ? null : (
          <button onClick={() => removeWhatLookingInColleagueField(index)}>
            ✖
          </button>
        )}
      </div>
    ));
  };
  // =======================================

  // =============Skills============
  const addSkillsField = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const removeSkillsField = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const renderSkillsFields = () => {
    return skills.map((skill, index) => (
      <div key={index} className="jobdescription_extra_input_div">
        <input
          type="text"
          placeholder="Skills"
          value={skill}
          onChange={(e) => handleSkillsChange(index, e.target.value)}
        />
        {index === 0 ? null : (
          <button onClick={() => removeSkillsField(index)}>✖</button>
        )}
      </div>
    ));
  };
  // =======================================

  // =============About Company============
  const addAboutCompanyField = () => {
    setAboutCompany([...aboutCompany, ""]);
  };

  const handleAboutCompanyChange = (index, value) => {
    const updatedAboutCompany = [...aboutCompany];
    updatedAboutCompany[index] = value;
    setAboutCompany(updatedAboutCompany);
  };

  const removeAboutCompanyField = (index) => {
    const updatedAboutCompany = [...aboutCompany];
    updatedAboutCompany.splice(index, 1);
    setAboutCompany(updatedAboutCompany);
  };

  const renderAboutCompanyFields = () => {
    return aboutCompany.map((info, index) => (
      <div key={index} className="jobdescription_extra_input_div">
        <textarea
          type="text"
          placeholder="About Company"
          value={info}
          onChange={(e) => handleAboutCompanyChange(index, e.target.value)}
        />
        {index === 0 ? null : (
          <button onClick={() => removeAboutCompanyField(index)}>✖</button>
        )}
      </div>
    ));
  };
  // =======================================

  // =============Industry Type============
  const industryTypeOptions = [
    "Data Science & Analytics",
    "Marketing",
    "Software & IT",
    "Sales",
    "Banking & Finance",
    "Engineering",
    "Analytics",
    "IT Services & Consulting",
    "E-Learning / EdTech",
  ];

  const handleIndustryTypeChange = (value) => {
    setIndustryType(value);
  };

  const renderIndustryTypeOptions = () => {
    return (
      <select
        value={industryType}
        onChange={(e) => handleIndustryTypeChange(e.target.value)}
      >
        <option value="">Industry Type</option>
        {industryTypeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  // =======================================

  const token = Cookies.get("EmployeeToken");
  console.log(token);

  const SubmitFunc = async () => {
    const obj = {
      jobTitle: jobTitle,
      companyName: companyName,
      CompanyLogo: companyLogo,
      experience: experience,
      salary: salary,
      location: location,
      vacancy: vacancies,
      applications: applications,
      jobDescription: jobDescription,
      what_looking_in_collegue: whatLookingInColleague,
      role: role,
      industryType: industryType,
      department: department,
      employmentType: employmentType,
      roleCatagory: roleCategory,
      educations: educations,
      skills: skills,
      aboutCompany: aboutCompany,
    };
    console.log(obj);

    try {
      await fetch(`https://bright-worm-fedora.cyclic.app/jobs/post`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success == true) {
            toast.success(res.msg);
            // alert(res.msg);
            getData();
          } else {
            toast.warning(res.msg);
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const getData = async () => {
    const userid = JSON.parse(Cookies.get("userData"));
    const id = userid._id;

    try {
      await fetch(`https://bright-worm-fedora.cyclic.app/jobs/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setJobData(res);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="jobpost_main_container">
      <button
        className="add_post_btn"
        onClick={() => setFormContainer(!formContainer)}
        style={{ marginBottom: formContainer ? "20px" : "-50px" }}
      >
        Add Jobs
      </button>
      <div
        className={`PostJob_form_container ${formContainer ? "show" : "hide"}`}
        style={{ marginBottom: formContainer ? "50px" : "" }}
      >
        <div>
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Company Logo"
            value={companyLogo}
            onChange={(e) => setCompanyLogo(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Vacancies"
            value={vacancies}
            onChange={(e) => setVacancies(e.target.value)}
          />
        </div>
        \
        <div className="JobDescription_inpu_div">
          {renderJobDescriptionFields()}
          <button onClick={addJobDescriptionField}>✚</button>
        </div>
        <div className="JobDescription_inpu_div">
          {renderWhatLookingInColleagueFields()}
          <button onClick={addWhatLookingInColleagueField}>✚</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="Industry_type_div">
          {renderIndustryTypeOptions()}
          <div className="Indestry_type_other_div_flex">
            <label>If Other:</label>
            <input
              type="text"
              placeholder="Other Industry Type (if applicable)"
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Employment Type"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Role Category"
            value={roleCategory}
            onChange={(e) => setRoleCategory(e.target.value)}
          />
        </div>
        <div>
          <textarea
            type="text"
            placeholder="Education"
            value={educations}
            onChange={(e) => setEducations(e.target.value)}
          />
        </div>
        <div className="JobDescription_inpu_div">
          {renderSkillsFields()}
          <button onClick={addSkillsField}>✚</button>
        </div>
        <div className="JobDescription_inpu_div about_my_conpany_con">
          {renderAboutCompanyFields()}
          <button onClick={addAboutCompanyField}>✚</button>
        </div>
        <button onClick={SubmitFunc}>Submit</button>
      </div>

      <div className="jobpostpage_second_con">
        <h2>Your All Posting Jobs</h2>
        {jobsData
          ? jobsData.map((ele) => (
              <div
                key={ele._id}
                className="job_cards"
                onClick={() => GotoDetailPageFunc(ele._id)}
              >
                <div className="job_card_first_container">
                  <div>
                    <h3>{ele.jobTitle}</h3>
                    <p>{ele.companyName}</p>
                  </div>
                  <div>
                    <img src={ele.CompanyLogo} alt="" />
                  </div>
                </div>
                <div className="job_card_second_container">
                  <div>
                    <FaToolbox /> <p>{ele.experience} year</p>
                  </div>
                  <div>
                    <FaRupeeSign /> <p>{ele.salary} lakh per anual</p>
                  </div>

                  <div>
                    <GoLocation /> <p>{ele.location}</p>
                  </div>
                </div>

                <div className="job_card_third_container">
                  <GoNote size={30} />
                  <p>
                    {`${ele.what_looking_in_collegue[1]}.
                        ${ele.what_looking_in_collegue[2]} & ${ele.what_looking_in_collegue[3]}`}
                  </p>
                </div>

                <div className="job_card_container_four">
                  {ele.skills.map((skill, index) => (
                    <React.Fragment key={index}>
                      <p>{skill}</p>
                      {index !== ele.skills.length - 1 && <p>•</p>}
                    </React.Fragment>
                  ))}
                </div>

                <div className="job_card_container_five">
                  <div>
                    {" "}
                    {customFormatDistanceToNow(new Date(ele.JobPostDate), {
                      addSuffix: true,
                    })}
                  </div>
                  <div>
                    <AiOutlineSave size={25} />
                    <p>Save</p>
                  </div>
                </div>
              </div>
            ))
          : "no data"}
      </div>
    </div>
  );
}
