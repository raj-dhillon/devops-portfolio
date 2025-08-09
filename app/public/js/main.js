const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: { preload, create, update }
};

let player, cursors;

function preload() {
  this.load.image('tavern', 'assets/tavern.png');
  this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 16 });
}

function create() {
  // Background
  this.add.image(400, 300, 'tavern').setScale(2);

  // Player
  player = this.physics.add.sprite(400, 300, 'player');

  // Player animations
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.addKeys('W,A,S,D');
}

function update() {
  player.setVelocity(0);

  if (cursors.left.isDown || this.input.keyboard.keys[65].isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown || this.input.keyboard.keys[68].isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else if (cursors.up.isDown || this.input.keyboard.keys[87].isDown) {
    player.setVelocityY(-160);
    player.anims.play('up', true);
  } else if (cursors.down.isDown || this.input.keyboard.keys[83].isDown) {
    player.setVelocityY(160);
    player.anims.play('down', true);
  } else {
    player.anims.stop();
  }
}

new Phaser.Game(config);
