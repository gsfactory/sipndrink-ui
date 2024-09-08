import MyImage from "../utils/image";

function Photography(props) {
    console.log('photography', props);
    const s3Basepath = 'https://s3.amazonaws.com/client.limelox.com/sipndrink';

    const handleToggle = (id) => {
        // console.log('img toggled', id);
        props.handleItemSelection(id, 'photography', false);
    };
    return (  
        <div className="form-step celebra addonssec active">
        <h3> Photography <span>(soft copies only)</span> <spam>Total: ₹0000</spam></h3>
         <div className="slider_area">
            <h3>Memories</h3>
            <div className="slider_area left-section ">
            <div className="row box-container">
                 
             {props.serviceMap['photography'].map(decoration => (
                    <div className="col-md-4" key={decoration.id}>
                        <div className={`imagearea ${props.photoIds.includes(decoration.id) ? 'active' : ''}`}>
                            {/* <img 
                                onClick={() => handleToggle(decoration.id)}
                                src={decoration.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${decoration.photo.data[0].attributes.url}` : `${s3Basepath}/${decoration.photo.data[0].attributes.hash}${decoration.photo.data[0].attributes.ext}`} /> */}
                            <MyImage 
                                onClick={() => handleToggle(decoration.id)}
                                height="240"
                                src={decoration.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${decoration.photo.data[0].attributes.url}` : `${s3Basepath}/${decoration.photo.data[0].attributes.hash}${decoration.photo.data[0].attributes.ext}`} />
                        <h6>{decoration.name}</h6>
                        <h5>₹ {decoration.price}</h5>
                    </div>
                    </div>
                ))}
                </div>
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

export default Photography;