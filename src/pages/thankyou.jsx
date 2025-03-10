import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { useData } from '../context/sip_context';
import SEO from '@/components/seo/seo';

function ThankYou(props) {
    const router = useRouter();
    const { data } = useData();
    // const services = ['decorations', 'cake', 'extra-decorations', 'flowers', 'photography'];
    console.log('thankyou', data);

    useEffect(() => {
      // Scroll to the top of the page on load
      window.scrollTo(0, 0);
      // Optionally ensure body scroll is enabled
      document.body.style.overflow = 'auto';

        // This will only run on the client side
        if (!data) {
            console.log('Initiate booking first!');
            router.push('/');
        }
      }, [router]);

    const extra_seats = data != null && data.booking.total_seats_booked > data.theater.attributes.num_seats ? data.booking.total_seats_booked-data.theater.attributes.num_seats : 0;

    if (!data) {
        return <>Loading...</>;
    }
    return (
    <>
      <SEO 
        title="Thank you for your booking private theater | SipnScreen"
        description="Thank you for your booking private theater"
      />

    <main id="main">
    <section className="stats-counter thankyou">
      <div className="container">
        <div className="section-header">
          <h2>Thank You</h2>
          <p>
          Hi {data.booking.customer_name}, Your booking is confirmed on {data.booking.date}.
          <br/>Checkout the details
          </p>
          
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Theatre ({data.theater.attributes.name})</td>
                <td>{data.theater.attributes.pricing_per_slot}</td>
            </tr>
            <tr>
                <td>Total Seats booked - {data.result.attributes.total_seats_booked}</td>
                <td></td>
            </tr>
            {extra_seats > 0 && 
            <tr>
                <td>Extra Seats booked - {extra_seats}</td>
                <td>{extra_seats * data.theater.attributes.extra_seat_cost}</td>
            </tr>
            }
            {Object.entries(data.serviceMap['cake'])
              .filter(([key, value]) => data.services.includes(value.id))
              .map(([key, value]) => {
                    return <tr key={key}>
                      <td>cake - {value.name}</td>
                      <td>{value.price}</td>
                    </tr>
                  })
            }
            {Object.entries(data.serviceMap['decorations'])
              .filter(([key, value]) => data.services.includes(value.id))
              .map(([key, value]) => {
                    return <tr key={key}>
                      <td>Celebration - {value.name}</td>
                      <td>{value.price}</td>
                    </tr>
                  })
            }
            {Object.entries(data.serviceMap['extra-decorations'])
              .filter(([key, value]) => data.services.includes(value.id))
              .map(([key, value]) => {
                    return <tr key={key}>
                      <td>Addon - {value.name}</td>
                      <td>{value.price}</td>
                    </tr>
                  })
            }
            {Object.entries(data.serviceMap['flowers'])
              .filter(([key, value]) => data.services.includes(value.id))
              .map(([key, value]) => {
                    return <tr key={key}>
                      <td>Flowers - {value.name}</td>
                      <td>{value.price}</td>
                    </tr>
                  })
            }
            {Object.entries(data.serviceMap['photography'])
              .filter(([key, value]) => data.services.includes(value.id))
              .map(([key, value]) => {
                    return <tr key={key}>
                      <td>Photography - {value.name}</td>
                      <td>{value.price}</td>
                    </tr>
                  })
            }

            <tr>
                <td>Discount</td>
                <td>{data.booking.discount}</td>
            </tr>
            <tr className='table-primary'>
                <td>Total Price</td>
                <td>{data.booking.total_price}</td>
            </tr>
            <tr className='table-success'>
                <td>Advance Paid</td>
                <td>{data.booking.price_paid}</td>
            </tr>
            <tr className='table-info'>
                <td>Balance</td>
                <td>{data.booking.total_price - data.booking.price_paid}</td>
            </tr>
            </tbody>
            </table>
        </div>
    
      </div>
    </section>
    </main>
    </>
    );
}

export default ThankYou;