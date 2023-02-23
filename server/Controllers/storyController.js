const Story = require("../Models/storySchema");
const stories = require("../StoriesOfflineDB.js");
exports.getStories = async (req, res) => {
  try {
    // const stories = await Story.find();

    res.status(201).send(stories);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.addStory = async (req, res) => {
  try {
    const newStory = await Story.create(req.body);
    res.status(201).send(newStory);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
