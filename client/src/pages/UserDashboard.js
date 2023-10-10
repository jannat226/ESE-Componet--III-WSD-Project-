import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';

export const UserDashboard = () => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
    else {
      // Fetch user's name using the token from the server
      fetch('http://localhost:5000/api/getUserName', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
        })
        .catch((error) => {
          console.error('Error fetching user name:', error);
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be submitted
    const formData = {
      email,
      file: file ? file.name : '', // You can handle file uploads separately
      dateTime,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      // Send a POST request to submit the data
      const response = await fetch('http://localhost:5000/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Data submitted successfully, you can handle the response accordingly
        console.log('Data submitted successfully');
      } else {
        // Data submission failed, handle the error
        console.error('Data submission failed');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="content">
      <div className="welcome-message">Welcome, {name}!</div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File Upload:</label>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
