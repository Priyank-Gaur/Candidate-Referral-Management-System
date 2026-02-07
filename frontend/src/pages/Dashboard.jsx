import React, { useState, useEffect } from 'react';
import { getCandidates } from '../services/api';
import CandidateCard from '../components/CandidateCard';
import CandidateForm from '../components/CandidateForm';

const Dashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Candidate Referral Dashboard</h1>
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
            )}
        </div>
    );
};

export default Dashboard;
