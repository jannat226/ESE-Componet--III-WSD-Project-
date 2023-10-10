import React, { useState } from 'react';
import './login.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // Import React Router's useNavigate

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize React Router's useNavigate

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // Redirect to the UserDashboard on successful login
        navigate('/userdashboard',{replace:true});  // Use React Router to navigate
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="form-1" onSubmit={handleLogin}>
          <h1>Login</h1>
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
          <span>Forgot Password?</span>
          <button type="submit">Login</button>

          <p>
            <a href="/signup" id="signUp">
              SignUp{" "}
            </a>
            Or SignUp Using
          </p>
          <div className="icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
              href="https://mail.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-google"></i>
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
