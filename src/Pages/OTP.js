import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { GoArrowLeft } from "react-icons/go";
import { PiClockCounterClockwise } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../services/apis.js";
import { apiConnector } from "../services/apiconnector";
import { ToastContainer, toast } from "react-toastify";


const OTP = (props) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  let data = useSelector((state) => state.signup.data);

  const otpsend = async () => {
    try {
      const result = await apiConnector("POST", user.OTPSEND_API, {
        email: email,
      });

      toast.success("otp send successfully");
      console.log("this is result by otpsend", result);
      setOtp(null);
    } catch (error) {
      console.log("unable to get otp", error?.response?.data.message || error.message);
    }
  };

  // not working
  // data = { ...data[0], otp:otp };

  const { firstname, lastname, email, password, confirmpassword, type } = data[0];

  // const updatedData = {
  //   firstname: firstname,
  //   lastname: lastname,
  //   email: email,
  //   password : password,
  //   confirmpassword : confirmpassword,
  //   accounttype: type, // Assuming `type` represents account type
  //   otp: otp, // Add OTP from input
  // };

  async function varifyandregister() {
    // dispatch(setsignupdatawithOTP({ otp: otp }));
    <ToastContainer />
    try {
      const result = await apiConnector("POST", user.SIGNUP_API, {
        firstname: firstname,
        lastname: lastname,
        password: password,
        confirmpassword: confirmpassword,
        email: email,
        accounttype: type, // Assuming `type` represents account type
        otp: otp, // Add OTP from input
      });
      console.log("this is result by signup", result.data);

      toast.success("Account has successfully been created!");

      setTimeout(() => {
        navigate("/Login");
      }, 1000)
      
    } catch (e) {
      // console.log("this is updated data", updatedData);
      console.log("unable to make an account", e);

      if (e?.response?.data?.message === "otp doesn't match") {
        toast.error("OTP doesn't match. Please try again.");
        return;
      }

    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "rgba(0, 8, 20, 1)",
        color: "white",
      }}
    >
      {/* Title */}
      <ToastContainer />
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        Verify email
      </h2>
      <p
        style={{
          color: "#CBD5E1",
          marginBottom: "1.5rem",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        A verification code has been sent to you. Enter the code below
      </p>

      {/* OTP Inputs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span style={{ color: "#64748B" }}>-</span>}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "2.5em",
                height: "2.5em",
                background: "#161D29",
                color: "white",
                textAlign: "center",
                borderRadius: "8px",
                border: "1px solid #475569",
                outline: "none",
                fontSize: "1rem",
              }}
            />
          )}
        />
      </div>

      {/* Verify Button */}
      <button
        onClick={varifyandregister}
        style={{
          width: "100%",
          maxWidth: "300px",
          padding: "12px",
          backgroundColor: "#FACC15",
          color: "#000",
          fontWeight: "bold",
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#EAB308")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#FACC15")}
      >
        Verify and Register
      </button>

      {/* Bottom Options */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "300px",
          marginTop: "1rem",
          fontSize: "0.9rem",
        }}
      >
        {/* Back to Login */}
        <NavLink to="/SignUp">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#CBD5E1",
              cursor: "pointer",
            }}
          >
            <GoArrowLeft />
            <span>Back to SignUp</span>
          </div>
        </NavLink>

        {/* Resend OTP */}
        <div
          onClick={() => { otpsend() }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#FACC15",
            cursor: "pointer",
          }}
        >
          <PiClockCounterClockwise />
          <span>Resend it</span>
        </div>
      </div>
    </div>
  );
};

export default OTP;
