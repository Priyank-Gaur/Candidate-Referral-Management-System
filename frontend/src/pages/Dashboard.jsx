import React, { useState, useEffect, useContext } from 'react';
import { getCandidates } from '../services/api';
import CandidateCard from '../components/CandidateCard';
import CandidateForm from '../components/CandidateForm';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Metrics from '../components/Metrics';

const Dashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const data = await getCandidates();
            setCandidates(data);
            setFilteredCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    useEffect(() => {
        const results = candidates.filter(candidate =>
            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCandidates(results);
    }, [searchTerm, candidates]);

    const handleCandidateAdded = () => {
        fetchCandidates();
        setShowForm(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>Candidate Referral Dashboard</h1>
                    <span className="user-welcome">Welcome, {user?.name}</span>
                </div>
                <div className="header-actions">
                    <input
                        type="text"
                        placeholder="Search by name, job, or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                    <button 
                        className="add-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Close Form' : 'Add Candidate'}
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CandidateForm onCandidateAdded={handleCandidateAdded} />
                        <button className="close-modal-btn" onClick={() => setShowForm(false)}>X</button>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading candidates...</p>
            ) : (
                <>
                    <Metrics refreshTrigger={candidates} />
                    <div className="candidates-grid">
                        {filteredCandidates.length > 0 ? (
                            filteredCandidates.map(candidate => (
                                <CandidateCard 
                                    key={candidate._id} 
                                    candidate={candidate} 
                                    onStatusUpdate={fetchCandidates}
                                />
                            ))
                        ) : (
                            <p className="no-results">No candidates found.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
