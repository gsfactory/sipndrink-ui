import { useState } from "react";
import MyImage from "../utils/image";

function Cakes(props) {
    // console.log('cakes', props);

    const s3Basepath = 'https://s3.amazonaws.com/client.limelox.com/sipndrink';

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        props.setIsEggless(checked);
    };

    const handleToggle = (id) => {
        props.handleItemSelection(id, 'cake', true);
    };

    return ( 
        <div className="form-step celebra cakes active">
        <h3> Cakes </h3>
        
        <div className="slider_area left-section ">
            
        <p className="note-detls text-white text-left">
        All Cakes are Eggless. Images are for demonstration purposes only. Actual cake may look different - Cake size- 1 kg

            </p>

            <div className="row box-container">
             {props.serviceMap['cake']
                .filter((value) => !props.isEggless ? true : value.is_eggless === true)
                .map(cake => (
                    <div className="col-md-4 col-sm-12" key={cake.id}>
                        <div className={`imagearea ${props.cakeIds.includes(cake.id) ? 'active' : ''}`}>
                        <MyImage 
                            onClick={() => handleToggle(cake.id)}
                            src={cake.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${cake.photo.data[0].attributes.url}` : `${s3Basepath}/${cake.photo.data[0].attributes.hash}${cake.photo.data[0].attributes.ext}`} />
                        <h6>{cake.name}</h6>
                        <h5>₹ {cake.price}</h5>
                        </div>
                    </div>
                ))}
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