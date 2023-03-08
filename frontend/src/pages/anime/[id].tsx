import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { Star } from 'phosphor-react';
import { api } from '@/services/api';
// import { Anime } from '..';

import { GridContainer } from '../../components/GridContainer';
import { Loading } from '@/components/Loading';
import { Error } from '@/components/Error';

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

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function getAnimeDetails() {
      try {
        setHasError(false);
        setIsLoading(true);
        const response = await api.get(`/animes/findById/${id}`);
        const data = await response.data;
        setAnime(data);
      } catch (error) {
        setHasError(true);
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }
    getAnimeDetails();
  }, [id]);

  return (
    <>
      <Head>
        <title>{anime.title} | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes em listas"
        />
      </Head>

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
              <Image
                src={anime.imageJPG?.imageURL}
                width={220}
                height={180}
                alt={anime?.title}
                className="lg:w-40"
              />
            )}
            <div className="flex flex-col justify-between bg-zinc-100 py-4 px-10 rounded-md max-w-5xl">
              <div>
                <span className="text-lg">Sinopse:</span>
                <p className="mt-2 leading-relaxed ">{anime?.synopsis}</p>
              </div>
              <div className="flex flex-col md:flex-row md:gap-16 gap-8 mt-6">
                <div className="flex flex-col gap-3">
                  <span>
                    <strong className="font-bold">Nota:</strong> {anime?.score}
                  </span>
                  <span>
                    <strong className="font-bold">Episódios:</strong>{' '}
                    {anime?.episodes}
                  </span>
                </div>

                <div className="flex gap-8 items-center">
                  <button
                    className="max-w-xs bg-transparent border border-emerald-600 p-3 rounded-md text-emerald-800 text-lg font-bold hover:bg-emerald-600 hover:text-zinc-100 transition duration-300"
                    type="button"
                  >
                    Adicionar a lista
                  </button>

                  <button className="bg-transparent text-zinc-800 flex items-center h-auto rounded-md">
                    <Star size={28} weight="bold" className="text-yellow-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </GridContainer>
      )}
    </>
  );
}
