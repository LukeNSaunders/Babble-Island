import React, { useEffect, useState } from "react";

type Message = {
  initial: string;
  responseGood?: string;
  responseBad?: string;
  good?: string[] | undefined ;
  bad?: string[] | undefined;
};

type DialogueBoxProps = {
  message: Message;
  setMessage: (Message: string) => void;
};

 export default function DialogueBox ({ message, setMessage } : DialogueBoxProps) : JSX.Element{
  
    function boxClose() {
    setMessage("");
  }

  const [text, setText] = useState<string>(message.initial);
  const [currentText, setCurrentText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [instantText, setInstantText] = useState<string>("");

  useEffect(() => {
    if (!message.responseGood || message.responseGood === undefined) {
      setInstantText(message.initial);
    }
  }, []);

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
    if (message.good) setText(message.good[0]);
    setIsClicked(!isClicked);
  };
  const handleClickBad = () => {
   if(message.bad) setText(message.bad[0]);
    setIsClicked(!isClicked);
  };

  return (
    <>
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
    </>
  );
}

