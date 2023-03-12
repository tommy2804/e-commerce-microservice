import '@/styles/globals.css';
import Header from '@/components/header';
import buildClient from '@/api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async ({ ctx, Component }) => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
  } else {
    pageProps = {};
  }
  // console.log(pageProps);
  return { pageProps, ...data };
};
// AppComponent.getInitialProps = (appContext) => {};

export default AppComponent;
