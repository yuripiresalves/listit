import { createContext, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { parseCookies, setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { getSession, signIn, useSession } from 'next-auth/react';
import { GoogleLogin } from '@react-oauth/google';

type User = {
  name: string;
  email: string;
  username: string;
  avatar_url: string;
  viewProfile: boolean;
  description: string;
};

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextType = {
  isAuthenticaded: boolean;
  user: User | null;
  setUser: (user: User) => void;
  signInWithCredentials: (credentials: SignInCredentials) => Promise<void>;
  signInWithGoogle: (credentialResponse: any) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  // const { data: session } = useSession();

  const router = useRouter();

  const isAuthenticaded = !!user;

  useEffect(() => {
    const { 'listit.token': token } = parseCookies();

    if (token) {
      api
        .get('/users')
        .then((response) => {
          const user = response.data;

          setUser(user);
        })
        .catch((error) => {
          console.log(error);

          signOut();
        });
    }
  }, []);

  async function signInWithCredentials({
    username,
    password,
  }: SignInCredentials) {
    const { data } = await api.post('/authenticate/login', {
      username,
      password,
    });

    setCookie(undefined, 'listit.token', data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

    setUser(data.userDTO);
    router.push('/');
  }

  async function signInWithGoogle(credentialResponse: any) {
    try {
      // await signIn('google');
      const { data } = await api.post('/authenticate/login/google', {
        token: credentialResponse.credential,
      });

      setCookie(undefined, 'listit.token', data.token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

      setUser(data.userDTO);
      router.push('/');
      // <GoogleLogin
      //   onSuccess={async (credentialResponse) => {
      //     console.log(credentialResponse);

      //   }}
      //   onError={() => {
      //     console.log('Login Failed');
      //   }}
      // />;
      // console.log(user);
      // // router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    setUser(null);
    setCookie(undefined, 'listit.token', '', {
      maxAge: -1,
    });
    router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticaded,
        signInWithCredentials,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
