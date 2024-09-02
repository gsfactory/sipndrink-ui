import React, { useState } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import api_client from '@/components/api/api_client';
import { getSession } from "next-auth/react";

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

  const handleSearch = async () => {
    // call api
    const data = await api_client.getBookings(fromDate, toDate);
    console.log(data);
    setBookings(data.data);
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1>Sip'n'Drink Bookings</h1>
      </header>

      <main style={styles.content}>
        
        {/* Date Filters and Search Button */}
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
              className="btn btn-primary w-100"
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
                  <td style={styles.td}>Click here</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx){
  const session = await getSession(ctx);
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    const today = moment().format("YYYY-MM-DD");
    const lastDay = moment().subtract(1, "days").format('YYYY-MM-DD');

    const data = await api_client.getBookings(lastDay, today);

    return {
        props:{
            today: today,
            lastDay: lastDay,
            data: data.data
        }
    }
}

export default App;