import React from 'react';
import './styles.css' ;

function GenericCard({ title, content, onClick, onDetailsClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <div>{content}</div>
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          marginTop: '8px'
        }}
        onClick={onDetailsClick}
      >
        Details
      </button>
    </div>
  );
}


export default GenericCard;
