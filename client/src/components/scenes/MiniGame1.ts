import Phaser from 'phaser';

class MiniGame1 extends Phaser.Scene {
  private activeChest: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private music: Phaser.Sound.BaseSound;
  private pear: Phaser.Sound.BaseSound;
  private orange: Phaser.Sound.BaseSound;
  private apple: Phaser.Sound.BaseSound;
  private grape: Phaser.Sound.BaseSound;
  private strawberry: Phaser.Sound.BaseSound;
  private openChest: Phaser.Sound.BaseSound;
  private collectFruit: Phaser.Sound.BaseSound;
  private chestFound: Phaser.Sound.BaseSound;
  private checkBox: Phaser.Sound.BaseSound;
  private doorSprite: Phaser.Physics.Arcade.Sprite;
  private player: Phaser.Physics.Arcade.Sprite;
  private chestSprite: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: 'MiniGame1TS',
    });
  }

  init() {
    this.game.scale.setZoom(2.04);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // FADE IN SCENE

    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.cameras.main.setBackgroundColor('#aed499');

    // create music config and load audio files
    this.music = this.sound.add('mini_game_1_audio');
    this.pear = this.sound.add('pears');
    this.orange = this.sound.add('oranges');
    this.apple = this.sound.add('apples');
    this.grape = this.sound.add('grapes');
    this.strawberry = this.sound.add('strawberries');
    this.openChest = this.sound.add('chestOpened');
    this.collectFruit = this.sound.add('fruitCollected');
    this.chestFound = this.sound.add('chestFound');
    this.checkBox = this.sound.add('checkBox');

    const musicConfig: Phaser.Types.Sound.SoundConfig = {
      mute: false,
      volume: 0.6,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    this.music.play(musicConfig);

    // use key to refer to tilemap

    const map = this.make.tilemap({ key: 'tilemap' });

    // first id is the name on the JSON, second id refers the id used for the image

    const tileset = map.addTilesetImage('Wooden_House', 'mini_game_1');
    const tileset2 = map.addTilesetImage('doors', 'doors');

    // create layers ie ground or walls
    const ground = map.createLayer('ground', tileset);
    const walls = map.createLayer('walls', tileset);
    // const doors = map.createLayer('doors', tileset2);
    const fruitsLayer = map.getObjectLayer('all_fruits')['objects'];

    // set collisions
    walls.setCollisionByProperty({ collides: true });

    // create doors Sprite

    this.doorSprite = this.physics.add
      .sprite(440, 472, 'doorsAnim')
      .setFrame(4);
    this.doorSprite.body.immovable = true;

    // create fruits on map according to name and position

    const fruits = this.physics.add.staticGroup();

    fruitsLayer.forEach((fruit: Phaser.Types.Tilemaps.TiledObject) => {
      switch (fruit.name) {
        case 'oranges':
          fruits.create(fruit.x, fruit.y, 'orange');
          break;
        case 'apples':
          fruits.create(fruit.x, fruit.y, 'apple');
          break;
        case 'pears':
          fruits.create(fruit.x, fruit.y, 'pear');
          break;
        case 'strawberry':
          fruits.create(fruit.x, fruit.y, 'strawberry');
          break;
        case 'grapes':
          fruits.create(fruit.x, fruit.y, 'grape');
      }
    });

    // add main character

    this.player = this.physics.add.sprite(30, 30, 'bunny');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, walls);

    // FADE OUT OF MINI GAME 1

    this.physics.add.collider(this.player, this.doorSprite, () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (
        cam: Phaser.Cameras.Scene2D.Camera,
        effect: Phaser.Cameras.Scene2D.Effects.Fade
      ) => {
        this.music.stop();
        this.scene.pause('MiniGame1');
        this.scene.start('Map');
      }
    );

    this.physics.add.overlap(this.player, fruits, collectFruits, null, this);

    let content: string[] = [
      'Frutas:',
      '',
      'manzanas:',
      '',
      'peras:',
      '',
      'naranjas:',
      '',
      'uvas:',
      '',
      'fresas:',
    ];

    let text = this.add.text(500, 70, content, {
      fontSize: '30px',
      color: '#fffdd0',
    });
    text.setScrollFactor(0);

    // fruit positions on map

    let fruitsX: number = 640;
    let strawberryX: number = 640;
    let grapeX: number = 600;
    let orangeX: number = 670;
    let pearX: number = 620;
    let appleX: number = 670;

    let strawberryY: number = 390;
    let grapeY: number = strawberryY - 60;
    let orangeY: number = grapeY - 60;
    let pearY: number = orangeY - 60;
    let appleY: number = pearY - 60;
    let fruitsY: number = appleY - 65;

    let fruitScore: number = 0;

    // CREATE CHEST

    let chestOpened: boolean = false;

    const generateChest = (
      x: number,
      y: number
    ): Phaser.Physics.Arcade.Sprite => {
      this.chestSprite = this.physics.add
        .sprite(x, y, 'chest')
        .setSize(16, 32)
        .setData('stars');
      this.chestSprite.body.immovable = true;
      this.physics.add.overlap(
        this.player,
        this.chestSprite,
        openChest,
        null,
        this
      );
      this.physics.add.collider(
        this.player,
        this.chestSprite,
        (reactCollision, stars) => {
          this.input.keyboard.on('keyup-SPACE', (e) => {
            e.preventDefault();
            const collectStar = new CustomEvent('starCollected', {
              detail: {
                reactCollision,
                stars,
              },
            });
            if (!chestOpened) {
              this.openChest.play();
              window.dispatchEvent(collectStar);
            }
            chestOpened = true;
          });
        }
      );
      return this.chestSprite;
    };

    // OPEN CHEST

    function openChest(): void {
      this.input.keyboard.on('keyup-SPACE', (e) => {
        e.preventDefault();
        if (!chestOpened) {
          this.chestSprite.anims.play('openChest', true);
          const star = this.add.sprite(350, 180, 'star');
          star.scale = 0;
          // star.alpha = 0
          this.tweens.add({
            targets: star,
            y: '-= 20',
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Power2',
          });
        }
      });
    }

    function collectFruits(
      player: Phaser.Physics.Arcade.Sprite,
      fruit: Phaser.Physics.Arcade.Sprite
    ): void {
      fruit.destroy();
      switch (fruit.texture.key) {
        case 'apple':
          this.collectFruit.play();
          this.apple.play();
          this.appleImage = this.physics.add.image(appleX, appleY, 'apple');
          this.appleImage = this.physics.add.image(fruitsX, fruitsY, 'apple');
          appleX += 20;
          fruitsX += 20;
          break;
        case 'pear':
          this.collectFruit.play();
          this.pear.play();
          this.pearImage = this.physics.add.image(pearX, pearY, 'pear');
          this.pearImage = this.physics.add.image(fruitsX, fruitsY, 'pear');
          pearX += 20;
          fruitsX += 20;
          break;
        case 'strawberry':
          this.collectFruit.play();
          this.strawberry.play();
          this.strawberryImage = this.physics.add.image(
            strawberryX,
            strawberryY,
            'strawberry'
          );
          this.strawberryImage = this.physics.add.image(
            fruitsX,
            fruitsY,
            'strawberry'
          );
          strawberryX += 20;
          fruitsX += 20;
          break;
        case 'grape':
          this.collectFruit.play();
          this.grape.play();
          this.grapeImage = this.physics.add.image(grapeX, grapeY, 'grape');
          this.grapeImage = this.physics.add.image(fruitsX, fruitsY, 'grape');
          grapeX += 20;
          fruitsX += 20;
          break;
        default:
          this.collectFruit.play();
          this.orange.play();
          this.orangeImage = this.physics.add.image(orangeX, orangeY, 'orange');
          this.orangeImage = this.physics.add.image(fruitsX, fruitsY, 'orange');
          orangeX += 20;
          fruitsX += 20;
      }
      fruitScore++;

      const fruitsRemaining: Phaser.Types.Tilemaps.TiledObject[] =
        fruitsLayer.slice(fruitScore);

      if (!fruitsRemaining.length) {
        generateChest(350, 180);
        this.chestFound.play();
        this.doorSprite.anims.play('openDoors');
      }
      console.log(fruitsRemaining);
    }

    // character animations

    this.anims.create({
      key: 'left',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 24,
        end: 31,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'bunny', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 17,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // OPEN CHEST

    this.anims.create({
      key: 'openChest',
      frames: this.anims.generateFrameNumbers('chest', {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // OPEN DOORS

    this.anims.create({
      key: 'openDoors',
      frames: this.anims.generateFrameNumbers('doorsAnim', {
        start: 4,
        end: 0,
      }),
      frameRate: 5,
      repeat: 0,
    });

    // GO BACK TO MAP

    this.physics.add.collider(this.player, this.doorSprite, () => {
      this.scene.start('Map');
    });

    this.physics.add.collider(this.player, this.doorSprite);
  }

  updateActiveChest(): void {
    if (!this.chestSprite) {
      return;
    }
    if (!this.chestSprite.active) {
      this.chestSprite.setActive(false);
    }
  }

  update(): void {
    this.updateActiveChest();
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.player.setVelocity(-160, 0);
      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocity(160, 0);
      this.player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      this.player.setVelocity(0, -160);
      this.player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      this.player.setVelocity(0, 160);
      this.player.anims.play('down', true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.play('turn');
    }
    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default MiniGame1;
