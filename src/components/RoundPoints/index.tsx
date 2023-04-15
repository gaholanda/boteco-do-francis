import { useEffect, useState } from "react";
import { getTeamsRoundPoints } from "../../api/teams";
import { TeamsWithRoundPoints } from "../../models/points.interface";
import Loading from "../Loading";

import "../../styles/table.css";

function RoundPoints() {
  const [points, setPoints] = useState<TeamsWithRoundPoints>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPoints = () => {
      getTeamsRoundPoints().then((data) => {
        setPoints(data);
        setIsLoading(false);
      });
    };

    loadPoints();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="round-points">
        <h3 className="table-title">Parciais - Rodada {points?.round}</h3>

        <div className="table">
          <div className="table-head">
            <p className="position">Pos.</p>
            <p className="team">Time</p>
            <p className="points">Pontos</p>
          </div>
          <div className="table-teams">
            {points &&
              points.teams.length > 0 &&
              points.teams.map((team, i) => (
                <div key={team.time.time_id} className="team-standing">
                  <div className="position">
                    <p>{i + 1}</p>
                  </div>
                  <div className="info">
                    <p className="name">{team.time.nome}</p>
                    <p className="manager">{team.time.nome_cartola}</p>
                  </div>
                  <div className="points">
                    <p>{team.parcial_formatado || "0,00"}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RoundPoints;
