import React, { useState, useEffect } from "react";
import { user } from "../services/apis.js";
import { apiConnector } from "../services/apiconnector";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { passchanged } from "../slices/passwordslice.js";

const Newpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ispasschanged = useSelector((state) => state.ispasschanged.value);

  async function resetpassword() {
    const passtoken = localStorage.getItem("forgotpasswordtoken");
    console.log("this is passtoken by new password", passtoken);
    try {
      const result = await apiConnector("POST", user.NEWPASSWORD_API, {
        forgotpasstoken: passtoken,
        newpassword: password,
        confirmpassword: confirmPassword,
      });

      console.log("previous value of ispasschnage", ispasschanged);
      console.log("this is result by newpassword", result);

      dispatch(passchanged()); // ✅ Dispatch action to update state
    } catch (e) {
      console.log("unable to get the new password details", e);
    }
  }

  useEffect(() => {
    console.log("updated value of ispasschnage", ispasschanged);
    if (ispasschanged) {
      navigate("/Passwordchanged");

      setTimeout(() => {
        window.close()
      }, 2000);
    }
  }, [ispasschanged, navigate]); // ✅ Runs after Redux updates state

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
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Choose new password
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
            color: "#CBD5E1",
          }}
        >
          Almost done. Enter your new password and you're all set.
        </p>

        <label
          style={{
            display: "block",
            textAlign: "left",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          New password <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <label
          style={{
            display: "block",
            textAlign: "left",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          Confirm new password <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <button
          onClick={resetpassword}
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
};

export default Newpassword;
