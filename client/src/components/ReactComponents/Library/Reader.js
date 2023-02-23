import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../../../ApiClient.js";
import Book from "./Book.js";
import sky from "../../../pixel/sky.png";
import exit from "../../../pixel/exit_from_library.png";
import Story from "./Story.js";
import "./library.css";
import ChatGPT from "./ChatGPT.js";

function Reader({ user, setUser }) {
  const [stories, setStories] = useState([]);
  const [currentBook, setCurrentBook] = useState({});

  const [chatGptResponse, setChatGptResponse] = useState({});

  const [isClicked, setIsClicked] = useState(false);

  // const [soundUrl, setSoundUrl] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getBooks()
      .then((data) => {
        console.log(data[0].title);

        if (data) setStories([...data]);
      })
      .catch((e) => console.log(e));
  }, []);

  function backToGame() {
    navigate("/game");
  }

  const chatGptNotAuthorisedMessage =
    "You need to collect at least 1 star to have access to this feature.";

  const userStars = 2;

  function checkForAuthorisedOrNot() {
    if (userStars > 1) {
      setIsClicked(!isClicked);
    }
  }

  return (
    <>
      <div className="reader">
        <div className="antiquewhite">
          <img className="sky" src={sky} />
        </div>

        <img className="exit" onClick={backToGame} src={exit} />
        <div>
          <h1 onClick={checkForAuthorisedOrNot}>Tell Me A Story About</h1>
          {isClicked && (
            <div>
              <ChatGPT
                chatGptResponse={chatGptResponse}
                setChatGptResponse={setChatGptResponse}
              />
            </div>
          )}
        </div>

        <div className="stories-container">
          {stories.map((book) => {
            return (
              <div className="story" key={book._id}>
                <Book
                  book={book}
                  setCurrentBook={setCurrentBook}
                  currentBook={currentBook}
                />
              </div>
            );
          })}
        </div>
        <Story
          currentBook={currentBook}
          chatGptResponse={chatGptResponse}
          user={user}
          setUser={setUser}
          chatGptNotAuthorisedMessage={chatGptNotAuthorisedMessage}
        />
      </div>
    </>
  );
}

export default Reader;
