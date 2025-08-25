import React from 'react'
import { apiConnector } from '../../services/apiconnector'
import { profile } from '../../services/apis'
import { useNavigate } from 'react-router-dom'

function Confirmdelete({setdeleteaccount}) {
    const navigate = useNavigate();
    const deleteaccount = async ()=>{
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'))
            setdeleteaccount(false)
            const token = logindata.token
            console.log("this is token", token)
            const data = await apiConnector('DELETE', profile.DELETEACCOUNT_API, 
                {},
                {
                    Authorization: `Bearer ${token}`
                }
            );
            console.log(data);
            
            localStorage.clear();
            setTimeout(()=>{
                navigate("/Home");
            },1000)
        } catch (error) {
            console.log("error in deleting accoung")
        }
    }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "red",
          }}
        >
          Confirm Deletion
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "#555",
            margin: "15px 0",
          }}
        >
          Are you sure you want to delete your account? This action cannot be undone.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              background: "#ccc",
              color: "#333",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#bbb")}
            onMouseOut={(e) => (e.target.style.background = "#ccc")}

            onClick={()=>setdeleteaccount(false)}
          >
            Cancel
          </button>

          <button
            style={{
              padding: "10px 20px",
              background: "red",
              color: "white",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "darkred")}
            onMouseOut={(e) => (e.target.style.background = "red")}
            onClick={()=>{deleteaccount()}}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmdelete
