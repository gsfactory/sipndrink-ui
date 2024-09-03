import { useState } from "react";

function Cakes(props) {
    console.log('cakes', props);

    const s3Basepath = 'https://s3.amazonaws.com/client.limelox.com';

    // const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        props.setIsEggless(checked);
        // setIsChecked(checked);
        // console.log('Checkbox is now:', checked ? 'Checked' : 'Unchecked');
        // Perform additional actions based on checked state
    };

    const handleToggle = (id) => {
        props.handleItemSelection(id, 'cake', true);
    };



    return ( 
        <div className="form-step celebra cakes active">
        <h3> Cakes 
            <span>
                <input type="checkbox" id="switch" 
                    checked={props.isEggless} 
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="switch">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
            </span>
        </h3>
        
        <div className="slider_area left-section ">
            <div className="row box-container">
             {props.serviceMap['cake']
                .filter((value) => !props.isEggless ? true : value.is_eggless === true)
                .map(cake => (
                    <div className="col-md-4" key={cake.id}>
                        <div className={`imagearea ${props.cakeIds.includes(cake.id) ? 'active' : ''}`}>
                        <img 
                            onClick={() => handleToggle(cake.id)}
                            src={cake.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${cake.photo.data[0].attributes.url}` : `${s3Basepath}/${cake.photo.data[0].attributes.hash}${cake.photo.data[0].attributes.ext}`} />
                        <h6>{cake.name}</h6>
                        <h5>₹ {cake.price}</h5>
                        </div>
                    </div>
                ))}

                <p className="note-detls">Note: Decorations are not customizable. Please select predefined add-ons in the next windows.</p>
             </div>
         </div>
         <div className="btn-group">
            <a className="btn btn-prev"
                onClick={props.prevStep}>Previous</a>
            <a className="btn btn-next" 
                onClick={props.nextStep}>Next</a>
         </div>
     </div>
    );
}

export default Cakes;