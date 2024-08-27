function Flowers(props) {
    console.log('flowers', props);

    const handleToggle = (id) => {
        // console.log('img toggled', id);
        props.handleItemSelection(id, 'flowers', false);
    };

    return (  
        <div class="form-step celebra addonssec active">
        <h3> Add-Ons <span>(optional)</span> <spam>Total: ₹0000</spam></h3>
         <div class="slider_area">
            <h3>Roses</h3>
            <div class="slider_area left-section ">
            <div class="row box-container">
             {props.serviceMap['flowers'].map(decoration => (
                    <div class="col-md-4">
                        <div className={`imagearea ${props.flowerIds.includes(decoration.id) ? 'active' : ''}`}>
                            <img 
                            onClick={() => handleToggle(decoration.id)}
                            src={decoration.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${decoration.photo.data[0].attributes.url}` : decoration.photo.data[0].attributes.url} />
                        <h6>{decoration.name}</h6>
                        <h5>₹ {decoration.price}</h5>
                        </div>
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

export default Flowers;