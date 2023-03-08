import Image from 'next/image';

import AppPreviewImg from '../../public/appMockup.png';
import { Logo } from './Logo';

export function AsideBanner() {
  return (
    <aside className="hidden bg-emerald-800 md:flex flex-col flex-1 items-center justify-between p-8 text-zinc-200">
      <main className="flex flex-col items-center">
        <Logo />
        <p className="text-center my-6">
          Organize seus animes preferidos em listas
        </p>
        <Image
          src={AppPreviewImg}
          alt="Imagem mostrando o app Listit em um celular, notebook e tablet"
          width={600}
          priority
          quality={100}
          className=" 2xl:w-full"
        />
      </main>
      <footer>
        <span>© Todos os direitos reservados.</span>
      </footer>
    </aside>
  );
}
