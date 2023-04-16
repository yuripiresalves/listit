import { useEffect, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { CaretDown, Check } from 'phosphor-react';
import { api } from '@/services/api';

interface SelectListProps {
  // selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
  listType?: string;
  selectedValue?: string | null;
}

export function SelectList({
  setSelectedValue,
  selectedValue,
  listType,
}: SelectListProps) {
  const [listTypes, setListTypes] = useState<string[]>([]);

  useEffect(() => {
    async function getListsTypes() {
      const response = await api.get('/lists/types');
      const data = await response.data;

      console.log('fdsfdsafds', data);

      const [watching, finished, toWatch] = data;
      const types = [watching, finished, toWatch];
      setListTypes(types);
    }
    getListsTypes();
  }, []);

  return (
    <Select.Root
      //   defaultValue={
      //     listType ? listType : selectedValue ? listTypes[selectedValue] : 'nada'
      //   }
      onValueChange={(newValue) => setSelectedValue(newValue)}
    >
      <Select.Trigger
        aria-label="listas"
        className="bg-zinc-100 border border-emerald-600 flex items-center justify-between gap-2 p-3 rounded-md text-emerald-600 w-1/2"
      >
        <Select.Value>
          {selectedValue
            ? listTypes.find((type) => type === selectedValue)
            : listType
            ? listTypes.find((type) => type === listType)
            : 'Selecione a lista'}
        </Select.Value>
        <Select.Icon>
          <CaretDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-zinc-100 text-emerald-600 overflow-hidden rounded-md drop-shadow-xl cursor-default">
          <Select.Viewport className="p-2">
            {listTypes.map((type) => (
              <Select.Item
                key={type}
                value={type}
                className="h-8 px-6 flex relative items-center rounded-md hover:bg-emerald-600 hover:text-zinc-200"
              >
                <Select.ItemIndicator className="absolute left-1">
                  <Check />
                </Select.ItemIndicator>

                <Select.ItemText>
                  {type === 'ASSISTINDO'
                    ? 'Assistindo'
                    : type === 'FINALIZADO'
                    ? 'Finalizado'
                    : 'Para assistir'}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
