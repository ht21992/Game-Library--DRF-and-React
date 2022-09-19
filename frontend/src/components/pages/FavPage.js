import { useState, useEffect } from 'react';
import GamesList from "../games/GamesList";

function FavPage(props){
    const [isLoading, setIsLoading] = useState(true);
    const [loadedGames, setLoadedGames] = useState([]);
    useEffect(() =>{
        setIsLoading(true);
        fetch("/api/favs")
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
          <h1>Fav Games</h1>
          <GamesList games={loadedGames} />
        </section>
      );
}

export default FavPage