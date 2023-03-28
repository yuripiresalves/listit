import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from 'nookies';
import { GoogleLogo } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { AsideBanner } from '../components/AsideBanner';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signInWithCredentials, signInWithGoogle } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    try {
      await signInWithCredentials(data);
    } catch (error) {
      console.log(error);
      toast('Email ou senha incorretos', {
        type: 'error',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  return (
    <div className="h-screen">
      <Head>
        <title>Entrar | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes em listas"
        />
      </Head>

      <div className="h-full flex">
        <AsideBanner />

        <section className="w-full md:w-[672px] mx-auto p-8 flex flex-col items-center justify-center">
          <div className="flex flex-col w-full md:w-96">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <h2 className="text-2xl font-bold ">
                Olá 👋, <span className="block">entre em sua conta</span>
              </h2>
              <input
                {...register('username')}
                type="text"
                placeholder="nome de usuário"
                className=" p-4 rounded-md"
                required
              />
              <input
                {...register('password')}
                type="password"
                placeholder="********"
                className=" p-4 rounded-md"
                required
              />
              <button
                type="submit"
                className="bg-emerald-600 p-4 rounded-md text-zinc-200 font-bold text-xl hover:bg-emerald-700 transition-colors flex justify-center"
              >
                Entrar
              </button>
            </form>
            {/* <Link
              href="esqueci-senha"
              className="self-end my-2 text-sm hover:underline"
            >
              Esqueci minha senha
            </Link> */}
            {/* <span className="text-center my-4 text-zinc-600 border-b border-zinc-300"></span> */}
            <div className="relative my-4 mx-12">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-zinc-400"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-zinc-200 text-sm text-zinc-600">
                  ou
                </span>
              </div>
            </div>
            {/* <button
              onClick={signInWithGoogle}
              className="bg-rose-800 p-4 rounded-md flex justify-center items-center gap-4 text-zinc-200 font-bold text-xl hover:bg-rose-900 transition-colors"
            >
              <GoogleLogo size={28} weight="bold" />
              Entrar com Google
            </button> */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  signInWithGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>

            <span className="self-center mt-2 text-sm">
              Ainda não possui uma conta?{' '}
              <Link
                href="/criar-conta"
                className="text-emerald-800 hover:underline"
              >
                Crie aqui
              </Link>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['listit.token']: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
