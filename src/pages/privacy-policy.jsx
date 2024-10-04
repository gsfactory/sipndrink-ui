import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import SEO from '@/components/seo/seo';
import BaseModal from '@/components/booking_modal/base';
import api_client from '@/components/api/api_client';

export default function PrivacyPolicy(props) {
  return (
    <>
      <SEO 
        title="Privacy Policy | SipnScreen"
        description="Privacy policy of SipnScreen"
      />

  <BaseModal 
        theatres={props.theatres}
        serviceMap={props.serviceMap}
        businessDetails={props.businessDetails}
      />

      <Header />

      <main id="main">
            <div className="container">
            <div class="row justify-content-center">
      <div class="col-10">
        <div class="content p-3 border rounded">
    <div className="police">
      
      <h1 className='p-4'>Terms & Conditions and Privacy Policy</h1>

      <h2>Important Instructions</h2>
      <ol>
        <li>Smoking and Consumption of Alcohol is strictly prohibited inside the Theatres.</li>
        <li>You need to use your own OTT accounts to watch the content.</li>
        <li>Party poppers, foam and alcoholic/ non-alcoholic champagnes are not allowed inside the theatres, considering the sensitivity of the Theatres.</li>
        <li>Outside food is strictly prohibited, considering the sensitivity of carpets and recliners inside the Theatres.</li>
        <li>We charge full for children above 7 years and half for those who are between 3-7 years</li>
        <li>Rights of admission is reserved by the Management.</li>
        <li>In case of any damages, the customer is liable to bear the costs of the same.</li>
        <li>For the safety of all, any kind of fire, matches, smoking, birthday candles etc are strictly prohibited  to be used by customers.</li>
        <li>All decorations are given on rental basis only and can’t be destroyed or taken away by customers.</li>

      </ol>

      <p>
      At Sip n Screen, accessible from www.sipnscreen.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that Sip n Screen collects, records, and how we use it.
      If you have additional questions or need more information about our Privacy Policy, feel free to contact us via WhatsApp at +91 94925 00886.
      This Privacy Policy applies to online activities and is valid for visitors to our website regarding the information shared and/or collected at Sip n Screen. This policy does not apply to any information collected offline or through channels other than this website.
      </p>

      <h2 className='pt-4'>Consent</h2>
      <p>By using our website, you consent to our Privacy Policy and agree to its terms.</p>
      
      <h2 className='pt-4'>Information We Collect</h2>
      <p>The personal information you are asked to provide, and the reasons why it is needed, will be made clear at the time of collection.</p>
      <p>If you contact us directly, we may collect additional information, such as your name, email address, phone number, and any other details you choose to share. </p>
      <p>When you register for an account or book services at Sip n Screen, we may request your contact details, including your name, address, email, and telephone number.</p>
      
      <h2 className='pt-4'>How We Use Your Information</h2>

      <p>We use the information we collect for a variety of purposes, including:</p>
      <ul>
        <li>To provide and maintain our website and services</li>
        <li>To improve and personalize your experience at Sip n Screen</li>
        <li>To understand how visitors interact with our website</li>
        <li>To develop new services and offerings</li>
        <li>To communicate with you for customer service, updates, or promotional purposes</li>
        <li>To send you email notifications</li>
        <li>To prevent fraudulent activities</li>
      </ul>

      <h2 className='pt-4'>Log Files</h2>
      <p>Sip n Screen follows a standard procedure for using log files. These log visitors when they visit websites. Information collected in log files includes IP addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. This data is not linked to any personally identifiable information and is used for site analytics and tracking user behaviour.</p>

      <h2 className='pt-4'>Cookies and Web Beacons</h2>
      <p>Sip n Screen uses cookies to store information, including visitors' preferences and the pages accessed on the website. This information helps optimize user experience by customizing our web content based on visitors' browser type or other information.
      You can disable cookies through your browser settings. However, doing so may limit your ability to use certain features on our site.</p>

      <h2 className='pt-4'>Third-Party Services</h2>
      <p>We may partner with third-party service providers, such as Google and Meta, who use cookies, JavaScript, or web beacons to help deliver advertisements and measure their effectiveness. Sip n Screen does not control the cookies used by these third-party providers. For detailed information on their practices, please consult their respective Privacy Policies.</p>

      <h2 className='pt-4'>Data Protection Rights (GDPR & CCPA)</h2>
      
      <p>We are committed to protecting your data. Depending on your location, you have specific rights under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA):</p>
      <ul>
        <li>The right to access personal data we hold about you</li>
        <li>The right to correct inaccuracies in your personal data</li>
        <li>The right to request deletion of your personal data under certain conditions</li>
        <li>The right to restrict how we process your data</li>
        <li>The right to object to data processing</li>
        <li>The right to data portability</li>
      </ul>

      <p>If you wish to exercise any of these rights, please contact us. We have one month to respond to your request.</p>

      <h2 className='pt-4'>Children’s Privacy</h2>
      <p>Sip n Screen does not knowingly collect personal information from children under the age of 13. We encourage parents and guardians to monitor and guide their children's online activity. If you believe your child has provided us with personal information, please contact us immediately, and we will take steps to remove that information from our records.</p>

      <h2 className='pt-4'>Updates to This Privacy Policy</h2>
      <p>Sip n Screen reserves the right to update this Privacy Policy as needed. We recommend reviewing this page periodically to stay informed about any changes. Any updates will take effect once posted on this page.</p>

      <h2 className='pt-4'>Contact Us</h2>
      <p>If you have any questions or suggestions about our Privacy Policy, feel free to contact us at given below coordinates: </p>
      <p>Manager - Sip n Screen,  </p>
      <p>3rd floor, Sai Krishna Capital, Gopal Nagar, Hafeezpet, Hyderabad, Telangana- 500049</p>
      <p>Call or WhatsApp at +91 94925 00886</p>

      <p>Legal Entity Name: H & S Enterprises</p>
      <p>GST Number: 36AAQFH9091L1ZI</p>
      <p>PAN Details: AAQFH9091L</p>
    
    </div></div></div></div>
    </div>
          
      </main>

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
