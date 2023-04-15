import axios from 'axios';
import { API } from ".";
import { Team } from '../models/team.interface';
import { getPlayersPoints } from './points';
import { TeamsWithRoundPoints } from '../models/points.interface';

export function getTeam(id: number) {
  return API.get<Team>(`time/id/${id}`);
}

export function getAllTeams() {
  const teamsIds = [
    1855965,  // Andrade
    29182677, // Bombom Caribe
    14655616, // Botafuogo
    3697534,  // CardosoTavares
    2225316,  // CRCintra
    4909409,  // Deportivo Meridian
    377503,   // Expresso Vascaíno
    28815092, // Felina
    9426785,  // Fla shiploader
    8998258,  // Fludsnense
    26328142, // Giozcracia Futebol e Churrasco
    13549,    // Hulk, o Magnata
    25669404, // Iza
    4499126,  // Jontex
    26107038, // JulyFlu
    4829269,  // Lina
    9584044,  // Los Cruzmaltinos
    47894534, // Looksantos
    3664877,  // Luganete
    45097186, // Luisoas FC
    4846381,  // Mauritsstad
    8948301,  // MERLANAT
    3208993,  // NasceuCampeão
    4440734,  // Passos Dias Aguiar
    14941817, // Perdidos em Cena
    28871985, // Sapucaia Forever
    670577,   // Skambull
    19089724, // StarFogo
    4904260,  // Yancheng Han
  ];

  const requests = teamsIds.map((id) => getTeam(id));
  return axios.all(requests);
}

export async function getTeamsRoundPoints(): Promise<TeamsWithRoundPoints> {
  const { data: points } = await getPlayersPoints();
  const teams = await getAllTeams();
  const teamsWithPoints: Team[] = [];
  let teamPoints = 0;

  teams.map(({ data: team }) => {
    if(team.atletas) {
      team.atletas.map((player, i) => {
        Object.keys(points.atletas).map((key) => {
          if(key === `${player.atleta_id}`) {
            if(points.atletas[player.atleta_id].pontuacao){
              teamPoints += team.capitao_id === player.atleta_id ? points.atletas[player.atleta_id].pontuacao * 1.5 : points.atletas[player.atleta_id].pontuacao;
            }
          }
        })
  
        if(i === team.atletas.length - 1) {
          team.parcial = teamPoints;
          team.parcial_formatado = (teamPoints - Math.floor(teamPoints)) !== 0 ? teamPoints.toFixed(2).replace('.',',') : `${teamPoints},00`;
          teamPoints = 0;
          teamsWithPoints.push(team);
        }
      })
    }
  });

  const orderedByRoundPoints = teamsWithPoints.sort((a, b) => b.parcial! - a.parcial!);

  return {
    round: points.rodada,
    teams: orderedByRoundPoints
  };

}