import './App.css'
import { useEffect, useState } from 'react'

const data = {
  persons: [
    {
      name: 'Captain Falakofalako',
      wins: 62,
      losses: 49,
      elo: 1240
    },
    {
      name: 'Carlos Magnussen',
      wins: 322,
      losses: 54,
      elo: 2844
    },
    {
      name: 'Dan Hibiki',
      wins: 12,
      losses: 86,
      elo: 840
    },
    {
      name: 'Hasko Curly',
      wins: 65,
      losses: 87,
      elo: 1336
    },
    {
      name: 'Sharoka',
      wins: 133,
      losses: 155,
      elo: 1234
    },
    {
      name: 'Don Abrammov',
      wins: 232,
      losses: 141,
      elo: 1422
    },
    {
      name: 'Pudit Jolgar',
      wins: 522,
      losses: 232,
      elo: 2660
    }
  ]
}


const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      <div className='buttonText'>{props.text}</div>
    </button>
  )
}


const PersonTable = ({ persons, sortBy, setSortBy }) => {

  persons.sort((a, b) => b.elo - a.elo)//sort by higher elo to calculate ranking
  persons.map((person, index) => person.rank = index + 1)// add ranking
  persons.map((person) => person.percentage = person.wins / (person.wins + person.losses))// add ranking

  if (sortBy === 'elo') {
    //do nothing, since sort has already happened
  }

  if (sortBy === 'name') {
    persons.sort((a, b) => a.name.localeCompare(b.name))
    console.log("sort by name")
  }

  if (sortBy === 'percentage') {
    persons.sort((a, b) => b.percentage - a.percentage)
    console.log("sort by name")
  }

  return (

    <table id='personTable'>
      <thead>
        <tr>
          <td onClick={() => setSortBy('elo')}>#</td>
          <td onClick={() => setSortBy('name')}>name</td>
          <td onClick={() => setSortBy('percentage')}>W/L(%)</td>
          <td onClick={() => setSortBy('elo')}>elo</td>
        </tr>
      </thead>
      <tbody>
        {persons.map(person => <tr key={person.name}>
          <td>{person.rank}</td>
          <td>{person.name}</td>
          <td>{person.wins} - {person.losses}({(person.wins / (person.wins + person.losses)).toFixed(2)})</td>
          <td>{person.elo}</td>
        </tr>)}

      </tbody>
    </table>
  )
}

const Navigation = ({ setNavigate }) => {

  return (
    <div id='navigation'>
      <Button class text="standings" onClick={() => setNavigate("standings")}></Button>
      <Button text="record game" onClick={() => setNavigate("record_game")}></Button>
      <Button text="history" onClick={() => setNavigate("history")}></Button>
    </div>
  )
}


const Display = ({ navigate, players, sortBy, setSortBy }) => {
  if (navigate === "standings") {
    return (
      <PersonTable persons={players} sortBy={sortBy} setSortBy={setSortBy} />
    )

  }
  else {
    return (<div></div>)
  }
}


const PlayerAddButton = ({ setPlayerform }) => {

  return (
    <Button text="+player" onClick={(() => setPlayerform(true))} ></Button>
  )
}

const addCreatedPlayer = (playerFormContent) => (e) => {
  e.preventDefault()
  const playerObject = {
    name: playerFormContent,
    wins: 0,
    losses: 0,
    elo: 1200
  }
  console.log(playerObject)
}

const PlayerAddWindow = ({ playerForm }) => {

  const [playerFormContent, setPlayerFromContent] = useState('asdads')

  const handlePlayerFormOnChange = (event) => {
    console.log(event.target.value)
    setPlayerFromContent(event.target.value)
  }

  if (playerForm) {
    return (
      <form onSubmit={addCreatedPlayer(playerFormContent)}>
        <label>
          Name:
          <input type="text" name="name" value={playerFormContent} onChange={handlePlayerFormOnChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
    )
  } else {
    return (<></>)
  }
}

function App() {
  const [players, setPlayers] = useState([])
  const [navigate, setNavigate] = useState('standings')
  const [sortBy, setSortBy] = useState('elo')
  const [playerForm, setPlayerform] = useState(false)



  const addPlayer = (player) => {
    setPlayers(players.concat(player))
  }


  useEffect(() => { setPlayers(data.persons) }, [])

  return (
    <div id="all">
      <div id="main">
        <Navigation setNavigate={setNavigate}></Navigation>

        <Display navigate={navigate} players={players} sortBy={sortBy} setSortBy={setSortBy}></Display>
      </div>

      <div id='sideBar'>
        <PlayerAddButton setPlayerform={setPlayerform} />
        <PlayerAddWindow playerForm={playerForm} />
      </div>
    </div>

  );
}

export default App;
