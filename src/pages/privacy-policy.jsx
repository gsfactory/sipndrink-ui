import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import SEO from '@/components/seo/seo';

export default function PrivacyPolicy(props) {
  return (
    <>
      <SEO 
        title="Privacy Policy | SipnScreen"
        description="Privacy policy of SipnScreen"
      />

      <Header />

      <main id="main">
      <section id="stats-counter" className="stats-counter">
            <div className="container" data-aos="fade-up">
  <div className="section-header">
    <h1 className="text-center">Privacy Policy</h1>

    <p>Where Cinema Meets Culinary Delight</p>
    <p>
      At Sip n Screen, it's all about movies, coffee, and great vibes. Every film hits harder, every bite tastes
      better, and every moment counts. Your new favorite hangout awaits!
    </p>
    </div>
    </div>
    </section>
          
      </main>

      <Footer />
    </>
  )
}
