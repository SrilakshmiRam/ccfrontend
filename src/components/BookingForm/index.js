import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Mentor from '../Mentor';
import './index.css';

const areasOfInterests = [
    "Python", "Interview Prep", "Java", "JavaScript", "Career Advice",
    "PHP", "Backend Development", "Swift", "iOS Development", "Kotlin",
    "Android Development", "HTML/CSS", "Frontend Design", "Machine Learning",
    "Web Development", "Enterprise Applications", "Data Science", "Statistics",
    "C++", "Competitive Programming", "Ruby"
];

const durationOptions = ["30 minutes","45 minutes","60 minutes"];

const BookingForm = () => {
    const [mentorsList, setMentorsList] = useState([]);
    const [studentname, setStudentname] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [mentorid, setMentorid] = useState('');
    const [selectedInterest, setSelectedInterest] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const [error, setError] = useState('');
    const [isPremiumSelected, setIsPremiumSelected] = useState('no');

    const navigate = useNavigate();

    useEffect(() => {
        const getMentorsData = async () => {
            try {
                const response = await fetch('https://ccbackend-4t9t.onrender.com/mentors');
                const data = await response.json();
                if (response.ok) {
                    let updatedData = data.map(each => ({
                        name: each.name,
                        id: each.id,
                        isPremium: each.is_premium,
                        areasOfExpertise: JSON.parse(each.areas_of_expertise),
                        availability: JSON.parse(each.availability)
                    }));

                    if (selectedInterest !== '') {
                        updatedData = updatedData.filter(each => 
                            each.areasOfExpertise.some(interest => interest === selectedInterest)
                        );
                    }
                    setMentorsList(updatedData);
                }
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        };

        getMentorsData();
    }, [selectedInterest]);

    const onChangeSelectPremium = (event) => {
        const changeStatus = event.target.value;
        setIsPremiumSelected(changeStatus);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const bookingDetails = { studentname, mentorid, time, date, notes, selectedDuration };
        
        try {
            const response = await fetch('https://ccbackend-4t9t.onrender.com/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingDetails)
            });
            
            if (response.ok) {
                setBookingStatus('Booking created successfully');
                setError('');
                navigate('/payment', {
                    state: {
                        selectedDuration,
                        isPremiumSelected,
                        mentorid,
                        studentname,
                        mentorName,
                        selectedInterest,
                        date,
                        time,
                        notes
                    }
                });
            } else {
                const responseBody = await response.text();
                console.error('Response Error:', responseBody);
                setBookingStatus('');
                setError('Failed to create booking');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setBookingStatus('');
            setError('Error: ' + error.message);
        }
    };

    return (
        <div className="booking-form">
            <h2 className="booking-form-heading">Book a Session with Our Expert Mentors</h2>
            <ul className="mentor-list">
                {mentorsList.map(eachItem => (
                    <Mentor key={eachItem.id} mentorDetails={eachItem} />
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="booking-form-form">
                {/* Form Fields */}
                <div className="form-group">
                    <label htmlFor="name">Student Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={studentname}
                        onChange={e => setStudentname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="interest">Select Area of Interest:</label>
                    <select
                        id="interest"
                        value={selectedInterest}
                        onChange={e => setSelectedInterest(e.target.value)}
                        required
                    >
                        <option value="">--Choose an Area of Interest--</option>
                        {areasOfInterests.map(interest => (
                            <option key={interest} value={interest}>
                                {interest}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ispremium">Is Premium:</label>
                    <select id="ispremium" value={isPremiumSelected} onChange={onChangeSelectPremium}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="mentorid">Mentor Id:</label>
                    <input
                        type="text"
                        id="mentorid"
                        value={mentorid}
                        onChange={e => setMentorid(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mentorName">Mentor Name:</label>
                    <input
                        type="text"
                        id="mentorName"
                        value={mentorName}
                        onChange={e => setMentorName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Select Duration:</label>
                    <select
                        id="duration"
                        value={selectedDuration}
                        onChange={e => setSelectedDuration(e.target.value)}
                        required
                    >
                        {durationOptions.map(duration => (
                            <option key={duration} value={duration}>
                                {duration}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Additional Notes:</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Any special requests or notes for the mentor..."
                    />
                </div>
                <button type="submit" className="submit-button">Book Now</button>
                {bookingStatus && <p className="booking-status">{bookingStatus}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default BookingForm;
