
import Login from "./components/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom"
// import Register from "./components/Register";
import {useEffect} from 'react'
import Phaser from 'phaser'
import Preloader from './components/src/preloader'
import Map from './components/src/Map'
import MiniGame1 from './components/src/MiniGame1'
import MiniGame2 from './components/src/MiniGame2'

function App() {

useEffect(()=>{
  const config = {
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        debug:false,
        gravity: { y: 0},
      },
  
    },
    scene: [Preloader ,MiniGame1, MiniGame2,  Map],
    scale: {
      zoom: 1.5,
      parent: 'phaser-game',
      width: window.innerWidth,
      height: window.innerHeight,
    },
  }
  const game = new Phaser.Game(config)
console.log(game)
},[])
 
  return (
<div id="phaser-game">
  I'm a happy React App!!!
   
     

      
    </div>
  );
}

export default App;