import "./login.css";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Registration was successful, you can redirect or perform actions here
        alert("Registration successful");
        // console.log("Registration successful");
      } else {
        // Handle registration failure (e.g., display an error message)
        alert("Registration failed");
        // console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="form-1" onSubmit={handleLogin}>
          <div className="loginContainer">
            <h1>SignUp</h1>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleName}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleEmail}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handlePassword}
              required
            />
            <center>
              <button type="submit">Register</button>
            </center>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
