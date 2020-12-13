import { useCallback, useState } from 'react';
import Head from 'next/head'

import '../styles/globals.css'

import UserProvider from '../components/UserProvider';
import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../reducers/store';

import Appbar from '../components/Appbar';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState({});

  const handleChange = useCallback(
    (user) => {
      setUser(user);
    }, []
  );

  return (
    <Provider store={store}>
      <SnackbarProvider>
        <UserProvider onChange={handleChange}>
          <Head>
            <title>JewelryMirre</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Appbar user={user} />
          <Component {...pageProps} />
        </UserProvider>
      </SnackbarProvider>
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
