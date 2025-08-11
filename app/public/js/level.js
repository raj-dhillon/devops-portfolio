import Player from './player.js';
export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: 'Level' });
  }

  preload() {
    // this.load.image('tavern', 'assets/tavern.png');
    this.load.image('level_background', 'https://placehold.co/800x600/032043/ffffff?text=Level+Background');
    this.load.image('player', 'https://placehold.co/16x16/f0f2f4/909ead?text=P');
    this.load.image('platform', 'https://placehold.co/200x20/f85a06/ffffff?text=Platform');
    this.load.image('ground', 'https://placehold.co/800x20/f85a06/ffffff?text=Ground');
    
  }

  create() {
    this.add.image(400, 300, "level_background");

    // Create platforms
    this._createPlatforms();

    // Player setup
    this.player = new Player(this, 200, 300);
    this.player.setGravityY(800);

    // Collision setup
    this._setupCollisions();

    // Input handling
    this._handleInput();
  }

  update() {
    this.player.update(this.inputManager);
  }

  _createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 590, 'ground');
    this.platforms.create(600, 500, 'platform');
    this.platforms.create(200, 400, 'platform');
    this.platforms.create(600, 300, 'platform');
  }

  _setupCollisions() {
    // Set up collisions between player and platforms
    this.physics.add.collider(this.player, this.platforms);
  }

  _handleInput() {
    this.inputManager = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE
      });

  }
}