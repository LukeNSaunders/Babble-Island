const Character = require("../Models/CharacterSchema");

exports.getCharacter = async (req, res) => {
  try {
    const character = await Character.findOne({
      character: req.body.character,
    });

    res.status(201).send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
  }
};

exports.createCharacter = async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);

    res.status(200).send(newCharacter);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const newCharacter = await Character.findOneAndUpdate(
      { _id: req.body.id },
      req.updates
    );
    res.send(newCharacter);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};
