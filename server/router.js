const Router = require("express");
const router = Router();
const userCTRL = require("./Controllers/userController");
const characterCTRL = require("./Controllers/characterController");
const storyCTRl = require("./Controllers/storyController");
const authMiddleware = require("./middleware/auth");
const readCTRL = require("./Controllers/VoiceSynth");
// USERS

router.post("/register", userCTRL.registerUser);

router.post("/login", userCTRL.login);

router.get("/users", userCTRL.getUsers);

// ,authMiddleware,

router.put("/user/:id", userCTRL.updateUserStar);
router.get("/refresh", userCTRL.refreshUser);
router.post("/logout", authMiddleware, userCTRL.logout);
// CHARACTERS

router.get("/character", characterCTRL.getAllCharacters);
router.put("/character", characterCTRL.getCharacter);

router.post("/character", characterCTRL.createCharacter);
router.post("/update", characterCTRL.updateCharacter);

// STORIES

router.get("/stories", storyCTRl.getStories);
router.post("/stories", storyCTRl.addStory);
//Voice

router.post("/read", readCTRL.synthesizeSpeech);
// router.post('/translate' , readCTRL.translateWord)
module.exports = router;
