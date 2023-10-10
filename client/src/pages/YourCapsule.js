// YourCapsule.js
import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "./capsule.css";
import { useNavigate } from "react-router-dom";

export const YourCapsule = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState(""); // New state to store the token

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login", { replace: true });
    } else {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = (token) => {
    fetch("http://localhost:5000/api/getUserData", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleViewFile = (fileId, token) => {
    // When the "View File" link is clicked, open a new window with the file URL and include the Authorization header
    window.open(`http://localhost:5000/viewFile/${fileId}?token=${token}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <center>
        <h1 id="head">Your Stories Stored In Our Capsules</h1>
      </center>
      <div id="cardHead">
        {userData.map((record, index) => (
          <div className="card-container" key={record._id}>
            <div className="card">
              <div id="cardHeading">
                <h2>Capsule Number {index + 1}</h2>
              </div>
              <div id="cardBody" className="flex-ContainerD">
                <div>
                  <p>Email: {record.email}</p>
                  <p>Time: {record.dateTime}</p>
                  {/* Use onClick to handle the "View File" action */}
                  <button onClick={() => handleViewFile(record.file)}>
                    View File
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};
