import { GridContainer } from '@/components/GridContainer';
import { Table } from '@/components/Table';
import * as Tabs from '@radix-ui/react-tabs';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | listit</title>
        <meta
          name="description"
          content="Listit - Organize seus animes preferidos em listas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-10">
        <GridContainer>
          <h2 className="text-2xl font-bold text-emerald-700 mb-8">
            Minhas listas
          </h2>
          <Tabs.Root defaultValue="all">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
              <Tabs.List>
                <Tabs.Trigger
                  value="all"
                  className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                >
                  <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                    Todos
                  </span>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.List>
                <Tabs.Trigger
                  value="watching"
                  className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                >
                  <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                    Assistindo
                  </span>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.List>
                <Tabs.Trigger
                  value="finished"
                  className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                >
                  <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                    Finalizados
                  </span>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.List>
                <Tabs.Trigger
                  value="toWatch"
                  className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                >
                  <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                    Para assistir
                  </span>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.List>
                <Tabs.Trigger
                  value="favorites"
                  className="w-full text-zinc-500 data-[state='active']:text-emerald-900 data-[state='active']:bg-emerald-100 data-[state='active']:hover:text-emerald-900 data-[state='active']:border-emerald-500 border border-zinc-400 rounded-md hover:text-emerald-900 hover:border-emerald-500"
                >
                  <span className="font-bold text-sm md:text-md rounded-md p-4 flex flex-col gap-4">
                    Favoritos
                  </span>
                </Tabs.Trigger>
              </Tabs.List>
            </div>
            <Tabs.Content value="all">
              <Table />
            </Tabs.Content>
            <Tabs.Content value="watching">
              <Table />
            </Tabs.Content>
            <Tabs.Content value="finished">
              <Table />
            </Tabs.Content>
            <Tabs.Content value="toWatch">
              <Table />
            </Tabs.Content>
            <Tabs.Content value="favorites">
              <Table />
            </Tabs.Content>
          </Tabs.Root>
        </GridContainer>

      </section>
    </>
  );
}
