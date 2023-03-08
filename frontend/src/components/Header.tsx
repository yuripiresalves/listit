import Image from 'next/image';
import Link from 'next/link';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { CaretDown, User, Gear, SignOut } from 'phosphor-react';

import { GridContainer } from './GridContainer';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="py-4 bg-emerald-800 w-full">
      <GridContainer className="flex justify-between items-center text-zinc-200">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex items-center gap-4 cursor-pointer relative">
                <strong>Yuri Alves</strong>
                <Image
                  src="https://i.pravatar.cc/50"
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <CaretDown
                  size={18}
                  aria-hidden
                  className="group-data-[state='open']:rotate-180 transition-transform"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="animate-fadeIn absolute z-50 text-zinc-800 bg-zinc-100 rounded-md shadow-md p-2">
                <ul className="flex flex-col gap-4">
                  <Link href="/perfil">
                    <li className="flex items-center gap-2 hover:bg-gray-200 transition-colors p-2 rounded-md">
                      <User size={18} />
                      Meu perfil
                    </li>
                  </Link>
                  <Link href="/configuracoes">
                    <li className="flex items-center gap-2 hover:bg-gray-200 transition-colors p-2 rounded-md">
                      <Gear size={18} />
                      Configurações
                    </li>
                  </Link>
                  <button>
                    <li className="flex items-center gap-2 hover:bg-rose-200 transition-colors p-2 rounded-md">
                      <SignOut size={18} />
                      Sair
                    </li>
                  </button>
                </ul>
                <NavigationMenu.Link />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="animate-fadeIn flex items-end justify-center h-2 top-[85%] overflow-hidden z-10">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      </GridContainer>
    </header>
  );
}
