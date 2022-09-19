import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useRef } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Routes, Route, Link, Redirect } from "react-router-dom";

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function AddGamePage() {

  const successBannerRef = useRef();
  const errorBannerRef = useRef();
  const titleInputRef = useRef();
  const developerInputRef = useRef();
  const platformsInputRef = useRef();
  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const genreInputRef = useRef();
  const descriptionInputRef = useRef();





  function FormSubmitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredVideo = videoInputRef.current.value;
    const enteredDeveloper = developerInputRef.current.value;
    const enteredPlatforms = platformsInputRef.current.value;
    const enteredGenere = genreInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const Gamedata = {
      title: enteredTitle,
      image: enteredImage,
      video:enteredVideo,
      developer: enteredDeveloper,
      platforms:enteredPlatforms,
      genre:enteredGenere,
      desc: enteredDescription,
    };
    console.log(enteredDescription)
    fetch(
      "/api/games/",
      {
        method: 'POST',
        body: JSON.stringify(Gamedata),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken

        }
      }
    ).then((response) => FormStatus(response.status))
  }


  function FormStatus(status){

      if(status == 200){
        console.log(status)
        successBannerRef.current.style.display = "flex"
        $("input:text").val("");
        $('textarea').val('');

      }

      else{
        console.log(status)
        errorBannerRef.current.style.display = "flex"

      }

  }


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <Card
        style={{
          marginTop: 100,
          padding: 20,
          alignItems: "center",
          width: "40%",
        }}
      >
        <CardContent >
        <Alert severity="success"  style={{display:"none"}} ref={successBannerRef}>
        <AlertTitle>Success</AlertTitle>
        Game has been added <strong><Link style={{ color: 'black', textDecoration: 'none'}} to='/'>Click Here</Link></strong>
      </Alert>
      <Alert severity="error" style={{display:"none"}}  ref={errorBannerRef}>
        <AlertTitle>Error</AlertTitle>
        Something is wrong, please check your inputs
      </Alert>
          <Typography variant="h6" gutterBottom style={{marginTop:10}}>
          Add New Game
      </Typography>
      <Box component="form" noValidate onSubmit={FormSubmitHandler} sx={{ mt: 3 }}>
      <Grid container spacing={3} >
        <Grid item xs={12} md={6}>
          <TextField
            inputRef={titleInputRef}
            required
            id="Game Title"
            label="Game Title"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            inputRef ={genreInputRef}
            required
            id="Genre"
            label="Action,Horror,..."
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            inputRef ={developerInputRef}
            required
            id="developer"
            label="Rockstar"
            fullWidth

            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            inputRef ={platformsInputRef}
            required
            id="platforms"
            label="PS5, Xbox Series X,..."
            fullWidth
            variant="standard"
          />

        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            inputRef={imageInputRef}
            required
            id="image url"
            label="Image Url"
            fullWidth
            variant="standard"
          />

        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            inputRef={videoInputRef}
            required
            id="video url"
            label="Video Url"
            fullWidth
            variant="standard"
          />

        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            inputRef = {descriptionInputRef}
            required
            multiline
            rows={10}
            id="desc"
            label="Game Description"
            fullWidth
            variant="standard"
          />

        </Grid>

      </Grid>
      <Button type="submit" style={{marginTop:30}} variant="contained" onSubmit={FormSubmitHandler} endIcon={<SportsEsportsIcon />}>
        Submit Game
      </Button>
      </Box>

        </CardContent>
      </Card>

    </div>
  );
}

export default AddGamePage;
