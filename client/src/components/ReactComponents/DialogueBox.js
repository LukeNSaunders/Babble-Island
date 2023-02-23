import React, { useState, useEffect } from "react";

export default function DialogueBox({ message, setMessage }) {
  function boxClose() {
    setMessage("");
  }

  const [text, setText] = useState(message.initial);
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const [instantText, setInstantText] = useState("");

  useEffect(() => {
    if (!message.responseGood || message.responseGood === undefined) {
      setInstantText(message.initial);
    }
  }, []);

  console.log(instantText);

  console.log(message.res);

  if (message.responseGood && message.responseBad) {
    useEffect(() => {
      setIndex(0);

      setCurrentText("");
    }, [text]);

    useEffect(() => {
      if (index < text.length) {
        setTimeout(() => {
          setCurrentText(currentText + text[index]);
          setIndex(index + 1);
        }, 40);
      }
    }, [index, text, currentText]);
  }

  const handleClickGood = () => {
    setText(message.good[0]);
    setIsClicked(!isClicked);
  };
  const handleClickBad = () => {
    setText(message.bad[0]);
    setIsClicked(!isClicked);
  };

  return (
    <div className="message-box">
      <div className="close-message-box" onClick={boxClose}>
        {" "}
        X{" "}
      </div>

      {currentText && <h4>{currentText}</h4>}
      {instantText && <h4>{instantText}</h4>}

      {!isClicked ? (
        <div className="multiple-choice">
          {message.responseGood && (
            <div className="option-1" onClick={handleClickGood}>
              <p> {message.responseGood}</p>
            </div>
          )}
          {message.responseBad && (
            <div className="option-2" onClick={handleClickBad}>
              <p> {message.responseBad}</p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
