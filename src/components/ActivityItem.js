import React from 'react';

function ActivityItem({ imgSrc, title, description }) {
    return (
        <div className="activity-item">
            <img src={imgSrc} alt={title} />
            <div>
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
        </div>
    );
}

export default ActivityItem;
