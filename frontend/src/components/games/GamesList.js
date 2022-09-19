import GameItem from "./GameItem";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function GamesList(props){

    return (

      <Box sx={{ width: '100%' }}>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

      {props.games.map((game) => (
            <Grid item xs={6} key = {game.id}>
            <GameItem
              key = {game.id}
              id = {game.id}
              title={game.title}
              image={game.image}
              desc={game.desc}
              developer={game.developer}
              platforms={game.platforms}
              genre={game.genre}
              is_fav={game.is_fav}
              video={game.video}
            />
        </Grid>
      ))}


      </Grid>

    </Box>


      );
}

export default GamesList



// <ul>
//          {props.games.map((game) => (

// <GameItem
//   key = {game.id}
//   id = {game.id}
//   title={game.title}
//   image={game.image}
//   desc={game.desc}
//   developer={game.developer}
//   platforms={game.platforms}
//   genre={game.genre}
//   is_fav={game.is_fav}
// />


// ))}
//       </ul>