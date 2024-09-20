import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import SEO from '@/components/seo/seo';

export default function Menu(props) {
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
    <h1 className="text-center">Our Menu</h1>
    
    <div style={{ height: '100vh' }}>
      <embed
        src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/final_menu.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>

    </div>
    </div>
    </section>
          
      </main>

      <Footer />
    </>
  )
}
