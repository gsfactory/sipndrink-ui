
// import OneColLayout from "@/components/layouts/one_col/layout";
import api_client from "@/components/api/api_client";
// import SimpleCardImageTop from "@/components/cards/simple_card_image_top";

const Test = (props) => {
    console.log('booking data', props);
    return (
    <div className="welcomearea">
        <div className="row">
            <div className="col-md-8">
                <div className="welcometext">

                    <SimpleGrid p="10px" spacing={4} minChildWidth="350px">
                        {props.theatres.data.map(theater => (
                            <SimpleCardImageTop key={theater.id}
                                theaterId={theater.id}
                                data={theater.attributes}
                                serviceMap={props.serviceMap}
                            />
                        ))}
                    </SimpleGrid>
                </div>
            </div>
        </div>
    </div>
    );
};

export async function getServerSideProps(ctx){
    const [theatres, services, serviceDetails] = await Promise.all([
        api_client.getTheatres(),
        api_client.getServices(),
        api_client.getServiceDetails(),
      ]);

    const serviceMap = {};
    for (let i=0; i<services.data.length; i++) {
        serviceMap[services.data[i].attributes.name] = [];
    }
    for (let i=0; i<serviceDetails.data.length; i++) {
        serviceMap[serviceDetails.data[i].attributes.service.data.attributes.name].push({
            id: serviceDetails.data[i].id,
            ...serviceDetails.data[i].attributes,
        });
    }

    // console.log(serviceMap);

    return {
        props:{
            theatres: theatres,
            serviceMap: serviceMap
        }
    }
}


export default Test;
