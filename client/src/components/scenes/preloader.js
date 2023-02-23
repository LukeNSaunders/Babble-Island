// @ts-nocheck

import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    // Load all audio files

    // MINI GAME 1 AUDIO

    this.load.audio("mini_game_1_audio", "/assets/audio/mini_game1.mp3");
    this.load.audio("pears", "/assets/audio/peras.mp3");
    this.load.audio("apples", "/assets/audio/manzanas.mp3");
    this.load.audio("oranges", "/assets/audio/naranjas.mp3");
    this.load.audio("strawberries", "/assets/audio/fresas.mp3");
    this.load.audio("grapes", "/assets/audio/uvas.mp3");
    this.load.spritesheet("bunny", "/assets/mini_game1/bunnyFinal.png", {
      frameWidth: 16,
      frameHeight: 19,
    });

    // MAP AUDIO

    this.load.audio("discover", "/assets/audio/Soundtrack/Discover.mp3");
    this.load.audio("curious", "/assets/audio/Soundtrack/Curious.mp3");
    this.load.audio("gentle", "/assets/audio/Soundtrack/Gentle.mp3");
    this.load.audio("field", "/assets/audio/Soundtrack/Field.mp3");
    this.load.audio("valley", "/assets/audio/Soundtrack/Valley.mp3");
    this.load.audio("glow", "/assets/audio/Soundtrack/Glow.mp3");
    this.load.audio(
      "walk",
      "assets/audio/SFX/Footstep/Generic/SFX_Movement_Footstep_Generic_3.wav"
    );

    // SFX

    this.load.audio(
      "chestOpened",
      "assets/audio/SFX/Chest_Open/SFX_Chest_Open_Rich_1.wav"
    );
    this.load.audio(
      "fruitCollected",
      "assets/audio/SFX/Collect/Pop/SFX_Player_Collect_Pop_1.wav"
    );
    this.load.audio(
      "chestFound",
      "assets/audio/SFX/Collect/Bright/SFX_Player_Collect_Bright_1.wav"
    );
    this.load.audio("noMatch", "assets/audio/SFX/UI/Error/SFX_UI_Error.wav");
    this.load.audio(
      "yesMatch",
      "assets/audio/SFX/Match/Bright/SFX_Match_Bright_1.wav"
    );
    this.load.audio(
      "chestFound",
      "assets/audio/SFX/Collect/Bright/SFX_Player_Collect_Bright_1.wav"
    );
    this.load.audio(
      "checkBox",
      "assets/audio/SFX/Match/Boxy/SFX_Match_Boxy_1.wav"
    );

    // Load all image /assets

    // First id is what you want to call it, second is the file!

    // MAP

    this.load.image("water", "assets/map/Water.png");
    this.load.image("grass", "assets/map/Darker_Tall_Grass.png");
    this.load.image("trees", "assets/map/Trees.png");
    this.load.image("objects", "assets/map/Mushrooms.png");
    this.load.image("houses", "assets/map/Wooden_House.png");
    this.load.image("doors", "assets/map/door_animation.png");
    this.load.image("bridges", "assets/map/WoodBridge.png");
    this.load.image("water", "assets/map/Water_4.png");

    this.load.image("items", "assets/map/All_items.png");
    this.load.image("gates", "assets/map/Fence_gates.png");
    this.load.image("fences", "assets/map/Fences.png");
    this.load.image("signs", "assets/map/signs.png");
    this.load.image("soil", "assets/map/Tilled_Dirt.png");
    this.load.image("tray", "assets/map/Water_tray.png");
    this.load.image("barn", "assets/map/Barn_structures.png");

    this.load.image("mushroom_sign", "assets/map/mushroom_sign.png");
    this.load.image("carrot_sign", "assets/map/carrot_sign.png");
    this.load.image("beetroot_sign", "assets/map/beetroot_sign.png");
    this.load.image("heart_sign", "assets/map/heart_sign.png");

    this.load.tilemapTiledJSON("map", "assets/map/babble_island3.json");

    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    //new character
    this.load.atlas(
      "bunny_digging",
      "assets/map/bunny_digging.png",
      "assets/map/bunny_digging_atlas.json"
    );
    this.load.animation(
      "bunny_digging_anim",
      "assets/map/bunny_digging_anim.json"
    );

    this.load.atlas(
      "boat_anchored",
      "assets/map/boat_anchored.png",
      "assets/map/boat_anchored_atlas.json"
    );
    this.load.animation(
      "boat_anchored_anim",
      "assets/map/boat_anchored_anim.json"
    );

    this.load.atlas(
      "baby_cow_pink",
      "assets/map/baby_cow_pink.png",
      "assets/map/baby_cow_pink_atlas.json"
    );
    this.load.animation(
      "baby_cow_pink_anim",
      "assets/map/baby_cow_pink_anim.json"
    );

    this.load.atlas(
      "brown_cow",
      "assets/map/brown_cow.png",
      "assets/map/brown_cow_atlas.json"
    );
    this.load.animation("brown_cow_anim", "assets/map/brown_cow_anim.json");

    this.load.atlas(
      "bunny_watering",
      "assets/map/bunny_watering.png",
      "assets/map/bunny_watering_atlas.json"
    );
    this.load.animation(
      "bunny_watering_anim",
      "assets/map/bunny_watering_anim.json"
    );

    // MINI GAME 1

    this.load.image("mini_game_1", "/assets/mini_game1/Wooden_House.png");
    this.load.image("pear", "/assets/mini_game1/pear.png");
    this.load.image("apple", "/assets/mini_game1/apple.png");
    this.load.image("orange", "/assets/mini_game1/orange.png");
    this.load.image("grape", "/assets/mini_game1/grapes.png");
    this.load.image("strawberry", "/assets/mini_game1/strawberry.png");
    this.load.image("doors", "/assets/mini_game1/door_animation.png");
    this.load.image("star", "/assets/mini_game1/star.png");

    this.load.tilemapTiledJSON("tilemap", "/assets/mini_game1/house.json");

    this.load.spritesheet("doorsAnim", "assets/mini_game1/doorsOpen.png", {
      frameWidth: 48,
      frameHeight: 16,
    });
    this.load.spritesheet("chest", "assets/mini_game1/chestTest2.png", {
      frameWidth: 16,
      frameHeight: 32,
    });

    // MINI GAME 2

    this.load.spritesheet("bunny", "/assets//mini_game2/bunnyFinal.png", {
      frameWidth: 16,
      frameHeight: 19,
    });
    this.load.spritesheet("boxes", "/assets//mini_game2/boxes.png", {
      frameWidth: 16,
    });
    this.load.spritesheet("bomb", "/assets/mini_game2/bomb.png", {
      frameWidth: 16,
    });

    this.load.image("red", "/assets/mini_game2/colours/red.png");
    this.load.image("rojo", "/assets/mini_game2/colours/rojo.png");
    this.load.image("amarillo", "/assets/mini_game2/colours/amarillo.png");
    this.load.image("black", "/assets/mini_game2/colours/black.png");
    this.load.image("azul", "/assets/mini_game2/colours/azul.png");
    this.load.image("blanco", "/assets/mini_game2/colours/blanco.png");
    this.load.image("blue", "/assets/mini_game2/colours/blue.png");
    this.load.image("green", "/assets/mini_game2/colours/green.png");
    this.load.image("naranja", "/assets/mini_game2/colours/naranja.png");
    this.load.image("negro", "/assets/mini_game2/colours/negro.png");
    this.load.image("pink", "/assets/mini_game2/colours/pink.png");
    this.load.image("rosa", "/assets/mini_game2/colours/rosa.png");
    this.load.image("verde", "/assets/mini_game2/colours/verde.png");
    this.load.image("white", "/assets/mini_game2/colours/white.png");
    this.load.image("yellow", "/assets/mini_game2/colours/yellow.png");
    this.load.image("orange_colour", "/assets/mini_game2/colours/orange.png");
    this.load.image("mini_game_2", "/assets/mini_game2/Wooden_House.png");

    this.load.image("wall", "/assets/mini_game2/wall.png");
    this.load.image("longWall", "/assets/mini_game2/longWall.png");
    this.load.image(
      "longVerticalWall",
      "/assets/mini_game2/longVerticalWall.png"
    );
    this.load.image("verticalWall", "/assets/mini_game2/verticalWall.png");

    this.load.tilemapTiledJSON("tilemap2", "/assets/mini_game2/floor.json");
  }

  create() {
    let soundPlayed = false;
    this.anims.create({
      key: "idle",
      frames: [{ key: "bunny", frame: 0 }],
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("bunny", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("bunny", { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("bunny", { start: 16, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("bunny", { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("Map");
  }
}
