import buildClient from '../api/build-client';

// current user available in landing page since whatever is returned from getInitialProp becomes available as prop
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// .getInitialProps on Landing page gets called from __app.js's getInitialProps for our set up
LandingPage.getInitialProps = async context => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
