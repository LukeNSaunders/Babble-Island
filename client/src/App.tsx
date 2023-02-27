import Login from "./components/ReactComponents/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Story from "./components/ReactComponents/Library/Story";
import Reader from "./components/ReactComponents/Library/Reader";
import Game from "./Game.tsx";
import Register from "./components/ReactComponents/Register";
import LandingPage from "./components/ReactComponents/LandingPage";
import { useState, useEffect } from "react";
import { fetchCharacters } from "./ApiClient";
import React from "react";

function App() {
  const [user, setUser] = useState<any>({});
  const [characterList, setCharacterList] = useState<string[]>([]);

  useEffect(() => {
    setUser(user);
  }, []);

  useEffect(() => {
    fetchCharacters().then((data: any) => {
      if (data) setCharacterList(data);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route
          path="/game"
          element={
            <Game
              user={user}
              setUser={setUser}
              characterList={characterList}
              setCharacterList={characterList}
            />
          }
        />
        <Route path="/landing" element={<LandingPage user={user} />} />
        <Route path="/story" element={<Story />} />
        <Route
          path="/library"
          element={<Reader user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
