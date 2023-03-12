import { createContext, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { parseCookies, setCookie } from 'nookies';
import { useRouter } from 'next/router';

type User = {
  name: string;
  email: string;
  username: string;
  avatar_url: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticaded: boolean;
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
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
          const { userDTO } = response.data;

          setUser(userDTO);
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const { data } = await api.post('/authenticate/login', {
      username: email,
      password,
    });

    setCookie(undefined, 'listit.token', data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(data.userDTO);
    router.push('/');
  }

  function signOut() {
    setUser(null);
    setCookie(undefined, 'listit.token', '', {
      maxAge: -1,
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}