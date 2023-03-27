import '@/styles/main.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';

import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </SessionProvider>
  );
}
