import '@/styles/main.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';

import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}
