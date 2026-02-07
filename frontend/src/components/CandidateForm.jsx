import React, { useState } from 'react';
import { createCandidate } from '../services/api';

const CandidateForm = ({ onCandidateAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        resumeUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await createCandidate(formData);
            setSuccess('Candidate referred successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                jobTitle: '',
                resumeUrl: ''
            });
            if (onCandidateAdded) onCandidateAdded();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to refer candidate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="candidate-form-container">
            <h3>Refer a Candidate</h3>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter candidate name"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter candidate email"
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter phone number"
                    />
                </div>
                <div className="form-group">
                    <label>Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                        placeholder="Enter job title"
                    />
                </div>
                <div className="form-group">
                    <label>Resume URL (PDF)</label>
                    <input
                        type="url"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/resume.pdf"
                    />
                </div>
                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Submitting...' : 'Refer Candidate'}
                </button>
            </form>
        </div>
    );
};

export default CandidateForm;
