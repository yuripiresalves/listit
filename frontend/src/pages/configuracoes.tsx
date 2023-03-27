import Head from 'next/head';
import { GetServerSideProps } from 'next';
import * as Tabs from '@radix-ui/react-tabs';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Switch from '@radix-ui/react-switch';
import { parseCookies } from 'nookies';

import { GridContainer } from '../components/GridContainer';
import { Header } from '../components/Header';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { toast } from 'react-toastify';

export default function Settings() {
  const { user } = useContext(AuthContext);

  const isPublicProfile = user?.viewProfile;

  const [viewProfile, setViewProfile] = useState(isPublicProfile);
  const [bio, setBio] = useState(user?.description);

  async function handleViewProfile() {
    if (viewProfile) {
      await api.put('/users/profile/view/desability');
      setViewProfile(false);
    } else {
      await api.put('/users/profile/view/active');
      setViewProfile(true);
    }
  }

  async function handleUpdateProfile(e: FormEvent) {
    try {
      e.preventDefault();
      await api.put('/users/description', {
        description: bio,
      });
      toast('Perfil atualizado com sucesso', {
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
    } catch (error) {
      console.log(error);

      toast('Erro ao atualizar perfil', {
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
    <div className="flex flex-col min-h-screen max-h-screen">
      <Head>
        <title>Configurações | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes em listas"
        />
      </Head>

      <Header />

      <GridContainer className="my-4 flex flex-1 rounded-md ">
        <main className="flex flex-1 p-4 bg-zinc-100 rounded-lg">
          <Tabs.Root
            defaultValue="personalInformations"
            className="flex flex-1"
          >
            <Tabs.List className="flex flex-col gap-4 pr-4 border-r">
              <Tabs.Trigger
                value="personalInformations"
                className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500  rounded-md hover:text-emerald-900 hover:border-emerald-500"
              >
                <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                  Informações pessoais
                </span>
              </Tabs.Trigger>

              <Tabs.Trigger
                value="privacy"
                className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500  rounded-md hover:text-emerald-900 hover:border-emerald-500"
              >
                <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                  Privacidade
                </span>
              </Tabs.Trigger>

              <Tabs.Trigger
                value="account"
                className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500  rounded-md hover:text-emerald-900 hover:border-emerald-500"
              >
                <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                  Conta
                </span>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="personalInformations" className="flex-1">
              <div className="px-8 py-2">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  Informações pessoais
                </h2>
                <form
                  className="flex flex-col gap-4 w-1/2"
                  onSubmit={handleUpdateProfile}
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="bio">Biografia</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Escreva uma breve biografia sobre você"
                      cols={30}
                      rows={5}
                      className="rounded-md p-4 resize-none"
                    ></textarea>
                  </div>

                  <button className="bg-emerald-600 text-zinc-100 font-bold p-4 rounded-md w-24 self-end hover:bg-emerald-700 transition-colors">
                    Salvar
                  </button>
                </form>
              </div>
            </Tabs.Content>

            <Tabs.Content value="privacy" className="flex-1">
              <div className="px-8 py-2">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  Privacidade
                </h2>
                <div
                  className="flex items-center"
                  onClick={() => handleViewProfile()}
                >
                  <label className="cursor-pointer pr-4">
                    Permitir que outros usuários visualizem meu perfil
                  </label>
                  <Switch.Root
                    data-state={viewProfile ? 'checked' : ''}
                    className="w-12 h-7 bg-zinc-400 rounded-full relative data-[state='checked']:bg-emerald-800"
                  >
                    <Switch.Thumb
                      data-state={viewProfile ? 'checked' : ''}
                      className="w-6 h-6 block rounded-full bg-zinc-100 translate-x-1 data-[state='checked']:translate-x-5 transition-transform"
                    />
                  </Switch.Root>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="account" className="flex-1">
              <div className="px-8 py-2">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">Conta</h2>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button className="bg-zinc-100 border border-rose-600 font-bold text-rose-600 px-2 py-4 rounded-md hover:bg-rose-600 hover:text-zinc-100 focus:bg-rose-600 focus:text-zinc-100 transition-colors">
                      Deletar conta
                    </button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-zinc-800 fixed inset-0 opacity-40" />
                    <AlertDialog.Content className="bg-zinc-100 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 max-w-[500px] p-6 rounded-md shadow-xl">
                      <AlertDialog.Title className="font-bold text-xl mb-2 text-rose-600">
                        Tem certeza?
                      </AlertDialog.Title>
                      <AlertDialog.Description className="text-zinc-500">
                        Essa ação não poderá ser desfeita. Isso irá excluir sua
                        conta permanentemente e remover seus dados de nossos
                        servidores.
                      </AlertDialog.Description>
                      <div className="flex gap-6 justify-end mt-4">
                        <AlertDialog.Cancel asChild>
                          <button className="flex justify-center items-center px-4 py-2 font-bold bg-zinc-200 rounded-md">
                            Cancelar
                          </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <button className="flex justify-center items-center px-4 py-2 font-bold bg-rose-200 text-rose-700 rounded-md">
                            Sim, deletar minha conta
                          </button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </main>
      </GridContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['listit.token']: token } = parseCookies(ctx);

  if (!token) {
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
