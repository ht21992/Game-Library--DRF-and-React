import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/NavBar";


import AddGamePage from "./pages/AddGamePage";
import FavPage from "./pages/FavPage";
import HomePage from "./pages/HomePage";
import GameDetail from "./games/GameDetail";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/add-game" element={<AddGamePage />}></Route>
        <Route path="/favs" element={<FavPage />}></Route>
        <Route path="/game/:id" element={<GameDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
