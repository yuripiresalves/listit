import Head from 'next/head';
import { useState } from 'react';

import { GridContainer } from '@/components/GridContainer';
import { AnimeCard } from '@/components/AnimeCard';
import { Table } from '@/components/Table';
import * as Tabs from '@radix-ui/react-tabs';

export default function Home() {
  const [animeName, setAnimeName] = useState('');
  const [animes, setAnimes] = useState([
    {
      id: 1,
      title: 'Shingeki no Kyojin',
      image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
      status: 'watching',
      sinopse:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum',
    },
    {
      id: 2,
      title: 'Death Note',
      image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
      status: 'finished',
      sinopse:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus mulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime!',
    },
    {
      id: 3,
      title: 'Naruto',
      image: 'https://cdn.myanimelist.net/images/anime/5/17407.jpg',
      status: 'toWatch',
      sinopse:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime!',
    },
    {
      id: 4,
      title: 'Steins;Gate',
      image: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
      status: 'toWatch',
      sinopse:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime!',
    },
  ]);

  async function handleSearchAnime(event: any) {
    setAnimeName(event.target.value);
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
      <section className="bg-emerald-800 2xl:h-96 h-64 flex items-center justify-center px-4">
        <div className="max-w-[512px] flex flex-col items-center justify-center">
          <p className="text-zinc-300 mb-6 w-full text-center font-bold ">
            Pesquise entre milhares de animes disponíveis em nosso catálogo
          </p>
          <input
            type="text"
            placeholder="Pesquisar anime"
            className="p-4 rounded-md bg-zinc-200 w-full"
            value={animeName}
            onChange={handleSearchAnime}
          />
          <span className="text-zinc-300 mt-2 text-left self-start text-sm">
            Sugestões: Shingeki no Kyojin, Death Note, Naruto
          </span>
        </div>
      </section>
      <section className="py-10">
        {animeName ? (
          <GridContainer>
            <h2 className="text-2xl font-bold text-zinc-700 mb-8">
              Buscando por:{' '}
              <span className="text-emerald-700">{animeName}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {animes.map((anime) => (
                <AnimeCard anime={anime} />
              ))}
            </div>
          </GridContainer>
        ) : (
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
        )}
      </section>
    </>
  );
}
