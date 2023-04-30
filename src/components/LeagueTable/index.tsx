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
          <p className="position">Pos.</p>
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
                    { i+1 <= 4 && <p className="libertadores">{i+1}</p>}
                    { i+1 >= 5 && i+1 <= 6 && <p className="pre-libertadores">{i+1}</p>}
                    { i+1 >= 7 && i+1 <= 12 && <p className="sul-americana">{i+1}</p>}
                    { i+1 >= 13 && i+1 <= 24 && <p className="limbo">{i+1}</p>}
                    { i+1 > 24 && <p className="zona">{i+1}</p>}
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
