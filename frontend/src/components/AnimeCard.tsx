import { Anime } from '@/pages';
import { api } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FavoriteStar } from './FavoriteStar';
import { AuthContext } from '@/contexts/AuthContext';

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getFavoriteAnimes() {
      try {
        const response = await api.get(`/lists/FAVORITO`);

        const favoritesAnimes = response.data.items;

        const isFavorite = favoritesAnimes.find((favoriteAnime: Anime) => {
          return favoriteAnime.id === Number(anime.id);
        });

        setIsFavorite(isFavorite);
      } catch (error) {
        console.log('error', error);
      }
    }
    getFavoriteAnimes();
  }, [anime.id]);

  return (
    <div className="flex border flex-1 gap-8 justify-between bg-zinc-100 p-4 rounded-md">
      <Link
        href={`/anime/${anime.id}`}
        className="rounded-md w-1/4 overflow-hidden"
      >
        <Image
          src={anime.imageJPG.imageURL}
          alt={anime.title}
          width={225}
          height={300}
          quality={100}
          className="hover:scale-105 rounded-md md:h-full object-cover transition-transform"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="max-w-full">
          <h3 className="text-zinc-700 font-bold text-lg mb-2">
            {anime.title}
          </h3>
          <p className="text-zinc-500 h-40 overflow-y-scroll">
            {anime.synopsis}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 mt-4">
          <Link
            href={`/anime/${anime.id}`}
            className="bg-emerald-700 text-zinc-100 py-2 px-4 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Ver mais
          </Link>

          {user && (
            <FavoriteStar
              id={anime.id}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          )}
        </div>
      </div>
    </div>
  );
}
