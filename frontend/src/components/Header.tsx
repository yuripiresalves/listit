import Image from 'next/image';
import Link from 'next/link';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { CaretDown, User, Gear, SignOut, SignIn } from 'phosphor-react';

import { GridContainer } from './GridContainer';
import { Logo } from './Logo';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function Header() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className="py-4 bg-emerald-800 w-full">
      <GridContainer className="flex justify-between items-center text-zinc-200 relative">
        <Link href="/">
          <Logo size="sm" />
        </Link>

        {user ? (
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="group flex items-center gap-4 cursor-pointer">
                  <strong>{user?.name}</strong>
                  <Image
                    src={
                      user?.urlImage ||
                      `https://eu.ui-avatars.com/api/?name=${user?.name}&size=250`
                    }
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
                <NavigationMenu.Content className="animate-fadeIn mt-1 absolute right-7 z-50 text-zinc-800 bg-zinc-100 rounded-md shadow-md p-2">
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
                    <button onClick={signOut}>
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
        ) : (
          <Link
            href="/entrar"
            className="flex items-center gap-3 bg-transparent border-2 border-zinc-200 font-bold text-lg px-4 py-2 rounded-lg hover:bg-zinc-200 hover:text-emerald-800 transition-all"
          >
            <SignIn size={18} weight="bold" />
            Entrar
          </Link>
        )}
      </GridContainer>
    </header>
  );
}
