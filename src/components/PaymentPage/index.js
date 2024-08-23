import React from 'react';

import { useLocation } from 'react-router-dom';

import './index.css'

const PaymentPage = () => {
    const location = useLocation();
    const { state } = location;
    const {
        selectedDuration,
        isPremiumSelected,
        mentorid,
        studentname,
        mentorName,
        selectedInterest,
        date,
        time,
        notes
    } = state;

    let amount;
    if (selectedDuration === "30 minutes") {
        amount = 2000;
    } else if (selectedDuration === "45 minutes") {
        amount = 3000;
    } else if (selectedDuration === "60 minutes") {
        amount = 4000;
    }

    if (isPremiumSelected === "yes") {
        amount += 500;
    }

    return (
        <div className="payment-container">
            <h1>Billing Details</h1>
            <p className="payment-detail"><strong>Student Name:</strong> {studentname}</p>
            <p className="payment-detail"><strong>Mentor ID:</strong> {mentorid}</p>
            <p className="payment-detail"><strong>Mentor Name:</strong> {mentorName}</p>
            <p className="payment-detail"><strong>Area of Interest:</strong> {selectedInterest}</p>
            <p className="payment-detail"><strong>Date:</strong> {date}</p>
            <p className="payment-detail"><strong>Time:</strong> {time}</p>
            <p className="payment-detail"><strong>Duration:</strong> {selectedDuration}</p>
            <p className="payment-detail"><strong>Premium Charge:</strong> {isPremiumSelected === "yes" ? "Yes (+500)" : "No"}</p>
            <p className="payment-detail payment-note"><strong>Additional Notes:</strong> {notes || "None"}</p>
            <h2 className="total-amount">Total Amount: ₹{amount}</h2>
        </div>
    );
};

export default PaymentPage;
