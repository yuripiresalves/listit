import Head from 'next/head';
import * as Tabs from '@radix-ui/react-tabs';

import { GridContainer } from '../components/GridContainer';
import { Header } from '../components/Header';
import { AnimeCard } from '../components/AnimeCard';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export default function MyProfile() {
  const animes = [
    {
      id: 1,
      title: 'Shingeki no Kyojin',
      episodes: 40,
      score: 9.9,
      imageJPG: {
        imageURL: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
      },
      synopsis:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum',
    },
    {
      id: 2,
      title: 'Death note',
      episodes: 37,
      score: 10,
      imageJPG: {
        imageURL: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
      },
      synopsis:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum, quis minus nulla est accusamus laborum minima quo adipisci, labore nisi, laboriosam maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto consequuntur illo error laudantium sit animi dolorum',
    },
  ];
  const router = useRouter();
  const { user } = useContext(AuthContext);

  if (!user) router.push('/');

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
            <img src="https://github.com/yuripiresalves.png" />
          </div>
          <div className="pt-16 md:pt-20 text-center w-full border-b border-zinc-200 p-4">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-500">
              <span className="text-gray-400 text-sm">@{user?.username}</span>
            </p>
            <p className="pt-4 mx-auto text-left w-full md-max-h-36 md:max-w-4xl max-w-xl bg-transparent">
              LIMITAR A 320 CARACTERES oi e tryre u soi eu sou o yuri. oitrtrewr
              eu sou o yuri. tretew rtwew trete gerteytyy yweyewywywf 7845nr8e
              r3472398 ii oi eu sou o yuri. oi eu sofndsj fkdsfsffdfd fdgfgfdgfd
              fgfdgffhfhgfgerr eoghret y4389y LIMITAR A 320 CARACTERES
            </p>
          </div>
          <section className="pb-4">
            <Tabs.Root defaultValue="favorites">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
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
              </div>
            </Tabs.Root>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[45rem] overflow-y-auto">
              {animes.map((anime) => (
                <AnimeCard anime={anime} />
              ))}
            </div>
          </section>
        </main>
      </GridContainer>
    </>
  );
}
