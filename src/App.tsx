import { useEffect, useState } from "react";
import LeagueTable from "./components/LeagueTable";
import RoundPoints from "./components/RoundPoints";

function App() {

  const [content, setContent] = useState<string>();

  useEffect(() => {
    setContent('standings');
  }, [])

  function handleButtonClick(value: string) {
    setContent(value);
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Liga Boteco do Francis</h1>
      <div className="app-options">
        <button className={content === 'standings' ? 'active' : ''} onClick={() => handleButtonClick('standings')}>Classificação</button>
        <button className={content === 'points' ? 'active' : ''} onClick={() => handleButtonClick('points')}>Parciais</button>
      </div>
      { content === 'standings' && <LeagueTable />}
      { content === 'points' && <RoundPoints />}
    </div>
  )
}

export default App;
