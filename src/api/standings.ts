import { getAllTeams } from "./teams";

export async function getStandings(){
  const responses = await getAllTeams();
  const standings = responses.map(({ data }) => {
    if(data.pontos) {
      data.pontos_formatado = (data.pontos - Math.floor(data.pontos)) !== 0 ? data.pontos.toFixed(2).replace('.',',') : `${data.pontos},00`;
    }

    if(data.pontos_campeonato) {
      data.pontos_campeonato_formatado = (data.pontos_campeonato - Math.floor(data.pontos_campeonato)) !== 0 ? data.pontos_campeonato.toFixed(2).replace('.',',') : `${data.pontos_campeonato},00`;
    }
    return data;
  });

  const orderedByPoints = standings.sort((a, b) => b.pontos_campeonato - a.pontos_campeonato);

  return orderedByPoints;
}