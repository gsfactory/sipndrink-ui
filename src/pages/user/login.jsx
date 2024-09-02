import { getCsrfToken, getSession } from "next-auth/react";

export default function SimpleCard(props) {
  console.log('login', props);


  return (
    <div class="login-container">
      <h2>Login</h2>
      <form 
        method="post"
        action="/api/auth/callback/credentials" 
        className="row g-3 needs-validation">
              
        <input
            name="csrfToken"
            type="hidden"
            defaultValue={props.csrfToken}
        />

        <div class="form-group">
          <input type="email" class="form-control" name="username" placeholder="Email" required />
        </div>

        <div class="form-group">
          <input type="password" class="form-control" name="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>

      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    console.log('debug 1');
    const session = await getSession(context);
    console.log('debug 2');
    if (session && session.user.name) {
      console.log('debug 3');
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    console.log('debug 4');
    return {
      props: {
        error: context.query && context.query.error ? context.query.error : null,
        csrfToken: await getCsrfToken(context),
        session,
        message: context.query.msg || null
      },
    };
  } catch (error) {
    console.log('debug 5');
    console.log("Error:", error);
    return {
      props: {
        statusCode: error.response ? error.response.status : 400,
      },
    };
  }
}