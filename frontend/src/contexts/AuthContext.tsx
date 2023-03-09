import { createContext, useState } from 'react';
import { api } from '@/services/api';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';

type User = {
  name: string;
  email: string;
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
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticaded = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    const { data } = await api.post('/authenticate/login', {
      username: email,
      password,
    });

    console.log(data);

    setCookie(undefined, 'listit.token', data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(data.user);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
