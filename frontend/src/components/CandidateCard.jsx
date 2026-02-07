import React, { useState } from 'react';
import { updateStatus } from '../services/api';

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
            <div className="card-footer">
                <select value={status} onChange={handleStatusChange} disabled={loading}>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
        </div>
    );
};

export default CandidateCard;
