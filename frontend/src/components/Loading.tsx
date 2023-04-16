export function Loading() {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-700"></div>
        <h1 className="text-2xl font-bold text-zinc-900 mt-4">Carregando...</h1>
      </div>
    );
  }