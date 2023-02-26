
import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  updatePlayer() : void {
    if (this.cursors.left.isDown) {
      this.setVelocity(-160, 0);
      this.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.setVelocity(160, 0);
      this.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.setVelocity(0, -160);
      this.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.setVelocity(0, 160);
      this.anims.play("down", true);
    } else {
      this.setVelocity(0);
      this.anims.play("idle", true);
    }

    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-330);
    }
  }
}

export default Player;
