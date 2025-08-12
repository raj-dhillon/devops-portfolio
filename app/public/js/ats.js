export default class ATS extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ats_enemy');

        // Initialize the ats sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // NONE OF THIS IS BEING SET FOR SOME REASON
        if (!this.speed) {
            this.setDefaults();
        }
    }

    update() {
        // Handle ats movement and behavior
        // If stuck or barely moving, nudge in a random direction
        // if (Math.abs(this.body.velocity.x) < 10) {
        //     this.speed *= -1;
        //     this.setVelocityX(this.speed)
        // }
        this.setVelocityX(this.speed);
        // this._raycast(); 
        this._checkEdge();
    }

    setDefaults() {
        // Set initial properties
        this.setCollideWorldBounds(true);
        // this.body.onWorldBounds = true;
        this.setBounce(1);
        // this.speed = Phaser.Math.Between(80, 120);
        this.speed = 200;
        this.speed = Math.random() < 0.5 ? -this.speed : this.speed; // Random initial direction
    }

    _checkEdge() {
        const isMovingRight = this.speed > 0;
        const edgeX = this.x + (isMovingRight ? this.width / 2 + 1 : -this.width / 2 - 1);
        const edgeY = this.y + this.height / 2 + 2;

        // Check if near left or right bounds of the world (add small margin)
        const margin = 2;
        const worldLeftBound = 0;
        const worldRightBound = this.scene.physics.world.bounds.width;

        if (edgeX < worldLeftBound + margin || edgeX > worldRightBound - margin) {
            this.speed *= -1; // reverse direction
            this.setVelocityX(this.speed);
            return; // no need to check for ground if we hit a world edge
        }

        // Cast a very small overlap check below front edge
        const groundAhead = this.scene.physics.overlapRect(edgeX, edgeY, 2, 2, true, true).some(obj => {
            return obj.gameObject &&
            obj.gameObject !== this && 
            obj.gameObject.body?.immovable
        });
            // .some(obj => obj.gameObject?.isPlatform);
        console.log(groundAhead);

        if (!groundAhead) {
            this.speed *= -1; // reverse direction
            this.setVelocityX(this.speed);
        }
    }

    _raycast() {
        // Implement raycasting logic
        const isMovingRight = this.body.velocity.x > 0;
        // const isMovingRight = this.speed > 0;
        const offsetX = isMovingRight ? this.width / 2 + 1 : -this.width / 2 - 1;
        const offsetY = this.height / 2 + 1;

        // Raycast style check for tile/ground under the front foot
        const nextTile = this.scene.physics.overlapRect(
            this.x + offsetX,
            this.y + offsetY,
            2, // narrow width
            2,  // narrow height
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