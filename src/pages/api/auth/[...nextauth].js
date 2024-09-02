import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
import apiClient from "../../../components/api/api_client";


export default NextAuth({
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                mobile: { label: "Mobile", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" },
                access_token: { label: "Password", type: "text" },
            },
            async authorize(credentials) {
                console.log("Authorizing...");
                try {
                    let result = null;
                    console.log("Login with old creds", credentials);
                    const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
                        {
                            identifier: credentials.email,
                            password: credentials.password,
                        }
                    );
                    result = data;
                    result['role'] = 'admin';
                    return result;
                    
                } catch (e) {
                    console.log("Gorav error hai ye");
                    console.log(apiClient.getErrorString(e));
                    throw new Error('Check your credentials, or you are not allowed to login');
                }
            },
        })
    ],
    callbacks: {
        redirect: async ({ url, baseUrl }) => {
            return '/bookings';
        },
        // Getting the JWT token from API response
        jwt: async ({ token, user }) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.maxAge = parseInt(`${process.env.JWT_EXPIRE_LIMIT}`);
                token.jwt = user.jwt;
                token.id = user.user.id;
                token.name = user.user.username;
                token.email = user.user.email;
                token.role = user.role?.name,
                token.companyId = user.company?.id,
                token.company = user.company?.name
            }
            return Promise.resolve(token);
        },

        session: async ({ session, token }) => {
            session.jwt = token.jwt;
            session.id = token.id;
            session.role = token.role;
            session.companyId = token.companyId,
            session.company = token.company
            return Promise.resolve(session);
        },
    },
    secret: process.env.JWT_SECRET || "test",
    jwt: {
        secret: process.env.JWT_SECRET || "test",
        encryption: true,
    },
    pages: {
        signIn: "/user/login",
        error: "/user/login",
    },
});