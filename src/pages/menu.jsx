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

    <a 
      href="/final_menu.pdf" 
      target="_blank" className='text-primary'
      rel="noopener noreferrer"
    >
      Click to Open menu in new tab
    </a>

    </div>
    </div>
    </section>
          
      </main>

      <Footer />
    </>
  )
}
