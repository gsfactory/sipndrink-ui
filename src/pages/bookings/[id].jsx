import api_client from '@/components/api/api_client';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import SEO from '@/components/seo/seo';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Moment from 'react-moment';

function BookingDetail(props) {
    console.log('BookingDetail', props);
    const booking = props.booking.data.attributes;
    return (  
        <>
      <SEO 
        title="Detail of a booking | SipnScreen"
        description="Detail of a booking"
      />

      <Header />
      
      <main id="main">
      <section className="stats-counter thankyou">
      <div className="container">
        <div className="section-header">
          <h2>Booking Detail</h2>
          <div className="d-flex">
            <Link href="/bookings" className="ms-auto text-primary">
                All bookings
            </Link>
            </div>
          <p>
          {/* Hi {data.booking.customer_name}, Your booking is confirmed on {data.booking.date}. */}
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
                <td>Theatre</td>
                <td>{booking.theatre.data.attributes.name}</td>
            </tr>
            <tr>
                <td>Booking date</td>
                <td>
                    <Moment format="DD MMM YYYY">
                        {booking.date}
                    </Moment>
                </td>
            </tr>
            <tr>
                <td>Booking time</td>
                <td>
                    {booking.timeslot.data.attributes.start_time.slice(0, 5)} - {booking.timeslot.data.attributes.end_time.slice(0, 5)}
                </td>
            </tr>

            <tr>
                <td>Total Seats (inclusive of extra seats)</td>
                <td>{booking.total_seats_booked}</td>
            </tr>
            <tr>
                <td>Extra Seats</td>
                <td>{booking.extra_seat}</td>
            </tr>

            {props.bookingServices && 
                Object.entries(props.bookingServices?.data)
                .map(([key, v]) => {
                        return <tr key={key} className='table-info'>
                        <td>{v.attributes.service_detail.data.attributes.service.data.attributes.name}</td>
                        <td>{v.attributes.service_detail.data.attributes.name}</td>
                        </tr>
                    })
            }

            {booking.first_name && 
            <tr className='table-info'>
                <td>Celebration First Name</td>
                <td>{booking.first_name}</td>
            </tr> }
            {booking.second_name && 
            <tr>
                <td>Celebration Second Name</td>
                <td>{booking.second_name}</td>
            </tr> }

            <tr>
                <td>Customer Name</td>
                <td>{booking.customer_name}</td>
            </tr>
            <tr>
            <td>Customer Mobile</td>
                <td>{booking.customer_phone}</td>
            </tr>
            <tr>
            <td>Customer Email</td>
                <td>{booking.customer_email}</td>
            </tr>
            <tr>
                <td>Advance Paid</td>
                <td>{booking.price_paid}</td>
            </tr>
            <tr>
                <td>Total Amount</td>
                <td>{booking.total_price}</td>
            </tr>
            {/* <tr>
                <td>Customer Booked on</td>
                <td>
                    <Moment format="DD MMM YYYY HH:mm:ss">
                        {booking.createdAt}
                    </Moment>
                </td>
            </tr> */}
            
            </tbody>
            </table>
        </div>
    
      </div>
    </section>
      </main>

      <Footer />
    </>
    );
}

export default BookingDetail;

export async function getServerSideProps(context) {

    try {
        const session = await getSession(context);
        if (!session) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/user/login",
                },
            };
        }
        const bookingId = context.params?.id;
        const booking = await api_client.getBookingById(context.req, bookingId);
        const bookingServices = await api_client.getBookingServices(context.req, bookingId);
        console.log('bs', bookingServices);
        return {
            props: {
                // session,
                booking,
                bookingServices
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                statusCode: error.response ? error.response.status : 400,
            },
        };
    }
}