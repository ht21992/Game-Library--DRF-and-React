import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';


// const navItems = ['Game List', 'Add Game', 'Favourites'];
const navItems = [{'text':'Game List','url':'/'}, {"text":'Add Game', 'url':'/add-game'}, {'text':'Favourites', 'url':'/favs'}];
function Navbar() {

    return (
      <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"

            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography

            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Game Library
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item['text']} sx={{ color: '#fff' }} style={{marginRight:5}}>
                <Link style={{ color: '#fff', textDecoration: 'none'}}  to={item['url']}>{item['text']}</Link>
              </Button>

            ))}

            <span id = 'favcounter'>{context.fav_counter}</span>



          </Box>
        </Toolbar>
      </AppBar>
        </Box>
      );
}

export default Navbar;


