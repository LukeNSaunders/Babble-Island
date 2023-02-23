import React, { useState } from "react";
import { defineWord, translateWord } from "../../../ApiClient.js";
import TranslationBox from "./TranslationBox.js";
import "./library.css";

function Words({ word }) {
  const [displayTranslation, seDisplayTranslation] = useState(false);
  const [translatedWord, setTranslatedWord] = useState("");
  const [definition, setDefinition] = useState();

  async function translate() {
    const translation = await translateWord(word.word);
    const definition = await defineWord(word.word);
    setTranslatedWord(translation.data.translations[0].translatedText);
    seDisplayTranslation(!displayTranslation);
    console.log(definition);
  }

  return (
    <div>
      <div className="individual-word" onClick={translate}>
        <p> {word.word} </p>
      </div>
      {displayTranslation && (
        <div className="translation-box">
          <TranslationBox
            translation={translatedWord}
            definition={definition}
          />
        </div>
      )}
    </div>
  );
}

export default Words;
