import Head from 'next/head';
import Image from 'next/image';
import { Star } from 'phosphor-react';
import { GridContainer } from '../../components/GridContainer';

export default function AnimeDetails() {
  return (
    <>
      <Head>
        <title>Detalhe | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes em listas"
        />
      </Head>

      <GridContainer className="mt-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Death Note</h1>
        <div className="flex flex-col items-center lg:flex-row gap-10 pb-4">
          <Image
            src="https://cdn.myanimelist.net/images/anime/9/9453l.jpg"
            width={220}
            height={180}
            alt="Death Note"
            className="lg:w-40"
          />
          <div className="flex flex-col justify-between bg-zinc-100 py-4 px-10 rounded-md max-w-5xl">
            <div>
              <span className="text-lg">Sinopse:</span>
              <p className="mt-2 leading-relaxed ">
                Light Yagami é um estudante do ensino médio que está entediado
                com a vida. Um dia, ele encontra um caderno misterioso chamado
                "Death Note", que permite que o usuário mate qualquer pessoa
                cujo nome seja escrito nele. Light decide testar o Death Note,
                matando um criminoso que estava escapando da polícia. Ele então
                decide usar o Death Note para criar um mundo livre da
                criminalidade, começando pela eliminação de todos os criminosos
                do mundo. A polícia, no entanto, envia um detetive chamado L
                para investigar o caso, e os dois começam uma batalha de
                inteligência para descobrir a identidade do usuário do Death
                Note.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-16 gap-8 mt-6">
              <div className="flex flex-col gap-3">
                <span>
                  <strong className="font-bold">Nota:</strong> 8.63
                </span>
                <span>
                  <strong className="font-bold">Episódios:</strong> 37
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

    </>
  );
}