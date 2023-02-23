import { useState } from "react";
import React from "react";
import Story from "./Story.js";
import "./ChatGPT.css";
import Reader from "./Reader.js";

export default function ChatGPT({ chatGptResponse, setChatGptResponse }) {
  const [input, setInput] = useState("");

  const chatGptGuidancePrompt =
    "I insist that you tell me a story in spanish based on what the user will input, I will not accept any response in any other languages than spanish. Now, tell me a story about";

  const handleInput = async (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('I AM SUBMITTING')
    // setChatGptResponse({story:'blabla'})
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          prompt: `${chatGptGuidancePrompt} ${input}`,
          max_tokens: 200,
          n: 1,
          stop: null,
          temperature: 0.5,
          model: "text-davinci-002",
        }),
      });
      const json = await response.json();
      // json.choices[0].text
      // {story: string}
      setChatGptResponse({ story: json.choices[0].text });
      console.log({ json });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="chatGPT">
        {/* {message && <DialogueBox message = {message} setMessage={setMessage}/>} */}
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
