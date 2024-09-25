import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import SEO from '@/components/seo/seo';
import api_client from '@/components/api/api_client';
import BaseModal from '@/components/booking_modal/base';

export default function PrivacyPolicy(props) {
  return (
    <>
      <SEO 
        title="Refund Policy | SipnScreen"
        description="Refund policy of SipnScreen"
      />

      <BaseModal 
        theatres={props.theatres}
        serviceMap={props.serviceMap}
        businessDetails={props.businessDetails}
      />

      <Header />

      <div className="container police">
        <div className="row">
            <div className="col-10 mx-auto p-4 m-4">
                <div className="content p-4 m-4 border rounded">
                        <h1 className='p-4'>Refund Policy</h1>

                        <ul>
                            <li>To confirm your booking, an advance payment of ₹1,000 is required. If you cancel your reservation at least 48 hours prior to the scheduled time, a partial refund of ₹750 will be processed. </li>
                            <li>Please note that cancellations made within 48 hours of the booking time are not eligible for a refund. Refunds are also not available for no-shows or late arrivals. </li>
                            <li>To cancel your booking, kindly reach out to us via call or WhatsApp at +91 94925 00886 as soon as possible. Refunds will be processed within 7 business days from the receipt of your cancellation request. </li>
                            <li>Should you have any questions or concerns regarding our refund policy, feel free to contact us. We are happy to assist!</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    <Footer />
    </>
  )
}

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

  let businessDetails = await api_client.getBusinessDetails();
  const dummyBusinessDetails = {
    data: [{
      attributes: {
        name: 'Sip N Screen',
        address: 'K 12/27, Logix Business Park, Hyderabad',
        mobile: '9871774731'
      }
    }]
  };
  if (!businessDetails || !businessDetails.data || businessDetails.data.length === 0) {
    businessDetails = dummyBusinessDetails;
  }
  // console.log(businessDetails.data[0]);

  // console.log(serviceMap);

  return {
      props:{
          theatres: theatres,
          serviceMap: serviceMap,
          businessDetails: businessDetails.data[0]
      }
  }
}
