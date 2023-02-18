import Head from 'next/head';
import Link from 'next/link';
import { FormEvent } from 'react';

import { AsideBanner } from '../components/AsideBanner';

export default function CreateAccount() {
  function handleSubmitCreateAccountForm(event: FormEvent) {
    event.preventDefault();
    alert('create account');
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
              />
              <input
                type="text"
                placeholder="Digite seu usuário"
                className=" p-4 rounded-md"
                required
              />
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className=" p-4 rounded-md"
                required
              />
              <input
                type="password"
                placeholder="Digite sua senha"
                className=" p-4 rounded-md"
                required
              />
              <input
                type="password"
                placeholder="Digite novamente sua senha"
                className=" p-4 rounded-md"
                required
              />
              <button
                type="submit"
                // onClick={handleCreateAccount}
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
