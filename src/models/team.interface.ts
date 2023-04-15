import { Player } from "./player.interface";

export interface Team {
  atletas: Player[];
  time: {
    nome: string;
    nome_cartola: string;
    time_id: number;
  };
  capitao_id: number;
  pontos: number;
  pontos_campeonato: number;
  pontos_formatado?: string;
  pontos_campeonato_formatado?: string;
  patrimonio: number;
  valor: number;
  parcial?: number;
  parcial_formatado?: string;
}
