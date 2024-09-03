import Head from "next/head";

function SEO(props) {
    const title = props.title || "Enjoy private theaters and your personalized celebration";
    const description = props.description || "Private theaters for your personalized celebration";
    const keywords = props.keywords || "celebration, theaters";

    return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://s3.amazonaws.com/client.limelox.com/sipndrink/imgs/banner.jpg" />
        <meta property="og:url" content={process.env.NEXTAUTH_URL} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        {/* Add more SEO tags as needed */}
    </Head>
    );
}

export default SEO;