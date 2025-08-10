export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'Level' });
  }

  preload() {
    // this.load.image('tavern', 'assets/tavern.png');
    this.load.image('level_background', 'https://placehold.co/800x600/032043/ffffff?text=Level+Background');
    this.load.image('player', 'https://placehold.co/16x16/f0f2f4/909ead?text=P');
    this.load.image('platform', 'https://placehold.co/400x20/f85a06/ffffff?text=Platform');
    
  }

  create() {
    this.add.image(400, 300, "level_background");

    // Create platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 580, 'platform').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'platform');

    // Player setup
    this.player = this.physics.add.sprite(200, 300, 'player');
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.platforms);
  }

  update() {
    // update.call(this);
  }
}