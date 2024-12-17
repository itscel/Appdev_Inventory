// src/Report/RecentActivities.js
import React from 'react';
import './RecentActivities.css'; // Optional: Add custom styling for this component

const RecentActivities = ({ activities }) => {
    return (
        <div className="dashboard-activities">
            <h2>Recent Activities</h2>
            <ul>
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))
                ) : (
                    <li>No recent activities</li>
                )}
            </ul>
        </div>
    );
};

export default RecentActivities;
