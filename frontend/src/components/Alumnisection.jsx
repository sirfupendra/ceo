import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Alumnisection() {
    const navigate = useNavigate();

    const registration = () => {
        navigate('/Signup');
    };

    const signin = () => {
        navigate('/Signin');
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/search?query=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching alumni:', error);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f6f9' }}>
            <nav style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', padding: '16px' }}>
                <button 
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }} 
                    onClick={registration}
                >
                    Create your profile now
                </button>
                <button 
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }} 
                    onClick={signin}
                >
                    Sign IN!
                </button>
            </nav>

            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Search Alumni</h2>
                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search by name or company"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            border: '2px solid #007bff',
                            borderRadius: '5px',
                            padding: '10px',
                            width: '50%',
                        }}
                    />
                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Search
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
                {searchResults.length > 0 ? (
                    searchResults.map((alumni, index) => (
                        <div key={index} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                            <img 
                                src={`http://localhost:5000/uploads/${alumni.profilephoto}`} 
                                alt="Profile" 
                                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '16px' }} 
                            />
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{alumni.name}</h3>
                            <div style={{ textAlign: 'left' }}>
                                <p style={{ margin: '4px 0' }}><span style={{ fontWeight: 'bold' }}>Email:</span> {alumni.email}</p>
                                <p style={{ margin: '4px 0' }}><span style={{ fontWeight: 'bold' }}>Degree:</span> {alumni.degree}</p>
                                <p style={{ margin: '4px 0' }}><span style={{ fontWeight: 'bold' }}>Year of Passout:</span> {alumni.yearofpassout}</p>
                                <p style={{ margin: '4px 0' }}><span style={{ fontWeight: 'bold' }}>Currently Working In:</span> {alumni.currentlyworkingin}</p>
                                <p style={{ margin: '4px 0' }}><span style={{ fontWeight: 'bold' }}>Experienced Companies:</span> {alumni.experiencedCompanies}</p>
                                <p style={{ margin: '4px 0' }}><span style={{ fontWeight: 'bold' }}>GitHub:</span> 
                                    <a href={alumni.github} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}> {alumni.github}</a>
                                </p>
                                <p style={{ margin: '4px 0' }}><span style={{ fontWeight: 'bold' }}>Message:</span> {alumni.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Our Top Alumni</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                            {/* Example top alumni cards can be added here */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Alumnisection;
