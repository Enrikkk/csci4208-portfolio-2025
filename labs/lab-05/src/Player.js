class Player extends Phaser.Physics.Arcade.Sprite {
    
    // Players constructor.
    constructor(scene) {
        super(scene, 300, 200, 'player');
        this.depth = 2;
        this.speed = 200;
        scene.add.existing(this);
        
        // Add physics to the player.
        // It is like adding yourself to the list of things that have physics in the scene.
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); // So that the player won't go out of the map.
        // We make the collision box 16 px smaller, to make it more playable.
        // The "true" parameter is so that it resizes to the center.
        this.body.setSize(this.width-16, this.height-16, true);
        
        // Create an object to check if the arrow keys (or wasd) are being pressed.
        this.buttons = scene.input.keyboard.addKeys('up,down,left,right,w,s,a,d,space');
        
        // Play the movement animation.
        // The true value is so that the animation is not restarted if it has already began.
        this.anims.play('player-move', true);
        
        // Projectile logic.
        this.projectiles = scene.player_projectiles;
        this.last_fired = 0;
        this.projectileScale = 1;
    }
    
    // Function to make the player move.
    move() {
        
        // First, we put the velocity to zero if no key is being pressed.
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        
        // Now, we check which keys are being pressed, and move the player accordingly.
        if(this.buttons.up.isDown || this.buttons.w.isDown)
            this.body.velocity.y = -this.speed
        if(this.buttons.down.isDown || this.buttons.s.isDown)
            this.body.velocity.y = this.speed
        if(this.buttons.left.isDown || this.buttons.a.isDown)
            this.body.velocity.x = -this.speed
        if(this.buttons.right.isDown || this.buttons.d.isDown)
            this.body.velocity.x = this.speed
        
    }
    
    attack(time) {
        if(this.buttons.space.isDown && time - this.last_fired > 400) {
            const position = {x:this.x, y:this.y};
            const velocity = {x:300, y:0};
            const projectile = new Projectile(this.scene, position, velocity);
            
            // scale the sprite you see #POWERUP
            projectile.setScale(this.projectileScale);
            projectile.body.setSize(projectile.displayWidth, projectile.displayHeight, true);
            
            this.projectiles.push(projectile);
            this.last_fired = time;
        }
        
        if(this.buttons.space.isUp) {
            this.last_fired = 0;
        }
    }
}