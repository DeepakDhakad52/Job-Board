import React, { useState } from "react";
import "./RegisterLogin.css";
import { IoLogoFacebook } from "react-icons/io";
import { ImGooglePlus3 } from "react-icons/im";
import { BiLogoLinkedin } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterLogin() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState(null);
  const [role, setRole] = useState("");

  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  const [loginForm, setLoginForm] = useState(true);
  const [registeForm, setRegisterForm] = useState(false);

  const nagigate = useNavigate();

  const RegisterFunc = async (e) => {
    e.preventDefault();
    const obj = {
      name,
      email,
      password,
      mobile,
      role,
    };

    try {
      await fetch(`https://bright-worm-fedora.cyclic.app/users/register`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.success === true) {
            toast.success(res.msg);
            setIsSignUp(false);
            setLoginForm(true);
          } else {
            // alert(res.msg);
            toast.warning(res.msg);
          }
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    } catch (err) {
      console.log(err);

      toast.error(err);
    }
  };

  const LoginFunc = async (e) => {
    e.preventDefault();
    const obj = {
      email: LoginEmail,
      password: LoginPassword,
    };

    try {
      await fetch(`https://bright-worm-fedora.cyclic.app/users/login`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const token = res.token;

          if (res.success === true) {
            // alert(res.msg);

            if (res.user[0].role == "candidate") {
              nagigate("/");
              console.log("candidate");

              Cookies.set("isAuthCan", true);
              Cookies.set("isAuthEmp", false);
              Cookies.set("CandidateToken", token);
              Cookies.set("userData", JSON.stringify(res.user[0]));

              window.location.reload();
            }
            if (res.user[0].role == "employee") {
              nagigate("/");
              console.log("employee");

              Cookies.set("isAuthEmp", true);
              Cookies.set("isAuthCan", false);
              Cookies.set("EmployeeToken", token);
              Cookies.set("userData", JSON.stringify(res.user[0]));

              window.location.reload();
            }
          } else {
            toast.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };
  return (
    <div className="main_box_of_login">
      <h2>Sign in/up </h2>
      <div
        id="for_desktop_signup_login"
        className={`container ${isSignUp ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={RegisterFunc}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <IoLogoFacebook size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <ImGooglePlus3 size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <BiLogoLinkedin size="20px" color="#1e90ff" />
              </a>
            </div>
            <span>Fill your personal info</span>
            <select name="" id="" onChange={(e) => setRole(e.target.value)}>
              <option value="">Choose here</option>
              <option value="candidate">Register as Candidate</option>
              <option value="employee">Register as Employee</option>
            </select>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={LoginFunc}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <IoLogoFacebook size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <ImGooglePlus3 size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <BiLogoLinkedin size="20px" color="#1e90ff" />
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Everyone!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="Mobile_signup_login">
        <div className="login_signup_btn_div">
          <button
            onClick={() => {
              setLoginForm(true);
              setRegisterForm(false);
            }}
            className={
              loginForm ? "swap_btn_signup_login" : "swap_btn_nocolour"
            }
          >
            Login
          </button>
          <button
            onClick={() => {
              setLoginForm(false);
              setRegisterForm(true);
            }}
            className={
              registeForm ? "swap_btn_signup_login" : "swap_btn_nocolour"
            }
          >
            Register
          </button>
        </div>
        <div
          className="login_form_container"
          id={!loginForm ? "hide_Loginform" : ""}
        >
          <form action="#" onSubmit={LoginFunc}>
            <div className="social-container">
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <IoLogoFacebook size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <ImGooglePlus3 size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <BiLogoLinkedin size="20px" color="#1e90ff" />
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <a className="forgetPassword_login" href="#">
              Forgot your password?
            </a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div
          className="login_form_container"
          id={!registeForm ? "hide_registerForm" : ""}
        >
          <form action="#" onSubmit={RegisterFunc}>
            <div className="social-container">
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <IoLogoFacebook size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <ImGooglePlus3 size="20px" color="#1e90ff" />
              </a>
              <a
                href="#"
                className="social"
                style={{ border: "1px solid #1e90ff" }}
              >
                <BiLogoLinkedin size="20px" color="#1e90ff" />
              </a>
            </div>
            <span>Fill your personal info</span>
            <select name="" id="" onChange={(e) => setRole(e.target.value)}>
              <option value="">Choose here</option>
              <option value="candidate">Register as Candidate</option>
              <option value="employee">Register as Employee</option>
            </select>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
            />
            <button className="registerButn_submit" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
