import React from 'react';
import './winner.css'; 

const CustomPopup = ({ score1, score2, onClose }) => {
    console.log(score1, score2);
    return (
        <div className="popup-overlay">
            <div className="popup-card">
                <div className="popup-header">
                    <h2>{
                        score1 > score2 ? 'Player 1 wins!' : score1 === score2 ? 'It\'s a tie!':'Player 2 wins!' 
                      }
                    </h2>
                </div>
                <div className="popup-body">
                    <p>Thank you for playing the trivia game!</p>
                </div>
                <div className="popup-footer">
                    <button className="popup-close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomPopup;
