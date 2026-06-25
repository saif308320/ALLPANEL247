import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import AccountStatement from "./pages/AccountStatement/AccountStatement";
import CurrentBet from "./pages/CurrentBet/CurrentBet";
import CasinoResults from "./pages/CasinoResults/CasinoResults";
import FootballGame from './pages/Games/FootballGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account-statement" element={<AccountStatement />} />
        <Route path="/current-bet" element={<CurrentBet />} />
        <Route path="/casino-results" element={<CasinoResults />} />
        <Route path="/game/football" element={<FootballGame />} />
        <Route path="/game/cricket" element={<FootballGame />} />
        <Route path="/game/andar-bahar" element={<FootballGame />} />
        <Route path="/game/baccarat" element={<FootballGame />} />
      </Routes>
    </Router>
  );
}

export default App;