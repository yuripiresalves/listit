import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

interface TableProps {
  listType: '' | 'ASSISTINDO' | 'FINALIZADO' | 'PARA_ASSISTIR' | 'FAVORITO';
}

interface Anime {
  id: number;
  title: string;
  episodes: number;
  score: number;
}

export function Table({ listType }: TableProps) {
  let animes: Anime[] = [];

  useEffect(() => {
    async function getAnimes() {
      try {
        const response = await api.get(`/lists/${listType}`);
        animes = await response.data;
      } catch (error) {
        console.log(error);
      }
    }
    getAnimes();
  }, []);

  return (
    <div className="h-96 overflow-scroll">
      <table className="w-full border-collapse">
        <thead className="text-left">
          <tr>
            <th className="p-4 bg-emerald-800 text-zinc-100 rounded-tl-md rounded-bl-md">
              Nome
            </th>
            <th className="p-4 bg-emerald-800 text-zinc-100">Episódios</th>
            <th className="p-4 bg-emerald-800 text-zinc-100">Nota</th>
            <th className="p-4 bg-emerald-800 text-zinc-100">Adicionado em</th>
            <th className="p-4 bg-emerald-800 text-zinc-100 rounded-tr-md rounded-br-md">
              Opções
            </th>
          </tr>
        </thead>
        <tbody>
          {animes.map((anime) => (
            <tr key={anime.id}>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tl-md rounded-bl-md">
                {anime.title}
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
                Opções
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
