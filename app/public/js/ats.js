export default class ATS extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ats_enemy');

        // Initialize the ats sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        // NONE OF THIS IS BEING SET FOR SOME REASON
        this.setDefaults();

    }

    update() {
        // Handle ats movement and behavior
        // If stuck or barely moving, nudge in a random direction
        if (Math.abs(this.body.velocity.x) < 10) {
            this.speed *= -1;
            this.setVelocityX(this.speed)
        }
        // this._raycast();
    }

    setDefaults() {
        // Set initial properties
        this.setCollideWorldBounds(true);
        // this.body.onWorldBounds = true;
        this.setBounce(1);
        this.speed = Phaser.Math.Between(80, 120);
        this.speed = Math.random() < 0.5 ? -this.speed : this.speed; // Random initial direction
    }

    _raycast() {
        // Implement raycasting logic
        // const isMovingRight = this.body.velocity.x > 0;
        const isMovingRight = this.speed > 0;
        const offsetX = isMovingRight ? this.width / 2 + 1 : -this.width / 2 - 1;
        const offsetY = this.height / 2 + 1;

        // Raycast style check for tile/ground under the front foot
        const nextTile = this.scene.physics.overlapRect(
            this.x + offsetX,
            this.y + offsetY,
            5, // narrow width
            5,  // narrow height
            true,
            true
        );
        console.log(nextTile);
        if (nextTile.length === 0) {
            // No ground ahead, turn around
            this.setVelocityX(isMovingRight ? -this.speed : this.speed);
        }
    }
}