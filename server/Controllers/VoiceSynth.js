require("dotenv").config();
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const client = new textToSpeech.TextToSpeechClient();

let stories = {};

// exports.translateWord = async(req, res) =>{
//   word = req.body.word
//   try {
//     const response = await fetch(`https://translation.googleapis.com/language/translate/v2?q=${word}&target=en&source=es&format=text&key=${GOOGLE_API_KEY}`, {
//       method: 'POST'
//     })
//     res.status(201).send(response)
//   }catch(error) {
//     console.log(error)
//   }
//   }
exports.synthesizeSpeech = async (req, res) => {
  console.log(req.body);
  console.log(stories);
  const title = req.body.title;
  const story = req.body.text;
  if (!stories.title) {
    const client = new textToSpeech.TextToSpeechClient();
    const request = {
      input: { text: req.body.text },
      voice: { languageCode: "es-ES", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);
    const buffer = Buffer.from(response.audioContent);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`./Audio/${title}.mp3`, response.audioContent, "binary");
    stories[title] = `${title}.mp3`;
  }

  res.json({ url: `${title}.mp3` });
};
