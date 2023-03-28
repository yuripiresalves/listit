import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { GridContainer } from '../components/GridContainer';
import { Header } from '../components/Header';
import { AnimeCard } from '../components/AnimeCard';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from 'nookies';
import { api } from '@/services/api';
import { Anime } from '.';

export default function MyProfile() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAnimes('FAVORITO');
  }, []);

  async function getAnimes(listType: string) {
    try {
      const response = await api.get(`/lists/${listType}`);
      const data = await response.data;
      console.log(data);

      setAnimes(data.items);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Meu perfil | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes em listas"
        />
      </Head>

      <Header />

      <GridContainer>
        <main className="mt-20 md:mt-24 mb-10 px-4 bg-zinc-100 rounded-md flex flex-col items-center">
          <div className="rounded-full w-24 h-24 md:w-32 md:h-32 absolute -mt-12 md:-mt-16 overflow-hidden border-4 outline outline-3 outline-emerald-600 border-zinc-200">
            <img
              src={
                user?.urlImage ||
                `https://eu.ui-avatars.com/api/?name=${user?.name}&size=250`
              }
              className="w-full h-full"
            />
          </div>
          <div className="pt-16 md:pt-20 text-center w-full border-b border-zinc-200 p-4">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-500">
              <span className="text-gray-400 text-sm">@{user?.username}</span>
            </p>
            <p className="pt-4 mx-auto text-left w-full md-max-h-36 md:max-w-4xl max-w-xl bg-transparent">
              {user?.description}
            </p>
          </div>
          <section className="pb-4 w-full">
            <Tabs.Root defaultValue="favorites">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                <Tabs.List>
                  <Tabs.Trigger
                    onClick={() => getAnimes('FAVORITO')}
                    value="favorites"
                    className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                  >
                    <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                      Favoritos
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.List>
                  <Tabs.Trigger
                    onClick={() => getAnimes('ASSISTINDO')}
                    value="watching"
                    className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                  >
                    <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                      Assistindo
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.List>
                  <Tabs.Trigger
                    onClick={() => getAnimes('FINALIZADO')}
                    value="finished"
                    className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                  >
                    <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                      Finalizados
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.List>
                  <Tabs.Trigger
                    onClick={() => getAnimes('PARA_ASSISTIR')}
                    value="toWatch"
                    className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                  >
                    <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                      Para assistir
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
              </div>
              {animes.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-bold text-zinc-500">
                    Nenhum anime encontrado
                  </h1>
                  <p className="text-gray-500 text-center">
                    Você ainda não adicionou nenhum anime a essa lista
                  </p>
                </div>
              )}
              <Tabs.Content
                value="favorites"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[45rem] overflow-y-auto"
              >
                {animes.map((anime) => (
                  <AnimeCard anime={anime} />
                ))}
              </Tabs.Content>
              <Tabs.Content
                value="watching"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[45rem] overflow-y-auto"
              >
                {animes.map((anime) => (
                  <AnimeCard anime={anime} />
                ))}
              </Tabs.Content>
              <Tabs.Content
                value="finished"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[45rem] overflow-y-auto"
              >
                {animes.map((anime) => (
                  <AnimeCard anime={anime} />
                ))}
              </Tabs.Content>
              <Tabs.Content
                value="toWatch"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[45rem] overflow-y-auto"
              >
                {animes.map((anime) => (
                  <AnimeCard anime={anime} />
                ))}
              </Tabs.Content>
            </Tabs.Root>
          </section>
        </main>
      </GridContainer>
    </>
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
