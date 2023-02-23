// @ts-nocheck
import Phaser from "phaser";
import Player from "./Player.js";

class Map extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  activeCharacter;

  constructor() {
    super({
      key: "Map",
    });
    console.log("in map");
  }

  create() {
    this.music = this.sound.add("gentle");
    this.walk = this.sound.add("walk");

    const walkConfig = {
      loop: false,
    };
    // MUSIC CONFIG

    const musicConfig = {
      mute: false,
      volume: 0.6,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    this.music.play(musicConfig);

    // FADE IN SCENE

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    const map = this.make.tilemap({ key: "map" });

    //TILSET
    const tileset = map.addTilesetImage("Water", "water", 16, 16, 0, 0);

    const tileset2 = map.addTilesetImage(
      "Darker_Tall_Grass",
      "grass",
      16,
      16,
      0,
      0
    );
    const tileset3 = map.addTilesetImage("Trees", "trees", 16, 16, 0, 0);
    const tileset4 = map.addTilesetImage("Mushrooms", "objects", 16, 16, 0, 0);
    const tileset5 = map.addTilesetImage(
      "Wooden_House",
      "houses",
      16,
      16,
      0,
      0
    );
    const tileset6 = map.addTilesetImage(
      "door_animation",
      "doors",
      16,
      16,
      0,
      0
    );
    const tileset7 = map.addTilesetImage("WoodBridge", "bridges", 16, 16, 0, 0);
    const tileset8 = map.addTilesetImage("Water_4", "water", 16, 16, 0, 0);
    const tileset9 = map.addTilesetImage("All_items", "items", 16, 16, 0, 0);
    const tileset10 = map.addTilesetImage("Fence_gates", "gates", 16, 16, 0, 0);
    const tileset11 = map.addTilesetImage("Fences", "fences", 16, 16, 0, 0);
    const tileset13 = map.addTilesetImage("Tilled_Dirt", "soil", 16, 16, 0, 0);
    const tileset14 = map.addTilesetImage("Water_tray", "tray", 16, 16, 0, 0);
    const tileset15 = map.addTilesetImage(
      "Barn_structures",
      "barn",
      16,
      16,
      0,
      0
    );

    //LAYERS
    this.layer0 = map.createLayer("sea", tileset);
    const layer = map.createLayer("water", tileset8);
    this.land = map.createLayer("land", tileset2);

    const trees = map.createLayer("trees", tileset3);
    const objects = map.createLayer("objects", tileset4);
    const houses = map.createLayer("houses", tileset5);
    const door1 = map.createLayer("door1", tileset6);

    const door2 = map.createLayer("door2", tileset6);
    const door3 = map.createLayer("door3", tileset6);
    const door4 = map.createLayer("door4", tileset6);
    this.roof = map.createLayer("roof", tileset5);
    this.bridges = map.createLayer("bridges", tileset7);
    this.soil = map.createLayer("soil", tileset13);
    const items = map.createLayer("items", tileset9);
    const gates = map.createLayer("gates", tileset10);
    const fences = map.createLayer("fences", tileset11);
    const tray = map.createLayer("tray", tileset14);
    const barn = map.createLayer("barn", tileset15);

    // land.setCollisionByProperty({collisions:true});

    layer.setCollisionByProperty({ collisions: true });
    trees.setCollisionByProperty({ collisions: true });
    objects.setCollisionByProperty({ collisions: true });
    houses.setCollisionByProperty({ collisions: true });
    door1.setCollisionByProperty({ collisions: true });
    door2.setCollisionByProperty({ collisions: true });
    door3.setCollisionByProperty({ collisions: true });
    door4.setCollisionByProperty({ collisions: true });

    items.setCollisionByProperty({ collisions: true });
    gates.setCollisionByProperty({ collisions: true });
    fences.setCollisionByProperty({ collisions: true });
    tray.setCollisionByProperty({ collisions: true });
    barn.setCollisionByProperty({ collisions: true });

    // roof.setCollisionByProperty({ collisions: true });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);

    // layer.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //     });

    this.player = new Player(this, 845, 1590, "bunny")
      .setSize(10, 10)
      .setScale(1.5);

    //test atlas
    this.bunny2 = this.physics.add.sprite(
      1205,
      865,
      "bunny_digging",
      "bunny_digging1"
    );

    this.anims.create({
      key: "dig",
      frames: this.anims.generateFrameNames("bunny_digging", {
        prefix: "bunny_digging",
        start: 17,
        end: 24,
      }),

      frameRate: 10,
      repeat: -1,
    });
    this.bunny2.anims.play("dig");

    this.bunny3 = this.physics.add.sprite(
      1020,
      855,
      "bunny_digging",
      "bunny_digging1"
    );

    this.anims.create({
      key: "dig3",
      frames: this.anims.generateFrameNames("bunny_digging", {
        prefix: "bunny_digging",
        start: 25,
        end: 32,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.bunny3.anims.play("dig3");

    this.bunny4 = this.physics.add.sprite(
      1110,
      815,
      "bunny_digging",
      "bunny_digging1"
    );

    this.anims.create({
      key: "dig4",
      frames: this.anims.generateFrameNames("bunny_digging", {
        prefix: "bunny_digging",
        start: 1,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.bunny4.anims.play("dig4");

    this.boat = this.physics.add.sprite(
      255,
      1400,
      "boat_anchored",
      "boat_anchored1"
    );

    this.anims.create({
      key: "boat",
      frames: this.anims.generateFrameNames("boat_anchored", {
        prefix: "boat_anchored",
        start: 1,
        end: 2,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.boat.anims.play("boat");

    this.cow = this.physics.add.sprite(
      760,
      605,
      "baby_cow_pink",
      "baby_cow_pink1"
    );
    this.anims.create({
      key: "baby",
      frames: this.anims.generateFrameNames("baby_cow_pink", {
        prefix: "baby_cow_pink",
        start: 1,
        end: 12,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.cow.anims.play("baby");
    this.cow.body.immovable = true;

    this.cow2 = this.physics.add.sprite(
      740,
      585,
      "baby_cow_pink",
      "baby_cow_pink1"
    );
    this.anims.create({
      key: "baby2",
      frames: this.anims.generateFrameNames("baby_cow_pink", {
        prefix: "baby_cow_pink",
        start: 13,
        end: 26,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.cow2.anims.play("baby2");
    this.cow2.body.immovable = true;

    this.cow3 = this.physics.add.sprite(
      780,
      565,
      "baby_cow_pink",
      "baby_cow_pink1"
    );
    this.anims.create({
      key: "baby3",
      frames: this.anims.generateFrameNames("baby_cow_pink", {
        prefix: "baby_cow_pink",
        start: 27,
        end: 37,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.cow3.anims.play("baby3");
    this.cow3.body.immovable = true;

    this.brownCow = this.physics.add.sprite(
      720,
      1200,
      "brown_cow",
      "brown_cow1"
    );
    this.brownCow.body.immovable = true;

    this.anims.create({
      key: "brown",
      frames: this.anims.generateFrameNames("brown_cow", {
        prefix: "brown_cow",
        start: 20,
        end: 42,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.brownCow.anims.play("brown");

    this.physics.add.collider(this.player, this.brownCow);

    this.brownCow2 = this.physics.add.sprite(
      225,
      985,
      "brown_cow",
      "brown_cow1"
    );
    this.brownCow2.body.immovable = true;

    this.anims.create({
      key: "brown2",
      frames: this.anims.generateFrameNames("brown_cow", {
        prefix: "brown_cow",
        start: 20,
        end: 25,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.brownCow2.anims.play("brown2");

    this.physics.add.collider(this.player, this.brownCow2);

    this.lastBunny = this.physics.add.sprite(
      1295,
      710,
      "bunny_watering",
      "bunny_watering1"
    );
    this.lastBunny.body.immovable = true;

    this.anims.create({
      key: "bunny7",
      frames: this.anims.generateFrameNames("bunny_watering", {
        prefix: "bunny_watering",
        start: 1,
        end: 8,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.lastBunny.anims.play("bunny7");

    this.physics.add.collider(this.player, this.lastBunny);

    // CHARACTER 1

    this.character1 = this.physics.add
      .sprite(500, 600, "bunny")
      .setSize(15, 15)
      .setData("character", "character1")
      .setActive(false)
      .setScale(1.5);
    this.character1.body.immovable = true;

    // CHARACTER 2

    this.character2 = this.physics.add
      .sprite(900, 1590, "bunny")
      .setSize(12, 12)
      .setData("character", "character2")
      .setScale(1.5)
      .setActive(false);
    this.character2.body.immovable = true;

    // CHARACTER 3

    this.character3 = this.physics.add
      .sprite(1680, 720, "bunny")
      .setSize(15, 15)
      .setData("character", "character3")
      .setScale(1.5)
      .setActive(false);
    this.character3.body.immovable = true;

    // SIGN 1

    this.sign1 = this.physics.add
      .sprite(1245, 435, "mushroom_sign")
      .setData("character", "sign1");
    this.sign1.body.immovable = true;

    // SIGN 2

    this.sign2 = this.physics.add
      .sprite(1730, 1580, "carrot_sign")
      .setData("character", "sign2");
    this.sign2.body.immovable = true;

    // SIGN 3

    this.sign3 = this.physics.add
      .sprite(860, 1180, "heart_sign")
      .setData("character", "sign3");
    this.sign3.body.immovable = true;

    //SIGN 4

    this.sign4 = this.physics.add
      .sprite(340, 1040, "beetroot_sign")
      .setData("character", "sign4");
    this.sign4.body.immovable = true;

    // SIGN 4

    // DISPATCHING CUSTOM EVENT!!!

    let isCharacterActive = false;

    // CHARACTER 1

    this.physics.add.collider(
      this.player,
      this.character1,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.activeCharacter.setActive(true);
        this.input.keyboard.on("keyup-SPACE", (e) => {
          e.preventDefault();
          const collisionTest = new CustomEvent("react", {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.character1.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // CHARACTER 2

    this.physics.add.collider(
      this.player,
      this.character2,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.character2.setActive(true);
        this.input.keyboard.on("keyup-SPACE", (e) => {
          e.preventDefault();
          const collisionTest = new CustomEvent("react", {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.character2.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // CHARACTER 3

    this.physics.add.collider(
      this.player,
      this.character3,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.character3.setActive(true);
        this.input.keyboard.on("keyup-SPACE", (e) => {
          e.preventDefault();
          const collisionTest = new CustomEvent("react", {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.character3.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // SIGN 1

    this.physics.add.collider(
      this.player,
      this.sign1,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.sign1.setActive(true);
        this.input.keyboard.on("keyup-SPACE", (e) => {
          e.preventDefault();
          const collisionTest = new CustomEvent("react", {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.sign1.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // SIGN 2

    this.physics.add.collider(
      this.player,
      this.sign2,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.sign2.setActive(true);
        this.input.keyboard.on("keyup-SPACE", (e) => {
          e.preventDefault();
          const collisionTest = new CustomEvent("react", {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.sign2.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // SIGN 3

    this.physics.add.collider(
      this.player,
      this.sign3,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.sign3.setActive(true);
        this.input.keyboard.on("keyup-SPACE", (e) => {
          e.preventDefault();
          const collisionTest = new CustomEvent("react", {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.sign3.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // SIGN 4

    this.physics.add.collider(
      this.player,
      this.sign4,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.sign4.setActive(true);
        this.input.keyboard.on("keyup-SPACE", (e) => {
          e.preventDefault();
          const collisionTest = new CustomEvent("react", {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.sign4.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    this.physics.add.collider(this.player, layer);
    this.physics.add.collider(this.player, trees);
    this.physics.add.collider(this.player, objects);
    this.physics.add.collider(this.player, houses);
    this.physics.add.collider(this.player, items);
    this.physics.add.collider(this.player, gates);
    this.physics.add.collider(this.player, fences);
    this.physics.add.collider(this.player, tray);
    this.physics.add.collider(this.player, barn);
    this.physics.add.collider(this.player, this.cow);
    this.physics.add.collider(this.player, this.cow2);
    this.physics.add.collider(this.player, this.cow3);

    //SIGN 1

    // FADE OUT OF MAP

    // MINI GAME 1
    this.physics.add.collider(this.player, door1, () => {
      this.music.stop();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start("MiniGame1");
      }
    );

    // MINI GAME 2
    this.physics.add.collider(this.player, door4, () => {
      this.music.stop();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.scene.start("MiniGame2");
    });

    this.physics.add.collider(this.player, door2, () => {
      console.log("door 2 collision");
    });

    // LIBRARY

    this.physics.add.collider(this.player, door3, (libraryDoor) => {
      this.music.stop();
      const libraryEntrance = new CustomEvent("library", {
        detail: {
          libraryDoor,
        },
      });
      window.dispatchEvent(libraryEntrance);
    });
  }

  updateActiveCharacter() {
    if (!this.activeCharacter) {
      return;
    }
    const distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.activeCharacter.x,
      this.activeCharacter.y
    );

    const characterActiveOrNot = this.activeCharacter.active;

    const collisionTest = new CustomEvent("isActiveOrNot", {
      detail: {
        characterActiveOrNot,
      },
    });
    window.dispatchEvent(collisionTest);

    if (distance < 80) {
      this.activeCharacter.setActive(true);
      return;
    } else {
      this.activeCharacter.setActive(false);
      return;
    }
  }

  update() {
    this.player.updatePlayer();
    this.updateActiveCharacter();

    const spacePressed = Phaser.Input.Keyboard.JustUp(
      this.player.cursors.space
    );

    if (spacePressed) {
      console.log("SPACE PRESSED");
      console.log(this.player.x, this.player.y);
    }

    this.game.scale.setZoom(1);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoomTo(2, 2);
    this.cameras.main.setBounds(0, 0, 2000, 2000, true);
  }
}

export default Map;
