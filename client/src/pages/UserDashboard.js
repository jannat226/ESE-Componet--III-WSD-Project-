import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

export const UserDashboard = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      // Fetch user's name using the token from the server
      fetch("http://localhost:5000/api/getUserName", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
  
      const formData = new FormData();
      formData.append('email', email);
      formData.append('dateTime', dateTime);
      formData.append('file', file); // Append the file directly
  
      // Send a POST request with FormData
      const response = await fetch('http://localhost:5000/submitData', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.status === 201) {
        // Data submitted successfully, you can handle the response accordingly
        console.log("Data submitted successfully");
      } else {
        // Data submission failed, handle the error
        console.error("Data submission failed");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar />
      <div className="dash">
        <div className="flex-container ">
          <div className="flex-item1">
            <ul className="nav flex-column vnav">
              <li className="nav-item">
                <a className="nav-link " href="#">
                  Your Capsules
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Create Capsule
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="logout" href="#">
                  <button onClick={handleLogout}>Logout</button>
                </a>
              </li>

              <div className="nav-item3">
                {/* <img
                  id="sideimg"
                  src="https://iheartcraftythings.com/wp-content/uploads/2017/08/back-to-school-time-capsule-sq-final.jpg"
                /> */}
                <div class="content-slider">
                  <div class="slider">
                    <div class="mask">
                      <ul>
                        <li class="anim1">
                          <img
                            id="sideimg"
                            src="data:image/jpeg;base64,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"
                          />
                          <div class="source">- Person</div>
                        </li>
                        <li class="anim2">
                          <img
                            id="sideimg"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1HO04JH-5KpK87CGOuLU4Cav6CiTTq2BsiMJ50zj3tFySFFK-RDZBfDsLAs9j2MOzB0&usqp=CAU"
                          />
                          <div class="source">- Another Person</div>
                        </li>
                        <li class="anim3">
                          <img
                            id="sideimg"
                            src="https://iheartcraftythings.com/wp-content/uploads/2017/08/back-to-school-time-capsule-sq-final.jpg"
                          />
                          <div class="source">- Yet Another Person</div>
                        </li>
                        <li class="anim4">
                          <img
                            id="sideimg"
                            src="https://farm8.staticflickr.com/7158/6596730691_c49d6305d8_z.jpg"
                          />
                          <div class="source">- Fourth Person</div>
                        </li>
                        <li class="anim5">
                          <img
                            id="sideimg"
                            src="https://iheartcraftythings.com/wp-content/uploads/2017/08/back-to-school-time-capsule-sq-final.jpg"
                          />
                          <div class="source">- Fifth Person</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <div className="flex-item2">
            <div className="contentUpload">
              <h3 id="headingcontent">Experience nostalgia in future</h3>
              <form id="contentform" onSubmit={handleSubmit} encType="multipart/form-data">
                <label id="contentlabel">Upload File : </label>
                <input
                  type="file"
                  name="file"
                  id="hinput"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                <br />
                <label id="contentlabel">Set Time : </label>
                <input
                  type="datetime-local"
                  id="hinput"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                />
                <br />
                <label id="contentlabel">Email Address :</label>

                <input
                  type="email"
                  value={email}
                  id="hinput"
                  placeholder="Enter the recipent's email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
