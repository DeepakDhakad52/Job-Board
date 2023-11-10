import React, { useState } from "react";
import "./Home.css";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

function SearchResultItem({ result, onClick }) {
  return (
    <div>
      <div>
        <img src={result.CompanyLogo} alt={result.companyName} />
      </div>
      <div>{result.jobTitle}</div>
      <div>{result.companyName}</div>
      <div>
        <button onClick={() => onClick(result._id)}>View Details</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://bright-worm-fedora.cyclic.app/jobs/jobdata?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTFkYmM4ZjdjMjM0Mjk2MGQxZjk2ZjAiLCJpYXQiOjE2OTY0NDc2NDB9.mYDPAAn4rb-i10EQPiZtl2ol_k7NGkt5LJZJfNXawWk", // Replace with your actual token
          },
        }
      );
      const data = await response.json();

      setSearchResults(data.jobs);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const GotoDetailPageFunc = (id) => {
    const isAuth = Cookies.get("isAuthCan") || Cookies.get("isAuthEmp");
    console.log(!isAuth);
    if (!isAuth) {
      alert("Please login first");
      navigate("/registerandlogin");
    } else {
      navigate(`/jobdetail/${id}`);
    }
  };

  return (
    <div className="home_main_container">
      <div className="home_banner">
        <img
          className="desktop_img"
          src="https://images.sampleforms.com/wp-content/uploads/2017/04/Termination-Clearance-Form.jpg"
          alt=""
        />
        <img
          className="mobile_img"
          src="https://thumbs.dreamstime.com/b/businesswoman-wearing-headset-working-busy-office-smiling-44096992.jpg"
          alt=""
        />
        <div>
          <h1>We Know A Talent When We See One</h1>
          <p>
            Hire Your Heart's Desire. Fuel Your Career With Us. Find Growth,
            Wherever You Are.
          </p>

          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>
        </div>
        {loading && <p>Loading...</p>}
      </div>
      {searchResults.length > 0 && (
        <div className="Result_box_home">
          {searchResults.map((result) => (
            <SearchResultItem
              key={result._id}
              result={result}
              onClick={GotoDetailPageFunc}
            />
          ))}
        </div>
      )}
    </div>
  );
}
