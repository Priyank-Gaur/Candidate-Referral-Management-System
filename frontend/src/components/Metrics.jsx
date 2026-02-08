const Metrics = ({ candidates }) => {
    const stats = {
        total: candidates.length,
        breakdown: {
            Pending: 0,
            Reviewed: 0,
            Hired: 0,
            Rejected: 0
        }
    };

    candidates.forEach(candidate => {
        if (stats.breakdown.hasOwnProperty(candidate.status)) {
            stats.breakdown[candidate.status]++;
        }
    });

    return (

        <div className="metrics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="metric-card" style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center', color: '#2c3e50' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#7f8c8d' }}>Total</h3>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2c3e50' }}>{stats.total}</span>
            </div>
            {Object.entries(stats.breakdown).map(([status, count]) => (
                <div key={status} className="metric-card" style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center', color: '#2c3e50' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#7f8c8d' }}>{status}</h3>
                    <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2c3e50' }}>{count}</span>
                </div>
            ))}
        </div>
    );

};

export default Metrics;
