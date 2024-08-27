
function Welcome(props) {
    return ( 
        <div className="form-step firstwel active">
            <h3>Welcome</h3>
            <p>Moments and movies of togetherness with Sip N Screen.</p>
            <div className="input-group">
                <label>Pick Your Date</label>
                <input type="date" name="birth-date" id="birth-date"
                    defaultValue={props.bookingDate}
                    onChange={(e) => props.setBookingDate(e.target.value)}
                />
            </div>
            <div className="centerbtn">
                <a className="btn btn-next" 
                    onClick={props.nextStep} 
                    isdisabled={props.step!==1}>Next</a>
            </div>
        </div>
    );
}


export default Welcome;