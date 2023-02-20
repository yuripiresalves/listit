import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'phosphor-react';

interface AnimeCardProps {
  anime: {
    title: string;
    image: string;
    sinopse: string;
  };
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="flex border flex-1 gap-8 justify-between bg-zinc-100 p-4 rounded-md">
      <Link
        href="/anime/slug-do-anime"
        className="rounded-md w-1/4 overflow-hidden"
      >
        <Image
          src={anime.image}
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
            {anime.sinopse}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 mt-4">
          <Link
            href="/anime/slug-do-anime"
            className="bg-emerald-700 text-zinc-100 py-2 px-4 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Ver mais
          </Link>
          <button className="bg-transparent text-zinc-800 flex items-center gap-2 p-2 rounded-md">
            <Star size={28} weight="bold" className="text-yellow-500" />
          </button>
        </div>
      </div>
    </div>
  );
}