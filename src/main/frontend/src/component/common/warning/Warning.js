import React from 'react';
import '../../../assets/scss/warning/warning.scss';

const Warning = ({ show, title, message, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>취소</button>
                    <button onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default Warning;
