import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [formdata, setformdata] = useState({
    name: '',
    profilephoto: null,
    email: '',
    password: '',
    degree: '',
    yearofpassout: '',
    currentlyworkingin: '',
    experiencedCompanies: '',
    github: '',
    message: ''
  });

  const handlechange = (e) => {
    const { name, value, files } = e.target;
    setformdata({
      ...formdata,
      [name]: files ? files[0] : value,
    });
  };
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', formdata.name);
    formData.append('email', formdata.email);
    if (formdata.profilephoto) {
      formData.append('profilephoto', formdata.profilephoto);
    }
    formData.append('degree', formdata.degree);
    formData.append('yearofpassout', formdata.yearofpassout);
    formData.append('currentlyworkingin', formdata.currentlyworkingin);
    formData.append('experiencedCompanies', formdata.experiencedCompanies);
    formData.append('github', formdata.github);
    formData.append('message', formdata.message);

    try {
      const response = await fetch('https://ceo-3j5o.onrender.com/signup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Alumni registered successfully');
      } else {
        const error = await response.text();
        console.error('Error registering alumni:', error);
        alert('Failed to register alumni: ' + error);
      }
    } catch (error) {
      console.error('Error registering alumni:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className="unique-signup-container">
      <h1 className="unique-signup-header">
        We will create a profile card of you based on your details submission
      </h1>
      <form onSubmit={handlesubmit} className="unique-signup-form">
        <div className="unique-form-group">
          <label htmlFor="name">Enter Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formdata.name}
            onChange={handlechange}
            className="unique-signup-input"
            required
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="profilephoto">Enter Your Clean Profile Photo</label>
          <input
            type="file"
            id="profilephoto"
            name="profilephoto"
            onChange={handlechange}
            className="unique-signup-input"
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="email">Enter Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            className="unique-signup-input"
            required
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="password">Set Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
            className="unique-signup-input"
            required
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="degree">Enter Your Degree</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formdata.degree}
            onChange={handlechange}
            className="unique-signup-input"
            required
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="yearofpassout">Year of Passout</label>
          <input
            type="number"
            id="yearofpassout"
            name="yearofpassout"
            value={formdata.yearofpassout}
            onChange={handlechange}
            className="unique-signup-input"
            required
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="currentlyworkingin">Currently Working In</label>
          <input
            type="text"
            id="currentlyworkingin"
            name="currentlyworkingin"
            value={formdata.currentlyworkingin}
            onChange={handlechange}
            className="unique-signup-input"
            required
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="experiencedCompanies">Experienced Companies</label>
          <input
            type="text"
            id="experiencedCompanies"
            name="experiencedCompanies"
            value={formdata.experiencedCompanies}
            onChange={handlechange}
            className="unique-signup-input"
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="github">GitHub Profile Link</label>
          <input
            type="url"
            id="github"
            name="github"
            value={formdata.github}
            onChange={handlechange}
            className="unique-signup-input"
            placeholder="https://github.com/username"
          />
        </div>

        <div className="unique-form-group">
          <label htmlFor="message">Leave a Message For Students</label>
          <textarea
            id="message"
            name="message"
            value={formdata.message}
            onChange={handlechange}
            className="unique-signup-textarea"
            required
          />
        </div>

        <div className="unique-form-group">
          <button type='submit' className="unique-signup-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
