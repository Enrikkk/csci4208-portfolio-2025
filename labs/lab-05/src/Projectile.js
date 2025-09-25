class Projectile extends Phaser.Physics.Arcade.Sprite {

    // Class Constructor.
    constructor(scene, position, velocity) {
        super(scene, position.x, position.y, 'projectile');
        this.depth = 1;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.velocity.x = velocity.x;
        this.body.velocity.y = velocity.y;
    }
}