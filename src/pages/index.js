import api_client from '@/components/api/api_client';
import BaseModal from '@/components/booking_modal/base';
import Banner2 from '@/components/static/banner2';
import Banner3 from '@/components/static/banner3';
import Banner4 from '@/components/static/banner4';
import Banner5 from '@/components/static/banner5';
import Header from '@/components/layouts/header';
import Banner from '@/components/static/banner';
import Footer from '@/components/layouts/footer';
import SEO from '@/components/seo/seo';

export default function Home(props) {
  // console.log('modal', props.serviceMap);
    console.log('booking data', props);

  return (
    <>
      <SEO 
        title="Welcome to SipnScreen for booking private theaters and enjoy your celebration | SipnScreen"
        description="Welcome to SipnScreen for booking private theaters and enjoy your celebration"
      />

      <BaseModal 
        theatres={props.theatres}
        serviceMap={props.serviceMap}
        businessDetails={props.businessDetails}
      />

      <Header />
      <Banner />

      <main id="main">
          <Banner2 />
          <Banner3 />
          <Banner4 />
          <Banner5 />
          
      </main>

      <Footer />
    </>
  )
}

export async function getServerSideProps(ctx){
  console.log();
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
