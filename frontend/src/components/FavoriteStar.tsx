import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { Star } from 'phosphor-react';

interface FavoriteStarProps {
  id: string | string[] | number | undefined;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
}

export function FavoriteStar({
  id,
  isFavorite,
  setIsFavorite,
}: FavoriteStarProps) {
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
    <button
      onClick={handleToggleFavorite}
      className="bg-transparent text-zinc-800 flex items-center h-auto rounded-md"
    >
      <Star
        size={28}
        weight={isFavorite ? 'fill' : 'bold'}
        className="text-yellow-500"
      />
    </button>
  );
}
