import { useState } from "react";

function Celebrations(props) {
    console.log('celebrations', props);
    const s3Basepath = 'https://s3.amazonaws.com/client.limelox.com/sipndrink';

    const [error, setError] = useState("")

    const decorationNamesMap = {};
    for (let i=0; i<props.serviceMap['decorations'].length; i++) {
        const deco = props.serviceMap['decorations'][i];
        decorationNamesMap[deco.id] = {
            first_text: deco.first_text_name || "Enter Name",
            second_text: deco.second_text_name
        };
    }
    console.log('decorationNamesMap', decorationNamesMap);

    const handleNext = () => {
        if (props.decorationIds && props.decorationIds.length > 0) {
            if (!props.firstName) {
                setError("Enter first name");
                return;
            }
            if (decorationNamesMap[props.decorationIds[0]].second_text) {
                if (!props.secondName) {
                    setError("Enter second name");
                    return;
                }
            }
        }
        props.nextStep();
    }
    const handleToggle = (id) => {
        // console.log('img toggled', id);
        props.handleItemSelection(id, 'decorations', false);
    };

    return ( 
        <div className="form-step celebra active">
            <h3> Celebration <span>(optional)</span></h3>
            <div className="row">
                <div className="col-md-8">
                    <div className="slider_area left-section ">
                    <div className="row box-container">
                        {props.serviceMap['decorations'].map(decoration => (
                            <div className="col-md-6" key={decoration.id}>
                                <div className={`imagearea ${props.decorationIds.includes(decoration.id) ? 'active' : ''}`}>
                                    <img 
                                    onClick={() => handleToggle(decoration.id)}
                                    src={decoration.photo.data[0].attributes.url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${decoration.photo.data[0].attributes.url}` : `${s3Basepath}/${decoration.photo.data[0].attributes.hash}${decoration.photo.data[0].attributes.ext}`} />
                                <h6>{decoration.name}</h6>
                                <h5>₹ {decoration.price}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                    </div>
                    <div className="col-md-4">
                        {props.decorationIds && props.decorationIds.length > 0 && 
                        <div className="celebration_det">
                            <h2>Please enter the following details</h2>
                            {error && 
                                <div className="text-danger">
                                    {error}
                                </div>
                            }
                            <div className="input-group">
                                <input type="text" 
                                    placeholder={decorationNamesMap[props.decorationIds[0]].first_text} 
                                    value={props.firstName}
                                    onChange={(event) => props.setFirstName(event.target.value)}
                                />
                            </div>
                            {decorationNamesMap[props.decorationIds[0]].second_text && (
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder={decorationNamesMap[props.decorationIds[0]].second_text}
                                        value={props.secondName}
                                        onChange={(event) => props.setSecondName(event.target.value)}
                                    />
                                </div>
                            )}
                            <p className="note-detls">Note: Decorations are not customizable. Please select predefined add-ons in the next windows.</p>
                      </div>
                    }
                    </div>
            </div>
            <div className="btn-group">
                <a className="btn btn-prev"
                    onClick={props.prevStep}>Previous</a>
                <a className="btn btn-next" 
                    onClick={handleNext}>Next</a>
            </div>
        </div>
    );
}

export default Celebrations;