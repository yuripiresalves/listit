import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Gear, Trash, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';
import { SelectList } from '@/components/SelectList';
import { AddToListButton } from './AddToListButton';

interface TableProps {
  listType: '' | 'ASSISTINDO' | 'FINALIZADO' | 'PARA_ASSISTIR' | 'FAVORITO';
}

interface Anime {
  id: number;
  title: string;
  episodes: number;
  score: number;
}

interface List {
  id: number;
  type: string;
  items: Anime[];
}

export function Table({ listType }: TableProps) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAnimes() {
      try {
        let response;

        if (listType == '') {
          setIsLoading(true);
          response = await api.get(`/lists`);

          const animesList = response.data.map((list: List) => {
            return list.items;
          });

          const animes = animesList.flat();

          const animesFiltered = animes.filter(
            (anime: Anime, index: number) => {
              return (
                animes.findIndex((a: Anime) => a.id === anime.id) === index
              );
            }
          );

          setAnimes(animesFiltered);
        } else {
          setIsLoading(true);
          response = await api.get(`/lists/${listType}`);
          setAnimes(response.data.items);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getAnimes();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : animes.length > 0 ? (
        <div className="h-96 overflow-scroll relative">
          <table className="w-full border-collapse">
            <thead className="text-left">
              <tr className="w-full">
                <th className="p-4 sticky top-0 bg-emerald-800 text-zinc-100 rounded-tl-md rounded-bl-md">
                  Nome
                </th>
                <th className="p-4 sticky top-0 bg-emerald-800 text-zinc-100">
                  Episódios
                </th>
                <th className="p-4 sticky top-0 bg-emerald-800 text-zinc-100">
                  Nota
                </th>
                <th className="p-4 sticky top-0 bg-emerald-800 text-zinc-100">
                  Adicionado em
                </th>
                <th className="p-4 sticky top-0 bg-emerald-800 text-zinc-100 rounded-tr-md rounded-br-md">
                  Opções
                </th>
              </tr>
            </thead>
            <tbody>
              {animes.map((anime) => (
                <tr key={anime.id}>
                  <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tl-md rounded-bl-md">
                    <Link
                      href={`/anime/${anime.id}`}
                      className="hover:underline"
                    >
                      {anime.title}
                    </Link>
                  </td>
                  <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                    {anime.episodes}
                  </td>
                  <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                    {anime.score}
                  </td>
                  <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                    10/10/2021
                  </td>
                  <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tr-md rounded-br-md">
                    <AddToListButton
                      animeId={anime.id}
                      listType={listType}
                      icon={true}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center pt-16 text-lg text-zinc-500">
          A lista está vazia
        </p>
      )}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/animes');
//   const animes = await response.json();

//   return {
//     props: {
//       animes,
//     },
//   };
// };
