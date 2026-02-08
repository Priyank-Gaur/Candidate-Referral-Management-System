import React, { useState } from 'react';
import { updateStatus, deleteCandidate } from '../services/api';

const CandidateCard = ({ candidate, onStatusUpdate }) => {
    const [status, setStatus] = useState(candidate.status);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setLoading(true);
        try {
            await updateStatus(candidate._id, newStatus);
            setStatus(newStatus);
            if (onStatusUpdate) onStatusUpdate();
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            setLoading(true);
            try {
                await deleteCandidate(candidate._id);
                if (onStatusUpdate) onStatusUpdate();
            } catch (error) {
                console.error('Failed to delete candidate', error);
                alert('Failed to delete candidate');
            } finally {
                setLoading(false);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#f39c12';
            case 'Reviewed': return '#3498db';
            case 'Hired': return '#27ae60';
            case 'Rejected': return '#c0392b';
            default: return '#7f8c8d';
        }
    };

    return (
        <div className="candidate-card" style={{ borderLeft: `5px solid ${getStatusColor(status)}` }}>
            <div className="card-header">
                <h4>{candidate.name}</h4>
                <span className="status-badge" style={{ backgroundColor: getStatusColor(status) }}>
                    {status}
                </span>
            </div>
            <div className="card-body">
                <p><strong>Job Title:</strong> {candidate.jobTitle}</p>
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Phone:</strong> {candidate.phone}</p>
                {candidate.resumeUrl && (
                    <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-link">
                        View Resume
                    </a>
                )}
            </div>
            <div className="card-footer" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select value={status} onChange={handleStatusChange} disabled={loading} style={{ flex: 1 }}>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button 
                    onClick={handleDelete} 
                    disabled={loading}
                    className="delete-btn"
                    style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Delete Candidate"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CandidateCard;
