import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';

import { AsideBanner } from '../components/AsideBanner';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  async function handleSubmitCreateAccountForm(event: FormEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas não conferem', {
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
      return;
    }

    const newUserData = {
      name,
      username,
      email,
      password,
    };

    try {
      const response = await api.post('/users/create', newUserData);

      if (response.status === 201) {
        toast('Conta criada com sucesso', {
          type: 'success',
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        router.push('/entrar');
      }
    } catch (error) {
      console.log(error);
      toast('Erro ao criar conta', {
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
        <title>Criar conta | listit</title>
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
              onSubmit={handleSubmitCreateAccountForm}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-bold ">
                Olá 😄, <span className="block">crie sua conta abaixo</span>
              </h2>
              <input
                type="text"
                placeholder="Digite seu nome"
                className=" p-4 rounded-md"
                required
                onChange={(event) => setName(event.target.value)}
              />
              <input
                type="text"
                placeholder="Digite seu usuário"
                className=" p-4 rounded-md"
                required
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className=" p-4 rounded-md"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Digite sua senha"
                className=" p-4 rounded-md"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                type="password"
                placeholder="Digite novamente sua senha"
                className=" p-4 rounded-md"
                required
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <button
                type="submit"
                className="bg-emerald-600 p-4 rounded-md text-zinc-200 font-bold text-xl hover:bg-emerald-700 transition-colors"
              >
                Criar
              </button>
            </form>
            <span className="self-end mt-2 text-sm">
              Já possui uma conta?{' '}
              <Link href="/entrar" className="text-emerald-800 hover:underline">
                Entre aqui
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
