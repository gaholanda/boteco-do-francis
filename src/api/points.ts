import { API } from ".";
import { Points } from "../models/points.interface";

export function getPlayersPoints() {
  return API.get<Points>('/atletas/pontuados');
}