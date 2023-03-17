import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import React, { useContext, useEffect, useState } from 'react';
import { X } from 'phosphor-react';
import { api } from '@/services/api';
import * as Dialog from '@radix-ui/react-dialog';

import { GridContainer } from '../../components/GridContainer';
import { Loading } from '@/components/Loading';
import { Error } from '@/components/Error';
import { Header } from '@/components/Header';
import { SelectList } from '@/components/SelectList';
import { toast } from 'react-toastify';
import { AuthContext } from '@/contexts/AuthContext';
import { FavoriteStar } from '@/components/FavoriteStar';

type Anime = {
  id: number;
  title: string;
  episodes: number;
  score: number;
  imageJPG: {
    imageURL: string;
  };
  synopsis: string;
};

export default function AnimeDetails() {
  const [anime, setAnime] = useState({} as Anime);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isAnimeAlreadyInList, setIsAnimeAlreadyInList] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticaded } = useContext(AuthContext);

  useEffect(() => {
    async function getAnimes() {
      try {
        // setIsLoading(true);
        const response = await api.get(`/lists`);

        const favoritesAnimes = response.data[3].items;

        const isFavorite = favoritesAnimes.find((anime: Anime) => {
          return anime.id === Number(id);
        });

        setIsFavorite(isFavorite);

        const animesList = response.data.map((list: any) => {
          return list.items;
        });

        const animes = animesList.flat();

        const animesFiltered = animes.filter((anime: Anime, index: number) => {
          return animes.findIndex((a: Anime) => a.id === anime.id) === index;
        });

        const isAnimeAlreadyInList = animesFiltered.find((anime: Anime) => {
          return anime.id === Number(id);
        });

        setIsAnimeAlreadyInList(isAnimeAlreadyInList);
        // setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    }
    async function getAnimeDetails() {
      try {
        setHasError(false);
        setIsLoading(true);
        const response = await api.get(`/animes/findById/${id}`);
        const data = await response.data;
        setAnime(data);
      } catch (error) {
        // setHasError(true);
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }

    getAnimeDetails();
    getAnimes();
    // getFavoriteAnimes();
  }, [id]);

  async function handleAddToList() {
    if (!selectedValue) {
      toast('Selecione uma lista', {
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
      return;
    }

    try {
      const response = await api.put(`/lists/add/${selectedValue}/${id}`);
      if (response.status === 200) {
        toast('Anime adicionado com sucesso', {
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
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToggleFavorite() {
    if (isFavorite) {
      try {
        const response = await api.delete(`/lists/FAVORITO/${id}`);
        console.log('response', response);

        if (response.status === 204) {
          toast('Anime deletado com sucesso', {
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
          setIsFavorite(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await api.put(`/lists/favorite/${id}`);
        if (response.status === 200) {
          toast('Anime favoritado com sucesso', {
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
          setIsFavorite(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Head>
        <title>{anime.title} | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes em listas"
        />
      </Head>

      <Header />

      {isLoading ? (
        <Loading />
      ) : hasError ? (
        <GridContainer>
          <Error />
        </GridContainer>
      ) : (
        <GridContainer className="mt-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-4">
            {anime.title}
          </h1>
          <div className="flex flex-col items-center lg:flex-row gap-10 pb-4">
            {anime && (
              <>
                <Image
                  src={anime.imageJPG?.imageURL}
                  width={220}
                  height={180}
                  alt={anime?.title}
                  className="lg:w-40"
                />
                <div className="flex flex-col justify-between bg-zinc-100 py-4 px-10 rounded-md max-w-5xl">
                  <div>
                    <span className="text-lg">Sinopse:</span>
                    <p className="mt-2 leading-relaxed ">{anime?.synopsis}</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-16 gap-8 mt-6">
                    <div className="flex flex-col gap-3">
                      <span>
                        <strong className="font-bold">Nota:</strong>{' '}
                        {anime?.score}
                      </span>
                      <span>
                        <strong className="font-bold">Episódios:</strong>{' '}
                        {anime?.episodes}
                      </span>
                    </div>

                    {isAuthenticaded && (
                      <div className="flex gap-8 items-center">
                        {isAnimeAlreadyInList ? (
                          'Anime já está na lista'
                        ) : (
                          <Dialog.Root>
                            <Dialog.Trigger asChild>
                              <button
                                className="max-w-xs bg-transparent border border-emerald-600 p-3 rounded-md text-emerald-800 text-lg font-bold hover:bg-emerald-600 hover:text-zinc-100 transition duration-300"
                                type="button"
                              >
                                Adicionar a lista
                              </button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                              <Dialog.Overlay className="bg-zinc-800 fixed inset-0 opacity-40" />
                              <Dialog.Content className="bg-zinc-100 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 max-w-[500px] p-6 rounded-md shadow-xl">
                                <Dialog.Title className="font-bold text-xl mb-2 text-emerald-600">
                                  Selecione uma lista
                                </Dialog.Title>
                                <Dialog.Description className="text-zinc-500 mb-6">
                                  Selecione a lista na qual deseja adicionar o
                                  anime
                                </Dialog.Description>

                                <SelectList
                                  setSelectedValue={setSelectedValue}
                                />

                                <div className="flex mt-6 justify-end">
                                  <Dialog.Close asChild>
                                    <button
                                      onClick={handleAddToList}
                                      className="bg-emerald-600  p-3 rounded-md text-zinc-100  font-bold hover:bg-emerald-700 transition duration-300"
                                    >
                                      Adicionar
                                    </button>
                                  </Dialog.Close>
                                </div>
                                <Dialog.Close
                                  asChild
                                  className="text-zinc-500 p-2 rounded-full inline-flex items-center justify-center absolute top-3 right-3 hover:bg-zinc-200"
                                >
                                  <button aria-label="Close">
                                    <X size={18} />
                                  </button>
                                </Dialog.Close>
                              </Dialog.Content>
                            </Dialog.Portal>
                          </Dialog.Root>
                        )}

                        <FavoriteStar
                          id={id}
                          isFavorite={isFavorite}
                          setIsFavorite={setIsFavorite}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </GridContainer>
      )}
    </>
  );
}
