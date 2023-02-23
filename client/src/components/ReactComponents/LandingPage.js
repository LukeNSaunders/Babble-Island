import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import start from "../../pixel/start.png";
import exit from "../../pixel/exit.png";

function LandingPage(props) {
  const navigate = useNavigate();

  function startGame() {
    navigate("/game");
  }

  function returnToLogin() {
    navigate("/");
  }
  return (
    <div className="babble-island">
      <h1 className="welcome">Welcome {props.user.nickName || "stranger"} </h1>

      <div class="menu-items">
        <div class="menu-button" onClick={startGame}>
          <img src={start} />
        </div>

        <div class="menu-button" onClick={returnToLogin}>
          <img src={exit} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
