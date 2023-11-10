import React, { useEffect, useState } from "react";
import "./JobListings.css";
import {
  BiSearch,
  BiRightArrowAlt,
  BiSolidBuildingHouse,
} from "react-icons/bi";
import { AiOutlineHome, AiOutlineSave } from "react-icons/ai";
import { SlGraph } from "react-icons/sl";
import { GoLocation, GoNote } from "react-icons/go";
import { GrSystem, GrSettingsOption } from "react-icons/gr";
import { FaRupeeSign, FaToolbox, FaSearchDollar } from "react-icons/fa";
import { BsGraphUpArrow, BsBoxSeam, BsRocketTakeoff } from "react-icons/bs";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function JobListings() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isAscending, setIsAscending] = useState(true);
  const [selectedSalaryFilter, setSelectedSalaryFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [selectedPlaceFilter, setSelectedPlaceFilter] = useState(null);
  const [activePlaceFilter, setActivePlaceFilter] = useState(null);
  const [activeSalaryFilter, setActiveSalaryFilter] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token = Cookies.get("CandidateToken") || Cookies.get("EmployeeToken");
  console.log({ val: !token });

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    try {
      await fetch(`https://bright-worm-fedora.cyclic.app/jobs`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization:
            token ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTFkYmM4ZjdjMjM0Mjk2MGQxZjk2ZjAiLCJpYXQiOjE2OTY0NDc2NDB9.mYDPAAn4rb-i10EQPiZtl2ol_k7NGkt5LJZJfNXawWk",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.sort((a, b) => new Date(b.JobPostDate) - new Date(a.JobPostDate));

          setData(res);
          setFilteredData(res);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
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

  const GotoDetailPageFunc = (id) => {
    if (token) {
      navigate(`/jobdetail/${id}`);
    } else {
      alert("Please Login First");
    }
  };

  // Filtering function
  const handleFilter = (category) => {
    setFilter(category);
    setSelectedPlaceFilter(category); // Set the selected place filter
    clearSalaryFilter(); // Clear the salary filter when a new filter is applied
  };

  // Sorting function
  const handleSort = () => {
    setIsAscending(!isAscending);
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      if (isAscending) {
        return new Date(a.JobPostDate) - new Date(b.JobPostDate);
      } else {
        return new Date(b.JobPostDate) - new Date(a.JobPostDate);
      }
    });
    setFilteredData(sortedData);
  };

  const handleSalaryFilter = (salaryRange) => {
    setSelectedSalaryFilter(salaryRange);

    const filteredJobs = data.filter((job) => {
      const salary = parseInt(job.salary);
      switch (salaryRange) {
        case "0-2":
          return salary >= 0 && salary <= 2;
        case "0-5":
          return salary >= 0 && salary <= 5;
        case "5-7":
          return salary >= 5 && salary <= 7;
        case "5-10":
          return salary >= 5 && salary <= 10;
        case "10-15":
          return salary >= 10 && salary <= 15;
        default:
          return true;
      }
    });

    setActivePlaceFilter(null);

    setFilteredData(filteredJobs);

    setActiveSalaryFilter(salaryRange);

    if (filteredJobs.length === 0) {
      setNoDataFound(true);
    } else {
      setNoDataFound(false);
    }
  };

  const clearSalaryFilter = () => {
    setSelectedSalaryFilter(null);
    setFilteredData(data);
    setNoDataFound(false);
    setActivePlaceFilter(null);
    setActiveSalaryFilter(null);
  };

  const handlePlaceFilter = (place) => {
    const filteredJobs = data.filter((job) => {
      return job.location === place;
    });

    setSelectedPlaceFilter(place);

    setFilteredData(filteredJobs);

    setActivePlaceFilter(place);
    setActiveSalaryFilter(null);

    if (filteredJobs.length === 0) {
      setNoDataFound(true);
    } else {
      setNoDataFound(false);
    }
  };

  const handleSearchSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://bright-worm-fedora.cyclic.app/jobs/jobdata?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const searchData = await response.json();
        setFilteredData(searchData.jobs);
        setSearchResults(searchData.jobs.length > 0);
      } else {
        console.error("Error fetching search results:", response.statusText);
        setSearchResults(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Joblisting_main_container">
      <div>
        <h1>Find your dream job now</h1>
        <p>5 lakh+ jobs for you to explore</p>
        <div className="Joblisting_search_box">
          <BiSearch size="30px" className="Search_icon_joblisting" />
          <input
            type="text"
            placeholder="Search your dream jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        <div className="filter_section_joblisting">
          <div
            className={`tooltip ${filter === "Remote" ? "active" : ""}`}
            onClick={() => handleFilter("Remote")}
          >
            <AiOutlineHome size="20px" className="filter_stickers" />
            <h3>Remote</h3>
            <h3 className="tooltiptext">Remote</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <BiSolidBuildingHouse size="20px" className="filter_stickers" />
            <h3>MNC</h3>
            <h3 className="tooltiptext">MNC</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <BsGraphUpArrow size="20px" className="filter_stickers" />
            <h3>Data Science & Analytics </h3>
            <h3 className="tooltiptext">Data Science & Analytics </h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <BsBoxSeam size="20px" className="filter_stickers" />
            <h3>Supply Chain</h3>
            <h3 className="tooltiptext">Supply Chain</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <SlGraph size="20px" className="filter_stickers" />
            <h3>Marketing</h3>
            <h3 className="tooltiptext">Marketing</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <GrSystem size="20px" className="filter_stickers" />
            <h3>Software & IT</h3>
            <h3 className="tooltiptext">Software & IT</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <FaToolbox size="20px" className="filter_stickers" />
            <h3>Sales</h3>
            <h3 className="tooltiptext">Sales</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <FaRupeeSign size="20px" className="filter_stickers" />
            <h3>Banking & Finance</h3>
            <h3 className="tooltiptext">Banking & Finance</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <BsRocketTakeoff size="20px" className="filter_stickers" />
            <h3>Startup</h3>
            <h3 className="tooltiptext">Startup</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <GrSettingsOption size="20px" className="filter_stickers" />
            <h3>Engineering</h3>
            <h3 className="tooltiptext">Engineering</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
          <div className="tooltip">
            <FaSearchDollar size="20px" className="filter_stickers" />
            <h3>Analytics</h3>
            <h3 className="tooltiptext">Analytics</h3>
            <BiRightArrowAlt size="30px" className="filter_stickers" />
          </div>
        </div>

        <div className="Job_container_Jobslistings">
          <div className="MobileFilter_section">
            <details>
              <summary>Filter</summary>
              <button
                onClick={clearSalaryFilter}
                className="clear_filter_button"
              >
                Clear Filter
              </button>
              <div className="Filtering_box">
                <p>Sorting by date</p>
                <button onClick={handleSort}>
                  {isAscending ? "Ascending" : "Descending"}
                </button>
              </div>
              <div className="Filtering_box">
                <p>Salary filter</p>

                <button
                  className={`salary-filter-button ${
                    activeSalaryFilter === "0-2" ? "active-filter" : ""
                  }`}
                  onClick={() => handleSalaryFilter("0-2")}
                >
                  0-2
                </button>
                <button
                  className={`salary-filter-button ${
                    activeSalaryFilter === "0-5" ? "active-filter" : ""
                  }`}
                  onClick={() => handleSalaryFilter("0-5")}
                >
                  0-5
                </button>
                <button
                  className={`salary-filter-button ${
                    activeSalaryFilter === "5-7" ? "active-filter" : ""
                  }`}
                  onClick={() => handleSalaryFilter("5-7")}
                >
                  5-7
                </button>
                <button
                  className={`salary-filter-button ${
                    activeSalaryFilter === "5-10" ? "active-filter" : ""
                  }`}
                  onClick={() => handleSalaryFilter("5-10")}
                >
                  5-10
                </button>
                <button
                  className={`salary-filter-button ${
                    activeSalaryFilter === "10-15" ? "active-filter" : ""
                  }`}
                  onClick={() => handleSalaryFilter("10-15")}
                >
                  10-15
                </button>
              </div>
              <div className="Filtering_box">
                <p>Filter by place</p>
                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Remote" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Remote")}
                >
                  Remote
                </button>

                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Delhi" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Delhi")}
                >
                  Delhi
                </button>
                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Bangalore" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Bangalore")}
                >
                  Bangalore
                </button>
                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Kolkata" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Kolkata")}
                >
                  Kolkata
                </button>
                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Mumbai" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Mumbai")}
                >
                  Mumbai
                </button>
                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Noida" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Noida")}
                >
                  Noida
                </button>
                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Chennai" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Chennai")}
                >
                  Chennai
                </button>
                <button
                  className={`place-filter-button ${
                    activePlaceFilter === "Bhubaneswar" ? "active-filter" : ""
                  }`}
                  onClick={() => handlePlaceFilter("Bhubaneswar")}
                >
                  Bhubaneswar
                </button>
              </div>
            </details>
          </div>
          <div className="job_conatiner_child1">
            <button onClick={clearSalaryFilter} className="clear_filter_button">
              Clear Filter
            </button>
            <div className="Filtering_box">
              <p>Sorting by date</p>
              <button onClick={handleSort}>
                {isAscending ? "Ascending" : "Descending"}
              </button>
            </div>
            <div className="Filtering_box">
              <p>Salary filter</p>

              <button
                className={`salary-filter-button ${
                  activeSalaryFilter === "0-2" ? "active-filter" : ""
                }`}
                onClick={() => handleSalaryFilter("0-2")}
              >
                0-2
              </button>
              <button
                className={`salary-filter-button ${
                  activeSalaryFilter === "0-5" ? "active-filter" : ""
                }`}
                onClick={() => handleSalaryFilter("0-5")}
              >
                0-5
              </button>
              <button
                className={`salary-filter-button ${
                  activeSalaryFilter === "5-7" ? "active-filter" : ""
                }`}
                onClick={() => handleSalaryFilter("5-7")}
              >
                5-7
              </button>
              <button
                className={`salary-filter-button ${
                  activeSalaryFilter === "5-10" ? "active-filter" : ""
                }`}
                onClick={() => handleSalaryFilter("5-10")}
              >
                5-10
              </button>
              <button
                className={`salary-filter-button ${
                  activeSalaryFilter === "10-15" ? "active-filter" : ""
                }`}
                onClick={() => handleSalaryFilter("10-15")}
              >
                10-15
              </button>
            </div>
            <div className="Filtering_box">
              <p>Filter by place</p>
              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Remote" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Remote")}
              >
                Remote
              </button>

              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Delhi" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Delhi")}
              >
                Delhi
              </button>
              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Bangalore" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Bangalore")}
              >
                Bangalore
              </button>
              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Kolkata" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Kolkata")}
              >
                Kolkata
              </button>
              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Mumbai" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Mumbai")}
              >
                Mumbai
              </button>
              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Noida" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Noida")}
              >
                Noida
              </button>
              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Chennai" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Chennai")}
              >
                Chennai
              </button>
              <button
                className={`place-filter-button ${
                  activePlaceFilter === "Bhubaneswar" ? "active-filter" : ""
                }`}
                onClick={() => handlePlaceFilter("Bhubaneswar")}
              >
                Bhubaneswar
              </button>
            </div>
          </div>
          <div className="job_conatiner_child2">
            {noDataFound || !searchResults ? (
              <p>No jobs found </p>
            ) : (
              filteredData.map((ele) => (
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
                    <GoNote size={30} className="third_container_sticker" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
