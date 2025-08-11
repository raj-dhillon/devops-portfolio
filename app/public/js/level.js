import Player from './player.js';
import ATS from './ats.js';
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
    this.load.image('ats_enemy', 'https://placehold.co/32x32/B22222/000100?text=ATS');
    
  }

  create() {
    this.add.image(400, 300, "level_background");

    // Create platforms
    this._createPlatforms();

    // Player setup
    this.player = new Player(this, 200, 300);
    this.player.setGravityY(800);

    // Enemy setup
    this.ats = this.physics.add.group({
      classType: ATS,
      key: 'ats_enemy',
      repeat: 5,
      setXY: { x: 100, y: 0, stepX: 150 }
    });
    // Need to re-set collision bounds for each ATS enemy
    this.ats.children.iterate(ats => {
      ats.setCollideWorldBounds(true);
      ats.speed = Phaser.Math.Between(80, 120);
      ats.speed = Math.random() < 0.5 ? -1 * ats.speed : ats.speed; // Random initial direction
    });


    // Collision setup
    this._setupCollisions();

    // Input handling
    this._handleInput();
  }

  update() {
    this.player.update(this.inputManager);

    // Update all ATS enemies
    this.ats.children.iterate(ats => {
      ats.update();
    });
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

    // Set up collisions between ats enemies and platforms
    this.physics.add.collider(this.ats, this.platforms);
    // Set up collisions between player and ats enemies
    this.physics.add.collider(this.player, this.ats, this._handleATSPlayerCollision, null, this);
  }

  _handleATSPlayerCollision(player, ats) {
    // Handle collision between player and ats  
    ats.setActive(false).setVisible(false);
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