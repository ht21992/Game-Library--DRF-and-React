import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextTruncate from "react-text-truncate";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function GameItem(props) {
  const [isActive, setIsActive] = useState(props.is_fav);
  const [expanded, setExpanded] = React.useState(false);

  function FavButtonHandler(event) {
    setIsActive((current) => !current);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function FormSubmitHandler(event) {
    event.preventDefault();
    fetch(`/api/game/${props.id}`, {
      method: "PUT",
      body: JSON.stringify({ gameId: props.id, fav: isActive }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (isActive) {
        const perv_number = parseInt(
          document.getElementById("favcounter").innerHTML
        );
        document.getElementById("favcounter").innerHTML = perv_number + 1;
      } else {
        const perv_number = parseInt(
          document.getElementById("favcounter").innerHTML
        );
        document.getElementById("favcounter").innerHTML = perv_number - 1;
      }
    });
  }

  return (

    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{ maxWidth: 600}}
        style={{ marginTop: 100, padding: 20, alignItems: "center" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">

            <Link style={{ color:"black", textDecoration: 'none'}} id={props.id} to={`/game/${props.id}`}>{props.title}</Link>
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              style={{ fontSize: 10 }}
              size="small"
              color="primary"
              label={props.developer}
            />
            <Chip
              style={{ fontSize: 10 }}
              size="small"
              color="error"
              label={props.platforms}
            />
          </Stack>
          <Stack
            style={{ marginTop: 5, marginBottom: 5 }}
            direction="row"
            spacing={1}
          >
            <Chip
              style={{ fontSize: 10 , marginBottom:10}}
              size="small"
              color="success"
              label={props.genre}
              variant="outlined"
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            <TextTruncate
              line={3}
              element="span"
              truncateText="…"
              text={props.desc}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <form id={`${props.id}-fav-form`} onSubmit={FormSubmitHandler}>
            <IconButton
              onClick={FavButtonHandler}
              type="submit"
              style={{ color: isActive ? "#D65076" : "gray" }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </form>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <iframe style={{display: "block", marginBottom:10}}  src={props.video} width="420" height="250"></iframe>

          <Typography paragraph>
          {props.desc}
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
    </div>
  );
}

export default GameItem;
