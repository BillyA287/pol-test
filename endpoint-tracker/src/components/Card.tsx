import React from 'react';
import type { EndpointData } from '../../shared-types/types';
import './Card.css';

type CardProps = Omit<EndpointData, 'status'> & {
  status?: number;
  isExpanded: boolean;
  onExpand: () => void;
};

const Card: React.FC<CardProps> = ({ url, status, data, error, isExpanded, onExpand }) => {
  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header">
        <h3>{url}</h3>
        <p>
          Status:{' '}
          <span className={status === 200 ? 'status-ok' : 'status-error'}>
            {status || 'N/A'}
          </span>
        </p>
        {error && <p className="error">{error}</p>}
        <button onClick={onExpand}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
      {isExpanded && !error && (
        <div className="card-details">
          {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p className="error">No data available for this endpoint.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;