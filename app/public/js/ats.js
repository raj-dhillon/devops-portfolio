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
        this.setVelocityX(this.speed);
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

        // Check if it has patrol region
        if (this.patrolRegion) {
            // Check if within patrol region bounds
            const {left: patrolLeft, right: patrolRight} = this.patrolRegion;
            if (edgeX < patrolLeft + margin || edgeX > patrolRight - margin) {
                this.speed *= -1; // reverse direction
                this.setVelocityX(this.speed);
                return; // no need to check for ground if we hit patrol bounds
            }
        }

        // Cast a very small overlap check below front edge
        const groundAhead = this.scene.physics.overlapRect(edgeX, edgeY, 2, 2, true, true).some(obj => {
            return obj.gameObject &&
            obj.gameObject !== this && 
            obj.gameObject.body?.immovable
        });

        if (!groundAhead) {
            this.speed *= -1; // reverse direction
            this.setVelocityX(this.speed);
        }
    }}
