import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import { api } from '@/services/api';
import { MagnifyingGlass, X } from 'phosphor-react';
import * as Tabs from '@radix-ui/react-tabs';

import { Header } from '@/components/Header';
import { GridContainer } from '@/components/GridContainer';
import { AnimeCard } from '@/components/AnimeCard';
import { Table } from '@/components/Table';
import { Loading } from '@/components/Loading';
import { AnimeNotFound } from '@/components/AnimeNotFound';
import { AuthContext } from '@/contexts/AuthContext';

export type Anime = {
  id: number;
  title: string;
  episodes: number;
  score: number;
  imageJPG: {
    imageURL: string;
  };
  synopsis: string;
};

export default function Home() {
  const [animeName, setAnimeName] = useState('');
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { user } = useContext(AuthContext);

  async function handleSearchAnime(event: FormEvent) {
    event.preventDefault();

    if (!animeName) {
      return;
    }

    try {
      setHasError(false);
      setIsLoading(true);
      const response = await api.get(`/animes/findByName/${animeName}`);
      const data = await response.data;
      setAnimes(data);
    } catch (error) {
      setHasError(true);
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Início | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes preferidos em listas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className="bg-emerald-800 2xl:h-96 h-64 flex items-center justify-center px-4">
        <div className="max-w-[512px] flex flex-col items-center justify-center">
          <p className="text-zinc-300 mb-6 w-full text-center font-bold ">
            Pesquise entre milhares de animes disponíveis em nosso catálogo
          </p>
          <form onSubmit={handleSearchAnime} className="w-full flex gap-3">
            <input
              type="text"
              placeholder="Pesquisar anime"
              className="p-4 rounded-md bg-zinc-200 w-full"
              value={animeName}
              onChange={(e) => setAnimeName(e.target.value)}
            />
            <button className="bg-zinc-200 px-4 rounded-lg hover:bg-zinc-300 transition-all">
              <MagnifyingGlass size={24} className="text-emerald-800" />
            </button>
            {animes.length > 0 && (
              <button
                className="bg-zinc-200 px-4 rounded-lg hover:bg-zinc-300 transition-all"
                onClick={() => {
                  setAnimeName('');
                  setAnimes([]);
                }}
              >
                <X size={24} className="text-red-600" />
              </button>
            )}
          </form>
          <span className="text-zinc-300 mt-2 text-left self-start text-sm">
            Sugestões: Shingeki no Kyojin, Death Note, Naruto
          </span>
        </div>
      </section>
      <section className="py-10">
        {/* {hasError && <AnimeNotFound />} */}
        {isLoading ? (
          <GridContainer>
            <Loading />
          </GridContainer>
        ) : hasError ? (
          <AnimeNotFound />
        ) : animes.length > 0 ? (
          <GridContainer>
            <h2 className="text-2xl font-bold text-zinc-700 mb-8">
              Buscando por:{' '}
              <span className="text-emerald-700">{animeName}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {animes.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          </GridContainer>
        ) : user ? (
          <GridContainer>
            <h2 className="text-2xl font-bold text-emerald-700 mb-8">
              Minhas listas
            </h2>
            <Tabs.Root defaultValue="all">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
                <Tabs.List>
                  <Tabs.Trigger
                    value="all"
                    className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                  >
                    <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                      Todos
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.List>
                  <Tabs.Trigger
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
                    value="toWatch"
                    className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                  >
                    <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                      Para assistir
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.List>
                  <Tabs.Trigger
                    value="favorites"
                    className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                  >
                    <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                      Favoritos
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
              </div>
              <Tabs.Content value="all">
                <Table />
              </Tabs.Content>
              <Tabs.Content value="watching">
                <Table />
              </Tabs.Content>
              <Tabs.Content value="finished">
                <Table />
              </Tabs.Content>
              <Tabs.Content value="toWatch">
                <Table />
              </Tabs.Content>
              <Tabs.Content value="favorites">
                <Table />
              </Tabs.Content>
            </Tabs.Root>
          </GridContainer>
        ) : (
          <GridContainer>
            <h2 className="text-2xl font-bold text-emerald-700 mb-8">
              Minhas listas
            </h2>
            <p className="text-zinc-500">
              Você precisa estar logado para ver suas listas
            </p>
          </GridContainer>
        )}
      </section>
    </>
  );
}
