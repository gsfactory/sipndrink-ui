import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import api_client from '@/components/api/api_client';
import { getSession } from "next-auth/react";
import Link from 'next/link';
import Footer from '@/components/layouts/footer';
import Head from 'next/head';
import Header from '@/components/layouts/header';
import SEO from '@/components/seo/seo';

const App = (props) => {

  const [bookings, setBookings] = useState(props.data || []);
  const [fromDate, setFromDate] = useState(props.lastDay);
  const [toDate, setToDate] = useState(props.today);

  // Styles
  const styles = {
    body: {
      margin: 0,
      height: '100%',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    content: {
      flex: 1,
      padding: '20px',
    },
    header: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
    },
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
    },
    input: {
      marginRight: '10px',
    },
    button: {
      marginTop: '25px',
    },
  };

  useEffect(() => {
    handleSearch();
  }, [fromDate, toDate]);

  const handleSearch = async () => {
    // call api
    console.log("searching...");
    const data = await api_client.getBookings(null, fromDate, toDate);
    // console.log(data);
    setBookings(data.data);
  };

  const fetchBookings = async (whichTime) => {
    console.log("Fetching booking for", whichTime);
    if (whichTime === "today") {
      setFromDate(props.today);
      setToDate(props.today);
    } else if (whichTime === "tomorrow") {
      const dt = moment().add(1, "days").format('YYYY-MM-DD');
      setFromDate(dt);
      setToDate(dt);
    } else if (whichTime === "yesterday") {
      const dt = moment().subtract(1, "days").format('YYYY-MM-DD');
      setFromDate(dt);
      setToDate(dt);
    } else if (whichTime === "last 7") {
      const dt = moment().subtract(7, "days").format('YYYY-MM-DD');
      setFromDate(dt);
      setToDate(props.today);
    } else if (whichTime === "next week") {
      const dt = moment().add(7, "days").format('YYYY-MM-DD');
      setFromDate(props.today);
      setToDate(dt);
    } else if (whichTime === "next month") {
      const dt = moment().add(1, "month").format('YYYY-MM-DD');
      setFromDate(props.today);
      setToDate(dt);
    }
  }

  return (
    <>
      <SEO 
        title="List of bookings | SipnScreen"
        description="List of bookings"
      />

      <Header />
      <div style={styles.wrapper}>
      <div className="p-3 text-center">
        <h1>Sip'n'Screen Bookings</h1>
      </div>

      <main style={styles.content}>
        
        {/* Date Filters and Search Button */}
        <div className="row mb-4">
          <div className="col-md-4">
              <Link href="#" onClick={() => fetchBookings('today')}>
                <span className="badge badge-secondary">Today bookings</span>
              </Link> <br />
              <Link href="#" onClick={() => fetchBookings('tomorrow')}>
                <span className="badge badge-secondary">Tomorrow bookings</span>
              </Link> <br />
              <Link href="#" onClick={() => fetchBookings('yesterday')}>
                <span className="badge badge-secondary">Yesterday bookings</span>
              </Link> <br />
          </div>
          <div className="col-md-4">
              <Link href="#" onClick={() => fetchBookings('last 7')}>
                <span className="badge badge-secondary">Last 7 days</span>
              </Link> <br />
              <Link href="#" onClick={() => fetchBookings('next week')}>
                <span className="badge badge-secondary">Next Week bookings</span>
              </Link> <br />
              <Link href="#" onClick={() => fetchBookings('next month')}>
                <span className="badge badge-secondary">Next Month bookings</span>
              </Link>
            </div>
          </div>
        <div className="row mb-4">
          <div className="col-md-4">
            <label htmlFor="fromDate" className="form-label">From Date</label>
            <input
              type="date"
              id="fromDate"
              style={styles.input}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="toDate" className="form-label">To Date</label>
            <input
              type="date"
              id="toDate"
              style={styles.input}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button
              style={styles.button}
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="table-responsive">
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Theater</th>
                <th style={styles.th}>Customer Name</th>
                <th style={styles.th}>Customer Mobile</th>
                <th style={styles.th}>Booking done at</th>
                <th style={styles.th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(item => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.attributes.date}</td>
                  <td style={styles.td}>{item.attributes.theatre.data.attributes.name}</td>
                  <td style={styles.td}>{item.attributes.customer_name}</td>
                  <td style={styles.td}>{item.attributes.customer_phone}</td>
                  <td style={styles.td}>
                    <Moment format="YYYY/MM/DD HH:mm:ss">
                        {item.attributes.createdAt}
                    </Moment>
                    </td>
                  <td style={styles.td}>
                    <Link 
                        href={`/bookings/${item.id}`} className="text-primary">
                        click here
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>

      <Footer />
    </>
  );
};

export async function getServerSideProps(ctx){
  const session = await getSession(ctx);
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/user/login",
        },
      };
    }

    const today = moment().format("YYYY-MM-DD");

    const data = await api_client.getBookings(ctx.req, today, today);

    return {
        props:{
            today: today,
            lastDay: today,
            data: data.data
        }
    }
}

export default App;