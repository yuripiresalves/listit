import { api } from '@/services/api';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      console.log('oi');

      // const { setUser } = useContext(AuthContext);

      try {
        console.log('oi2');
        const { data } = await api.post('/authenticate/login/google', {
          token: account?.id_token,
        });
        console.log(data);

        user.yuri = data.userDTO;

        console.log('user', user);

        // setUser(data.userDTO);
      } catch (error) {
        console.log(error);
      }

      return true;
    },
  },
});
