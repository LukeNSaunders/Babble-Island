import React from "react";
import Words from "./Words.js";
import "./library.css";
import { useState, useEffect } from "react";
import ChatGPT from "./ChatGPT.js";

function Story({ currentBook, user, setUser, chatGptResponse, soundUrl }) {
  const [text, setText] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const story = currentBook.story;

  // if (user.stars > 1) setAuthorised(true);

  // useEffect(() => {
  //   setUser(user);
  // }, []);

  useEffect(() => {
    setIndex(0);
    if (chatGptResponse.story) {
      setText(chatGptResponse.story);
    }
    if (story) {
      setText(story);
    }
  }, [story, chatGptResponse.story]);

  const storyArray = objectify(currentText);
  function objectify(story) {
    if (story) {
      let arrayOne = story.split(" ");
      let objectArray = [];
      arrayOne.forEach((element) => {
        objectArray.push({ word: element });
      });
      return objectArray;
    }
  }

  // SLOW READER

  useEffect(() => {
    // setIndex(0);
    setCurrentText("");
    console.log(text);
  }, [text]);

  useEffect(() => {
    if ((chatGptResponse.story || story) && index < text.length) {
      setTimeout(() => {
        setCurrentText(currentText + text[index]);
        setIndex(index + 1);
      }, 50);
    }
  }, [index, text, currentText]);

  return (
    <div className="current">
      <div className="story-box">
        {currentText &&
          storyArray.map((word, index) => {
            return <Words word={word} key={index} />;
          })}
      </div>
      <div className="right">
        <img className="cover-book" src={currentBook.cover} />
        {currentBook && (
          <audio
            autoPlay
            controls
            name="media"
            src={`http://localhost:4000/${currentBook.storyUrl}`}
            type="audio/mpeg"
          ></audio>
        )}
      </div>
    </div>
  );
}

export default Story;
