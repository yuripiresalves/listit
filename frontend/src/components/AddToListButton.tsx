import { SelectList } from '@/components/SelectList';
import { api } from '@/services/api';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/router';
import { Gear, X } from 'phosphor-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface AddToListButtonProps {
  animeId: number;
  listType?: string;
  icon?: boolean;
}

export function AddToListButton({
  animeId,
  listType,
  icon,
}: AddToListButtonProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const router = useRouter();

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
      const response = await api.put(`/lists/add/${selectedValue}/${animeId}`);
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
      toast('Erro ao adicionar anime', {
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
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={`max-w-xs bg-transparent border border-emerald-600 ${
            icon ? 'p-2' : 'p-3'
          } rounded-md text-emerald-800 text-lg font-bold hover:bg-emerald-600 hover:text-zinc-100 transition duration-300`}
          type="button"
        >
          {icon ? <Gear size={24} /> : 'Adicionar a lista'}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-zinc-800 fixed inset-0 opacity-40" />
        <Dialog.Content className="bg-zinc-100 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 max-w-[500px] p-6 rounded-md shadow-xl">
          <Dialog.Title className="font-bold text-xl mb-2 text-emerald-600">
            Selecione uma lista
          </Dialog.Title>
          <Dialog.Description className="text-zinc-500 mb-6">
            Selecione a lista na qual deseja adicionar o anime
          </Dialog.Description>

          <SelectList
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
            listType={listType}
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
  );
}
