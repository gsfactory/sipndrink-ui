function Photography(props) {
    console.log('photography', props);

    const handleToggle = (id) => {
        // console.log('img toggled', id);
        props.handleItemSelection(id, 'photography', false);
    };
    return (  
        <div class="form-step celebra addonssec active">
        <h3> Photography <span>(soft copies only)</span> <spam>Total: ₹0000</spam></h3>
         <div class="slider_area">
            <h3>Memories</h3>
            <div class="slider_area left-section ">
            <div class="row box-container">
                 
             {props.serviceMap['photography'].map(decoration => (
                    <div class="col-md-4">
                        <div className={`imagearea ${props.photoIds.includes(decoration.id) ? 'active' : ''}`}>
                            <img 
                            onClick={() => handleToggle(decoration.id)}
                            src={decoration.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${decoration.photo.data[0].attributes.url}` : decoration.photo.data[0].attributes.url} />
                        <h6>{decoration.name}</h6></div>
                    </div>
                ))}
                </div>
             </div>
         </div>
         <div class="btn-group">
            <a class="btn btn-prev"
                onClick={props.prevStep}>Previous</a>
            <a className="btn btn-next" 
                onClick={props.nextStep}>Next</a>
         </div>
     </div>
    );
}

export default Photography;