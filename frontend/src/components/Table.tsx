import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Gear, Trash } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Loading } from './Loading';
import { SelectList } from '@/components/SelectList';
import { AddToListButton } from './AddToListButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

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
  }, [isDeleting]);

  async function handleDeleteAnime(animeId: number) {
    try {
      setIsDeleting(true);
      const response = await api.delete(`/lists/${listType}/${animeId}`);
      if (response.status === 200) {
        toast('Anime removido com sucesso', {
          type: 'success',
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log(error);
      toast('Erro ao remover anime', {
        type: 'error',
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setIsDeleting(false);
    }
  }

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

                <th
                  className={`p-4 sticky top-0 bg-emerald-800 text-zinc-100 ${
                    listType === '' && 'rounded-tr-md rounded-br-md'
                  }`}
                >
                  Nota
                </th>
                {listType !== '' && (
                  <th className="p-4 sticky top-0 bg-emerald-800 text-zinc-100 rounded-tr-md rounded-br-md">
                    Opções
                  </th>
                )}
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

                  <td
                    className={`p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 ${
                      listType === '' && 'rounded-tr-md rounded-br-md'
                    }`}
                  >
                    {anime.score}
                  </td>
                  {listType !== '' && (
                    <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tr-md rounded-br-md">
                      {listType !== 'FAVORITO' && (
                        <AddToListButton
                          animeId={anime.id}
                          listType={listType}
                          icon={true}
                        />
                      )}
                      <AlertDialog.Root>
                        <AlertDialog.Trigger asChild className="ml-4">
                          <button className="bg-zinc-100 border border-rose-600 font-bold text-rose-600 p-2 rounded-md hover:bg-rose-600 hover:text-zinc-100 focus:bg-rose-600 focus:text-zinc-100 transition-colors">
                            <Trash size={24} />
                          </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                          <AlertDialog.Overlay className="bg-zinc-800 fixed inset-0 opacity-40" />
                          <AlertDialog.Content className="bg-zinc-100 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 max-w-[500px] p-6 rounded-md shadow-xl">
                            <AlertDialog.Title className="font-bold text-xl mb-2 text-rose-600">
                              Tem certeza?
                            </AlertDialog.Title>

                            <div className="flex gap-6 justify-end mt-4">
                              <AlertDialog.Cancel asChild>
                                <button className="flex justify-center items-center px-4 py-2 font-bold bg-zinc-200 rounded-md">
                                  Cancelar
                                </button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action
                                asChild
                                onClick={() => handleDeleteAnime(anime.id)}
                              >
                                <button className="flex justify-center items-center px-4 py-2 font-bold bg-rose-200 text-rose-700 rounded-md">
                                  Sim, deletar anime
                                </button>
                              </AlertDialog.Action>
                            </div>
                          </AlertDialog.Content>
                        </AlertDialog.Portal>
                      </AlertDialog.Root>
                    </td>
                  )}
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
