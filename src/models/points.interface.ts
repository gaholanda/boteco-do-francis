import { Team } from "./team.interface";

export interface Points {
  atletas: any;
  rodada: number;
}

export interface TeamsWithRoundPoints {
  round: number;
  teams: Team[];
}