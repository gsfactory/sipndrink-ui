import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import SEO from "@/components/seo/seo";
import { getCsrfToken, getSession } from "next-auth/react";
import Head from "next/head";

export default function SimpleCard(props) {
  // console.log('login', props);

  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
    },
    loginForm: {
      width: '100%',
      maxWidth: '400px',
      padding: '30px',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <>
    <SEO 
      title="Login to SipnScreen"
      description="Login to SipnScreen"
    />
    <Header />
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
    style={{ minHeight: '80vh' }}
    >
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form method="post" action="/api/auth/callback/credentials">
        
          <input
              name="csrfToken"
              type="hidden"
              defaultValue={props.csrfToken}
          />
        
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email" required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password" required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>

    <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    if (session && session.user.name) {
      return {
        redirect: {
          permanent: false,
          destination: "/bookings",
        },
      };
    }

    return {
      props: {
        error: context.query && context.query.error ? context.query.error : null,
        csrfToken: await getCsrfToken(context),
        session,
        message: context.query.msg || null
      },
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      props: {
        statusCode: error.response ? error.response.status : 400,
      },
    };
  }
}