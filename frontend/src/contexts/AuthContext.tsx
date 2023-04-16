import { createContext, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { parseCookies, setCookie } from 'nookies';
import { useRouter } from 'next/router';

type User = {
  name: string;
  email: string;
  username: string;
  viewProfile: boolean;
  description: string;
  urlImage: string;
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
      maxAge: 60 * 60 * 3, // 3 hour
    });

    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

    setUser(data.userDTO);
    router.push('/');
  }

  async function signInWithGoogle(credentialResponse: any) {
    try {
      const { data } = await api.post('/authenticate/login/google', {
        token: credentialResponse.credential,
      });

      setCookie(undefined, 'listit.token', data.token, {
        maxAge: 60 * 60 * 3, // 3 hour
      });

      api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
      console.log(data);
      setUser(data.userDTO);

      router.push('/');
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
