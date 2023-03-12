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

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    try {
      await signIn(data);
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
                {...register('email')}
                type="text"
                placeholder="fulano@email.com"
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
            <Link
              href="esqueci-senha"
              className="self-end my-2 text-sm hover:underline"
            >
              Esqueci minha senha
            </Link>
            <span className="text-center mb-4 text-zinc-600 border-t border-zinc-300"></span>
            <button className="bg-rose-800 p-4 rounded-md flex justify-center items-center gap-4 text-zinc-200 font-bold text-xl hover:bg-rose-900 transition-colors">
              <GoogleLogo size={28} weight="bold" />
              Entrar com Google
            </button>
            <span className="self-end mt-2 text-sm">
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
