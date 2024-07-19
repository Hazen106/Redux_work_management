import React from 'react';
import './Popup.css'; // Tạo một file CSS để định dạng popup

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>x</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
