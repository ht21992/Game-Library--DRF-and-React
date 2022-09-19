import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";


function GameDetail(props) {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [game, setLoadedGame] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/game/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedGame(data);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (

    <Container component="main" sx={{ mt: 12, mb: 2 }}>
        <Box
        component="img"
        sx={{
          height: 500,
          width: '100%',

        }}
        alt={game.title}
        src={game.image}
      />
      <Typography variant="h2" component="h1" gutterBottom>
        {game.title}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Chip
          style={{ fontSize: 10 }}
          size="small"
          color="primary"
          label={game.developer}
        />
        <Chip
          style={{ fontSize: 10 }}
          size="small"
          color="error"
          label={game.platforms}
        />

        <Chip
          style={{ fontSize: 10, marginBottom: 10 }}
          size="small"
          color="success"
          label={game.genre}
          variant="outlined"
        />
      </Stack>

      <Typography variant="body2" gutterBottom>
        {game.desc}
      </Typography>
        <div style={{width:560, height:349, margin:" 0 auto"}}>
        <iframe style={{marginTop:100,marginBottom:100, display: "block"}}  width="560" height="349" src={game.video}></iframe>
        </div>
    </Container>
  );
}

export default GameDetail;
