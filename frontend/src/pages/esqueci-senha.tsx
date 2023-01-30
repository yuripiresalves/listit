import Head from 'next/head';
import Link from 'next/link';
import { FormEvent } from 'react';

import { AsideBanner } from '../components/AsideBanner';

export default function LostPassword() {
  function handleSubmitLostPasswordForm(event: FormEvent) {
    event.preventDefault();
    alert('lost password');
  }
  return (
    <div className="h-screen">
      <Head>
        <title>Esqueci minha senha | listit</title>
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
              onSubmit={handleSubmitLostPasswordForm}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-bold ">
                Esqueceu sua senha? 🤔
                <span className="block font-normal text-lg mt-2">
                  Sem problemas, digite seu e-mail e siga as instruções que
                  mandaremos nele 😊
                </span>
              </h2>
              <input
                type="email"
                placeholder="fulano@email.com"
                className=" p-4 rounded-md"
                required
              />
              <button
                type="submit"
                className="bg-emerald-600 p-4 rounded-md text-zinc-200 font-bold text-xl hover:bg-emerald-700 transition-colors"
              >
                Enviar
              </button>
            </form>
            <span className="text-center mb-4 text-zinc-600 border-t border-zinc-300"></span>
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
