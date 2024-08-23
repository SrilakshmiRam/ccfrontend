import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import './index.css'

const Students= () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const navigate=useNavigate()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('https://ccbackend-4t9t.onrender.com/bookings');
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    const updatedData=data.map(each=>({
                        studentName:each.student_name,
                        id:each.id,
                        bookingDate:each.booking_date,
                        bookingTime:each.booking_time,
                        duration:each.duration,
                        mentorId:each.mentor_id,
                        notes:each.notes
                    }))
                    setBookings(updatedData);
                } else {
                    setError('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Error: ' + error.message);
            }
        };

        fetchBookings();
    }, []);


    const onClickBook=()=>{
        navigate('/bookings')
    }

    return (
        <>
        <div className="student-page">
            <h1>Unlock Your Learning Journey: Book Your Session Now!</h1>
            <button className='bookBtn' onClick={onClickBook}>Book 1X1</button>
            <h1>Booking Details</h1>
            {error && <p className="error-message">{error}</p>}
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Mentor ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.studentName}</td>
                            <td>{booking.mentorId}</td>
                            <td>{booking.bookingDate}</td>
                            <td>{booking.bookingTime}</td>
                            <td>{booking.duration}</td>
                            <td>{booking.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="booking-cards-container">
        {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
                <h2>Booking for {booking.studentName}</h2>
                <p><span>Mentor ID:</span> {booking.mentorId}</p>
                <p><span>Date:</span> {booking.bookingDate}</p>
                <p><span>Time:</span> {booking.bookingTime}</p>
                <p><span>Duration:</span> {booking.duration}</p>
                <p><span>Notes:</span> {booking.notes}</p>
            </div>
        ))}
    </div>
    </>
    );
};

export default Students;
