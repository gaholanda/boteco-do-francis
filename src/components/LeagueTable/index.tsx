import { useEffect, useState } from 'react';
import { Team } from '../../models/team.interface';

import data from '../../data/standings.json';
import '../../styles/table.css';

function LeagueTable() {

  const [standings, setStandings] = useState<Team[]>();

  useEffect(() => setStandings(data), [])

  return (
    <>
    <div className="league-table">
      <h3 className="table-title">Classificação</h3>

      <div className="table">
        <div className="table-head">
          <p className="position">#</p>
          <p className="team">Time</p>
          <p className="points">Pontos</p>
        </div>
        <div className="table-teams">
          {
            standings && standings.length > 0 &&
            standings.map(
              (standing, i) => (
                <div key={standing.time.time_id} className="team-standing">
                  <div className="position">
                    { i+1 <= 15 && <p className="serie-a">{i+1}</p>}
                    { i+1 >= 16 && <p className="serie-b">{i+1}</p>}
                  </div>
                  <div className="info">
                    <p className="name">{standing.time.nome}</p>
                    <p className="manager">{standing.time.nome_cartola}</p>
                  </div>
                  <div className="points">
                    <p>{standing.pontos_campeonato_formatado || '0,00'}</p>
                  </div>
                </div>
              ) 
            )
          }

        </div>
      </div>
    </div>
    </>
  )
}

export default LeagueTable;
