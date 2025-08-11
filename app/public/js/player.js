export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    // Initialize the player sprite
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set initial properties
    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
  }

  update(inputManager) {
    // Handle player input and movement
    if (inputManager.left.isDown) {
      this.setVelocityX(-160);
    } else if (inputManager.right.isDown) {
      this.setVelocityX(160);
    } else {
      this.setVelocityX(0);
    }

    if ((inputManager.up.isDown || inputManager.space.isDown) && this.body.touching.down) {
      this.setVelocityY(-700);
    }
    if ((inputManager.up.isUp && inputManager.space.isUp) && this.body.velocity.y < 0) {
      this.setVelocityY(this.body.velocity.y * 0.2);
    }

  }
}