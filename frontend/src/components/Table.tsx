
export function Table() {
    return (
      <div className="h-96 overflow-scroll">
        <table className="w-full border-collapse">
          <thead className="text-left">
            <tr>
              <th className="p-4 bg-emerald-800 text-zinc-100 rounded-tl-md rounded-bl-md">
                Nome
              </th>
              <th className="p-4 bg-emerald-800 text-zinc-100">Episódios</th>
              <th className="p-4 bg-emerald-800 text-zinc-100">Nota</th>
              <th className="p-4 bg-emerald-800 text-zinc-100">Adicionado em</th>
              <th className="p-4 bg-emerald-800 text-zinc-100 rounded-tr-md rounded-br-md">
                Opções
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tl-md rounded-bl-md">
                Attack on Titan
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                25/25
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                9.5
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                10/10/2021
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tr-md rounded-br-md">
                Opções
              </td>
            </tr>
            <tr>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tl-md rounded-bl-md">
                Death Note
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                37/37
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                9.5
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                10/10/2021
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tr-md rounded-br-md">
                Opções
              </td>
            </tr>
            <tr>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tl-md rounded-bl-md">
                Naruto
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                220/220
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                9.5
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                10/10/2021
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tr-md rounded-br-md">
                Opções
              </td>
            </tr>
  
            <tr>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tl-md rounded-bl-md">
                Death Note
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                37/37
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                9.5
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200">
                10/10/2021
              </td>
              <td className="p-4 bg-zinc-100 border-t-4 bordet-t-zinc-200 rounded-tr-md rounded-br-md">
                Opções
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }