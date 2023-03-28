import '@/styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';

import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="210340187221-oj81f7cet5ncc21mk6c70uoddqs6l76a.apps.googleusercontent.com">
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
