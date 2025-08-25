import React from "react";

function Passwordchanged() {
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
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#FACC15",
          }}
        >
          Password Changed!
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#a0a0a0",
            marginBottom: "1.5rem",
          }}
        >
          Your password has been successfully updated. You can now log in with
          your new password.
        </p>
      </div>
    </div>
  );
}

export default Passwordchanged;
