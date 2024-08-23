import './index.css'

const Mentor=props=>{
    const {mentorDetails}=props
    const {name,availability,areasOfExpertise,isPremium,id}=mentorDetails
    console.log(mentorDetails)


    return (
        <li className="mentor-card">
            <div className="mentor-card-header">
                <h3>name: {name}</h3>
                {isPremium===1 || isPremium === true ? <span className="premium-badge">Premium</span>:''}
            </div>
            <p>id:{id}</p>
            <div className="mentor-card-body">
                <div className="mentor-expertise">
                    <h4>Expertise:</h4>
                    <ul>
                        {areasOfExpertise.map((area, index) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </div>
                <div className="mentor-availability">
                    <h4>Availability:</h4>
                    {availability.map((slot, index) => (
                        <p className='day-time' key={index}>{`${slot.day}: ${slot.time}`}</p>
                    ))}
                </div>
            </div>
        </li>
    );
}


export default Mentor