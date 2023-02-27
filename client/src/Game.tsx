import Phaser from 'phaser';
import React from 'react';
import { useEffect, useState } from 'react';
import DialogueBox from './components/ReactComponents/DialogueBox.tsx';
import Frame from './components/ReactComponents/Frame.tsx';
import Preloader from './components/scenes/Preloader.ts';
import MiniGame1 from './components/scenes/MiniGame1.ts';
import MiniGame2 from './components/scenes/MiniGame2.ts';
import Map from './components/scenes/Map';
import { useNavigate } from 'react-router-dom';
import { refreshUser, updateStars } from './ApiClient';


type Message = {
  initial: string;
  responseGood?: string;
  responseBad?: string;
  good?: string[] | undefined ;
  bad?: string[] | undefined;
  setMessage: (Message: string) => void;
};

type GameProps = {
  user: any;
  setUser: (value: any) => void;
  characterList: Message;
}
function Game({ user, setUser, characterList }:GameProps) :JSX.Element {
  const [message, setMessage] = useState<Message>();
  const [stars, setStars] = useState<number | undefined>();
  const [isCharacterActiveOrNot, setisCharacterActiveOrNot] = useState<boolean>();
  const [isEventTriggered, setIsEventTriggered] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    new Phaser.Game({
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 0 },
        },
      },
      scene: [Preloader, MiniGame1, MiniGame2, Map],
      scale: {
        zoom: 1.5,
        parent: 'phaser-game',
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });

    refreshUser().then((data) => {
      if (data) {
        setUser(data);
      }
    });
  }, []);

  const addOneStar = async (id:string) => {
    try {
      const star = await updateStars(id);
    } catch (error) {
      console.log(error);
    }
  };

  // LISTEN OUT FOR CHARACTER DIALOG

  const reactCharacterListener = ({ detail }: any) => {
    const character = detail.character.data.list.character;

    switch (character) {
      case 'character1':
        setMessage(characterList[0]);
        break;
      case 'character2':
        setMessage(characterList[1]);
        break;
      case 'character3':
        setMessage(characterList[2]);
        break;
      case 'sign1':
        setMessage(characterList[5]);
        break;
      case 'sign2':
        setMessage(characterList[6]);
        break;
      case 'sign3':
        setMessage(characterList[7]);
        break;
      case 'sign4':
        setMessage(characterList[8]);
        break;
    }
  };
  window.addEventListener('react', reactCharacterListener);

  useEffect(() => {
    const isCharacterActiveListener = ({ detail } : any) => {
      if (!detail.characterActiveOrNot) setMessage('');
      setisCharacterActiveOrNot(detail.characterActiveOrNot);
    };
    window.addEventListener('isActiveOrNot', isCharacterActiveListener);
  }, [isCharacterActiveOrNot]);

  // LISTEN OUT FOR STARS COLLECTED

  useEffect(() => {
    const reactCollectStarsListener = () => {
      if (!isEventTriggered) {
        setIsEventTriggered(true);
        setUser((prevUser) => ({ ...prevUser, stars: prevUser.stars + 1 }));
        addOneStar(user._id);
        setTimeout(() => {
          setIsEventTriggered(false);
        }, 1000);
      }
    };
    window.addEventListener('starCollected', reactCollectStarsListener);
    return () => {
      window.removeEventListener('starCollected', reactCollectStarsListener);
    };
  }, [user, isEventTriggered]);

  const navigateToLibrary = () => {
    navigate('/library');
  };
  window.addEventListener('library', navigateToLibrary);

  const navigateToMiniGame1 = () => {
    navigate('/miniGame1');
  };
  window.addEventListener('miniGame1', navigateToMiniGame1);

  return (
    <>
      {message && <DialogueBox message={message} setMessage={setMessage} />}
      <div id='phaser-game'></div>
      <Frame user={user} setUser={setUser} stars={stars} setStars={setStars} />
    </>
  );
}

export default Game;
