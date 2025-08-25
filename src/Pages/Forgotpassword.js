import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { user } from "../services/apis.js";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [ismailsend, setsendmail] = useState(false);
  const navigate = useNavigate()

  function handleReset() {
    console.log("Reset password request for:", email);
    if (!email) {
      alert("Please enter your email address.");
      return;
    }


    const sendotpfun = async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }

      try {
        const result = await apiConnector("POST", user.RESETPASS_API, {
          email: email,
        });

        if (result && result.data.forgotpasstoken) {
          console.log("this is result", result);
          localStorage.setItem("forgotpasswordtoken", result.data.forgotpasstoken);
          console.log("Token stored in local storage:", result.data.forgotpasstoken);
          setEmail("");
          setsendmail(true);
        } else {
          console.log("Error: Token not received in response.");
        }
      } catch (e) {
        console.log("unable to get the reset pass mail ");
      }
    };

    sendotpfun();
  }

  const ispasschanged = useSelector((state) => state.ispasschanged.value);
  if (ispasschanged) {
    setTimeout(() => {
      navigate("/login"); // Redirect instead of closing window
    }, 1000);
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0A0D14",
        color: "#fff",
      }}
    >
      <ToastContainer />
      <div
        style={{
          width: "35vw",
          background: "#11131A",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {!ismailsend ? "Reset your password" : "Check email"}
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#a0a0a0",
            marginBottom: "1.5rem",
          }}
        >
          {!ismailsend
            ? "Have no fear. We’ll email you instructions to reset your password."
            : `We have sent the reset email to ${email}`}
        </p>

        {/* Email Input */}

        {!ismailsend && (
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "0.9rem",
                textAlign: "left",
                marginBottom: "0.5rem",
              }}
            >
              Email Address <span style={{ color: "red" }}>*</span>
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#22242E",
                border: "1px solid #333",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                marginBottom: "1.5rem",
              }}
            />
          </div>
        )}

        {/* Reset Password Button */}

        <>
          {!ismailsend ? (
            <button
              onClick={handleReset}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#FACC15",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#EAB308")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FACC15")}
            >
              Reset Password
            </button>
          ) : (
            <button
              onClick={() => setsendmail(false)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#FACC15",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#EAB308")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FACC15")}
            >
              Resend Email
            </button>
          )}
        </>

        {/* Back to Login */}

        <NavLink to="/Login" style={{ textDecoration: 'none' }} >
          <div
            style={{
              marginTop: "1.5rem",
              fontSize: "0.9rem",
              cursor: "pointer",
              color: "#a0a0a0",
              textAlign: "left",
            }}
          >
            ← Back to login
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Forgotpassword;
