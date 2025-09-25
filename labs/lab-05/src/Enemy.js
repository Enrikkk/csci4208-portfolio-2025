class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    // Class Constructor.
    constructor(scene, position) {
        super(scene, position.x, position.y, 'enemy');
        this.depth = 2;
        scene.add.existing(this);
        
        // Now, let's make the enemies move.
        scene.physics.add.existing(this); // We add ourselves to the scene's physics.
        // We set the x velocity to a random negative number so that the enemies 
        // move towards our direction (to the left of the screen).
        this.body.velocity.x = -Phaser.Math.Between(300, 500);
        
        // Movement animation.
        this.anims.play('enemy-move', true);
        
        // Projectile logic.
        this.last_fired = 0;
        this.projectiles = scene.enemy_projectiles;
        this.attack_duration = Phaser.Math.Between(2000, 4000);
    }
    
    // Method so that enemies can attack.
    attack(time) {

        // To prevent inactive enemies from shooting.
        if (!this.active || !this.body || !this.scene) return;

        if( time - this.last_fired > this.attack_duration ) {
            const position = { x:this.x, y:this.y };
            const velocity = { x:this.body.velocity.x-150, y:0 };
            const projectile = new Projectile(this.scene, position, velocity);
            this.projectiles.push(projectile);
            this.last_fired = time;
            this.attack_duration = Phaser.Math.Between(500, 6000);
        }
    }
}