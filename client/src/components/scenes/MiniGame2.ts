import Phaser from 'phaser';

type Pair = {
  english: Phaser.Types.GameObjects.Text.TextStyle;
  spanish: Phaser.Types.GameObjects.Text.TextStyle;
};

type BoxItem = {
  box: Phaser.Physics.Arcade.Sprite;
  item: Phaser.Physics.Arcade.Sprite;
  itemPic: Phaser.GameObjects.Sprite;
};

const words = [1, 2, 3, 4, 5, 6, 7, 8];

function addToBox(arr: number[]): number[][] {
  let newBox: number[][] = [[], []];
  const shuffledArray = arr.sort(() => 0.5 - Math.random());
  for (let i = 0; i < arr.length; i++) {
    if (newBox[0].length < 4) {
      newBox[0].push(shuffledArray[i]);
    } else {
      newBox[1].push(shuffledArray[i]);
    }
  }
  return newBox;
}

function addToSpanishBox(arr: number[]): number[][] {
  let newBox: number[][] = [[], []];
  const shuffledArray = arr.sort(() => 0.5 - Math.random());
  for (let i = 0; i < arr.length; i++) {
    if (newBox[0].length < 4) {
      newBox[0].push(shuffledArray[i] + 8);
    } else {
      newBox[1].push(shuffledArray[i] + 8);
    }
  }
  return newBox;
}

const englishBoxContent = addToBox(words);
const spanishBoxContent = addToSpanishBox(words);
let chestOpened = false 

class MiniGame2 extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private foundPairs: Pair[] = [];
  private player!: Phaser.Physics.Arcade.Sprite;
  private boxGroup!: Phaser.Physics.Arcade.StaticGroup;
  private activeBox?: Phaser.Physics.Arcade.Sprite;
  private itemsGroup!: Phaser.GameObjects.Group;
  private selectedBoxes: BoxItem[] = [];
  private matchesCount = 0;
  private music!: Phaser.Sound.BaseSound;
  private chestFound!: Phaser.Sound.BaseSound;
  private noMatch!: Phaser.Sound.BaseSound;
  private yesMatch!: Phaser.Sound.BaseSound;
  private checkBox!: Phaser.Sound.BaseSound;
  private doorSprite!: Phaser.Physics.Arcade.Sprite;
  private chestSprite!: Phaser.Physics.Arcade.Sprite;
  private openChest!: Phaser.Sound.BaseSound;

  constructor() {
    super('MiniGame2');
  }

  init() {
    this.game.scale.setZoom(1);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create(): void {
    this.music = this.sound.add('glow');
    this.chestFound = this.sound.add('chestFound');
    this.noMatch = this.sound.add('noMatch');
    this.yesMatch = this.sound.add('yesMatch');
    this.checkBox = this.sound.add('checkBox');
    this.openChest = this.sound.add('chestOpened');
    this.anims.create({
      key: 'openDoors',
      frames: this.anims.generateFrameNumbers('doorsAnim', {
        start: 4,
        end: 0,
      }),
      frameRate: 5,
      repeat: 0,
    });
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

    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const { width, height } = this.scale;

    const map = this.make.tilemap({ key: 'tilemap2' });

    // first id is the name on the JSON, second id refers the id used for the image
    const tileset = map.addTilesetImage('Wooden_House', 'mini_game_2');

    // create layers ie ground or walls
    const floor = map.createLayer('floor', tileset);
    floor.setScale(2);
    this.doorSprite = this.physics.add
      .sprite(36, 2, 'doorsAnim')
      .setFrame(4)
      .setScale(2);

    this.doorSprite.body.immovable = true;

    const walls = this.physics.add.staticGroup();

    walls
      .create(this.scale.width / 1.75, 0, 'longWall')
      .setScale(this.scale.width / 150, 2);
    walls
      .create(0, 0, 'longVerticalWall')
      .setScale(4, this.scale.width)
      .refreshBody();
    walls
      .create(0, this.scale.height, 'longWall')
      .setScale(this.scale.width, 2)
      .refreshBody();
    walls
      .create(this.scale.width, 0, 'longVerticalWall')
      .setScale(4, this.scale.width)
      .refreshBody();

    this.player = this.physics.add
      .sprite(width * 0.5, height * 0.5, 'bunny')
      .setScale(3)
      .setSize(12, 8)
      .setOffset(2, 10);
      
    this.player.setCollideWorldBounds(true);
    this.boxGroup = this.physics.add.staticGroup();
    this.createSpanishBoxes();
    this.createEnglishBoxes();
    this.itemsGroup = this.add.group();
    this.physics.add.collider(this.player, this.boxGroup, (player, box) => {
      if (box.getData('opened')) {
        return;
      }
      //@ts-ignore
      this.activeBox = box;
    });
    this.physics.add.collider(this.player, this.doorSprite, () => {
      this.music.stop();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (
        cam: Phaser.Cameras.Scene2D.Camera,
        effect: Phaser.Cameras.Scene2D.Effects.Fade
      ) => {
        this.scene.start('Map', this.player);
      }
    );

    this.anims.create({
      key: 'openChest',
      frames: this.anims.generateFrameNumbers('chest', {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }

  createWordBox(wordBox: string[][]) {
    const width = this.scale.width;
    let x = 0.4;
    let y = 20;

    for (let row = 0; row < wordBox.length; row++) {
      for (let col = 0; col < wordBox[row].length; col += 2) {
        this.add.text(x * width, y, wordBox[row][0]);
        x += 0.2;
        this.add.text(x * width, y, wordBox[row][1]);
      }
      x = 0.4;
      y += 20;
    }
  }

  createSpanishBoxes(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    let x : number =  0.2;
    let y : number = 0.2;

    for (let row = 0; row < spanishBoxContent.length; row++) {
      for (let col = 0; col < spanishBoxContent[row].length; col++) {
        this.boxGroup
          .get(width * x, height * y, 'boxes')
          .setScale(3)
          .setSize(46, 32)
          .setOffset(-14, 0)
          .setData('item', spanishBoxContent[row][col])
          .setData('language', 'spanish') as Phaser.GameObjects.Sprite;
        x += 0.2;
      }
      x = 0.2;
      y += 0.2;
    }
  }

  createEnglishBoxes(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    let x : number = 0.2;
    let y : number = 0.6;

    for (let row = 0; row < englishBoxContent.length; row++) {
      for (let col = 0; col < englishBoxContent[row].length; col++) {
        this.boxGroup
          .get(width * x, height * y, 'boxes')
          .setScale(3)
          .setSize(46, 32)
          .setOffset(-14, 0)
          .setData('item', englishBoxContent[row][col])
          .setData('language', 'english') as Phaser.GameObjects.Sprite;
        x += 0.2;
      }
      x = 0.2;
      y += 0.2;
    }
  }

  updatePlayer(): void {
    const speed : number = 200;
    if (this.cursors.left.isDown) {
      this.player.setVelocity(-speed, 0);
      this.player.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocity(speed, 0);
      this.player.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocity(0, -speed);
      this.player.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocity(0, speed);
      this.player.play('down', true);
    } else {
      this.player.setVelocity(0, 0);
      this.player.play('idle', true);
    }

    const spacePressed = Phaser.Input.Keyboard.JustUp(this.cursors.space);
    if (spacePressed) {
      this.openBox(this.activeBox);
    }
  }

  openBox(box: Phaser.Physics.Arcade.Sprite): void {
    if (!box) {
      return;
    }
    if (box.getData('opened')) {
      return;
    }
    this.checkBox.play();
    const item = box.getData('item');
    box.getData('language');
    let itemPic: Phaser.GameObjects.Sprite;
    switch (item) {
      case 1:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('red');
        break;
      case 2:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('green');
        break;
      case 3:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('blue');
        break;
      case 4:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('pink');
        break;
      case 5:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('white');
        break;
      case 6:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('black');
        break;
      case 7:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('yellow');
        break;
      case 8:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture('orange_colour');
        break;
      case 9:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture('rojo');
        break;
      case 10:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('verde');

        break;
      case 11:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture('azul');

        break;
      case 12:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture('rosa');

        break;
      case 13:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture('blanco').setScale(0.1);

        break;
      case 14:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture('negro');

        break;
      case 15:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture('amarillo');

        break;
      case 16:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture('naranja');
        break;
    }

    box.setData('opened', true);
    itemPic.setData('sorted', true);
    itemPic.setDepth(3000);

    itemPic.scale = 0;
    itemPic.alpha = 0;

    const selectedBox = { box, item, itemPic };

    this.selectedBoxes.push(selectedBox);
    this.tweens.add({
      targets: itemPic,
      y: '-= 50',
      alpha: 1,
      scale: 0.1,
      duration: 500,
      onComplete: () => {
        if (this.selectedBoxes.length < 2) {
          return;
        }
        this.checkForMatch();
      },
    });
    this.activeBox = undefined;
  }

  checkForMatch(): void {
    const second = this.selectedBoxes.pop();
    const first = this.selectedBoxes.pop();
    if (
      first.box.getData('item') !== second.box.getData('item') - 8 &&
      first.box.getData('item') - 8 !== second.box.getData('item')
    ) {
      // add wrong sound
      this.noMatch.play();
      this.tweens.add({
        targets: [first.itemPic, second.itemPic],
        y: '+= 50',
        alpha: 0,
        scale: 0,
        duration: 500,
        delay: 1000,
        onComplete: () => {
          (first.box as Phaser.GameObjects.Sprite).setData('opened', false);
          (second.box as Phaser.GameObjects.Sprite).setData('opened', false);
        },
      });
      return;
    }
    // add good sound
    this.yesMatch.play();
    this.matchesCount++;
    if (this.matchesCount === 1) {
      this.generateChest(this.scale.width / 2, this.scale.height / 2);

      this.chestFound.play();
      this.doorSprite.anims.play('openDoors');
    }
  }
  updateActiveBox(): void {
    if (!this.activeBox) {
      return;
    }
    const distance: number = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.activeBox.x,
      this.activeBox.y
    );
    if (distance < 64) {
      return;
    }
    this.activeBox = undefined;
  }

  generateChest = (x: number, y: number) => {
    this.chestSprite = this.physics.add
      .sprite(x, y, 'chest')
      .setSize(16, 32)
      .setScale(2.5)
      .setData('stars');
    this.chestSprite.body.immovable = true;

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
            this.chestSprite.anims.play('openChest', true);
            const star = this.add.sprite(
              this.scale.width / 2,
              this.scale.height / 2,
              'star'
            );
            star.scale = 0;
            this.tweens.add({
              targets: star,
              y: '-= 35',
              scaleX: 2,
              scaleY: 2,
              duration: 500,
              ease: 'Power2',
            });
            this.openChest.play();
            window.dispatchEvent(collectStar);
          }
          chestOpened = true;
        });
      }
    );
    return this.chestSprite;
  };

  openChestAction(): void {
    this.input.keyboard.on('keyup-SPACE', (e) => {
      e.preventDefault();
      if (!chestOpened) {
        this.chestSprite.anims.play('openChest', true);
        const star = this.add.sprite(350, 180, 'star');
        star.scale = 0;

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

  update(): void {
    this.children.each((child: Phaser.Physics.Arcade.Sprite) => {
      if (child.getData('sorted')) {
        return;
      }
      child.setDepth(child.y);
    });
    this.updateActiveBox();
    this.updatePlayer();
  }
}

export default MiniGame2;
