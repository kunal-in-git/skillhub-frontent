import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login from "../assets/Images/login.webp";
import { user } from "../services/apis.js";
import { apiConnector } from "../services/apiconnector";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [hidden, setHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setHidden(!hidden);
  }
  
  async function submitForm() {
    // console.log("Login Button Clicked!");
    // console.log("Submitting form with:", { email, password });

    // if (!email || !password) {
    //   console.error("Email or password is empty!");
    //   return;
    // }

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    try {


      const response = await apiConnector("POST", user.LOGIN_API, {
        email: email,
        password: password,
      });

      toast.success("Successfully logedin!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("image", response.data.data.image);
      localStorage.setItem("logindata", JSON.stringify(response.data.data));

      const logi = JSON.parse(localStorage.getItem("logindata"));
      console.log("this is data of login", logi);

      setTimeout(() => {
        navigate("/Home");
      }, 2000);

      console.log("Login Response:", response.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      if (error.response?.data.message === "user doesn't exists with the registered email") {
        toast.error("user doesn't exists with the registered email!");
        return;
      }

      if (error.response?.data.message === "Password doesn't match") {
        toast.error("Password doesn't match!");
        return;
      }
    }
  }

  return (
    <div className="login-container">
      <ToastContainer />
      {/* Login Container */}
      <div className="login-box">
        {/* Left Section */}
        <div className="login-form-container">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Build skills for today, tomorrow, and beyond.
          </p>
          <p className="login-tagline">
            Education to future-proof your career.
          </p>

          {/* Email Field */}
          <label htmlFor="email" className="input-label">
            E-mail<span className="required-star">*</span>
          </label>
          <input
            id="email"
            type="email"
            aria-label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // console.log("Email Updated:", e.target.value);
            }}
            className="login-input"
          />

          {/* Password Field */}
          <label htmlFor="password" className="input-label">
            Password<span className="required-star">*</span>
          </label>
          <div className="password-input-container">
            <input
              id="password"
              type={hidden ? "password" : "text"}
              aria-label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log("Password Updated:", e.target.value);
              }}
              className="login-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {hidden ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          {/* Forgot Password */}
          <NavLink style={{ textDecoration: 'none' }} to="/Login/Forgotpassword">
            <div className="forgot-password">
              Forgot Password?
            </div>
          </NavLink>

          {/* Sign In Button */}
          <div>
            <button
              onClick={submitForm}
              className="login-button"
            >
              Sign In
            </button>
          </div>

          <div className="divider">
            OR
          </div>

          {/* Google Sign-In */}
          <button className="google-button">
            <span className="google-icon">
              <FcGoogle />
            </span>
            Sign in with Google
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="login-image-container">
          <img
            src={login}
            alt="Login illustration"
            className="login-image"
          />
        </div>
      </div>

      <style jsx>{`
        .login-container {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #24272b;
          padding: 20px;
        }
        
        .login-box {
          display: flex;
          width: 100%;
          max-width: 1000px;
          height: auto;
          min-height: 500px;
          background-color: #1c1e22;
          border-radius: 10px;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          flex-direction: column;
        }
        
        .login-form-container {
          text-align: left;
          padding: 2rem;
          width: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #ffffff;
        }
        
        .login-image-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #24272b;
          padding: 1rem;
          position: relative;
        }
        
        .login-title {
          font-size: 2rem;
          font-weight: 700;
          color: #f5c518;
          margin-bottom: 0.5rem;
        }
        
        .login-subtitle {
          font-size: 1rem;
          color: #c1c3c8;
          margin-bottom: 0.5rem;
        }
        
        .login-tagline {
          color: #00FFFF;
          font-style: italic;
          font-size: 1rem;
        }
        
        .input-label {
          font-size: 0.9rem;
          color: #c1c3c8;
          margin-top: 1rem;
        }
        
        .required-star {
          color: red;
        }
        
        .login-input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 1rem;
          border: 1px solid #555;
          border-radius: 5px;
          background-color: #333;
          color: #fff;
          box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.5);
        }
        
        .password-input-container {
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .password-toggle {
          border: none;
          background: transparent;
          position: absolute;
          right: 10px;
          bottom: 24px;
          font-size: 20px;
          cursor: pointer;
          color: #888;
        }
        
        .forgot-password {
          font-size: 0.9rem;
          color: #00FFFF;
          cursor: pointer;
          margin-bottom: 1.5rem;
          text-align: right;
        }
        
        .login-button {
          padding: 12px 20px;
          background-color: #f5c518;
          color: #1c1e22;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.1rem;
          width: 100%;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        
        .login-button:hover {
          background-color: #e2b10f;
        }
        
        .divider {
          text-align: center;
          color: #888;
          font-size: 0.9rem;
          margin: 20px 0;
        }
        
        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background-color: #333;
          color: #ffffff;
          border: 1px solid #444;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
          width: 100%;
        }
        
        .google-button:hover {
          background-color: #555;
        }
        
        .google-icon {
          font-size: 1.5em;
          margin-right: 8px;
        }
        
        .login-image {
          width: 80%;
          height: auto;
          max-width: 400px;
        }
        
        @media (min-width: 768px) {
          .login-box {
            flex-direction: row;
            height: 75vh;
          }
          
          .login-form-container {
            width: 50%;
            padding: 3rem 2rem;
          }
          
          .login-image-container {
            width: 50%;
          }
        }
        
        @media (max-width: 480px) {
          .login-container {
            padding: 10px;
          }
          
          .login-form-container {
            padding: 1.5rem;
          }
          
          .login-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;