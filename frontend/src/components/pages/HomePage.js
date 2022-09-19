import GamesList from "../games/GamesList";
import { useState, useEffect } from 'react';


function HomePage() {

  const [isLoading, setIsLoading] = useState(true);
  const [loadedGames, setLoadedGames] = useState([]);
//   getGamesList();

  useEffect(() =>{
    setIsLoading(true);
    fetch("/api/games")
    .then((response) => {
        return response.json();
      })
    .then((data) => {
        const games = [];
        for (const key in data) {
            const game = {
              id: key,
              ...data[key]
            };
            games.push(game);
        }
        setIsLoading(false);
        setLoadedGames(games);

      });

  },[]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <GamesList games={loadedGames} />
    </section>
  );
}

export default HomePage;
