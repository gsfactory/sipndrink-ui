function Cakes(props) {
    console.log('cakes', props);

    const handleToggle = (id) => {
        // console.log('img toggled', id);
        props.handleItemSelection(id, 'cake', true);
    };

    return ( 
        <div className="form-step celebra cakes active">
        <h3> Cakes <span><input type="checkbox" id="switch" /><label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span></h3>
        <div className="slider_area left-section ">
            <div className="row box-container">
             {props.serviceMap['cake'].map(cake => (
                    <div className="col-md-4" key={cake.id}>
                        <div className={`imagearea ${props.cakeIds.includes(cake.id) ? 'active' : ''}`}>
                        <img 
                            onClick={() => handleToggle(cake.id)}
                            src={cake.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${cake.photo.data[0].attributes.url}` : cake.photo.data[0].attributes.url} />
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