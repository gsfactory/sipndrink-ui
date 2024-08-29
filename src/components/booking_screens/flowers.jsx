function Flowers(props) {
    console.log('flowers', props);

    const handleToggle = (id) => {
        // console.log('img toggled', id);
        props.handleItemSelection(id, 'flowers', false);
    };

    return (  
        <div className="form-step celebra addonssec active">
        <h3> Add-Ons <span>(optional)</span></h3>
         <div className="slider_area">
            <h3>Roses</h3>
            <div className="slider_area left-section ">
            <div className="row box-container">
             {props.serviceMap['flowers'].map(decoration => (
                    <div className="col-md-4" key={decoration.id}>
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
         <div className="btn-group">
            <a className="btn btn-prev"
                onClick={props.prevStep}>Previous</a>
            <a className="btn btn-next" 
                onClick={props.nextStep}>Next</a>
         </div>
     </div>
    );
}

export default Flowers;