class PlayScene extends Phaser.Scene {
    
    // Main Functions.
    //construct new scene
    constructor() {
        super('play'); //set this scene's id within superclass constructor
    }
    
    //preload external game assets
    preload() {
        this.load.path = 'assets/';
        this.load.image('background', 'background.png');
        this.load.image('player', 'player.png');
        this.load.image('enemy', 'enemy.png');
        this.load.image('projectile', 'projectile.png');
        this.load.image( 'powerup-projectile', 'powerup-1.png' );
        this.load.image( 'powerup-slay', 'powerup-2.png' );
        
        // Animations.
        // Player.
        this.load.image('player-0', 'player-0.png'); // Walk animation frame 1.
        this.load.image('player-1', 'player-1.png'); // Walk animation frame 2.
        // Enemies.
        this.load.image('enemy-0', 'enemy-0.png');
        this.load.image('enemy-1', 'enemy-1.png');
    }
    
    //create game data
    create() {
        this.create_map();
        this.create_projectiles();
        this.create_animations();
        this.create_player();
        this.create_enemies();
        this.create_powerups();
        this.create_collisions();
        this.create_hud(); // For scores.
        
        // Listener to stop playing.
        this.input.keyboard.on('keydown-ESC', () => { this.scene.start('title'); });
    }
    
    //Update game data
    update(time) {
        this.update_player(time);
        this.update_enemies(time);
        this.update_projectiles();
        this.update_background();
        this.update_score();
    }
    
    // Helper Functions.
    // Create Helper Functions.
    // Create the game's map.
    create_map() {
        this.background = this.add.tileSprite(640/2, 480/2, 640, 480, 'background');
    }
    
    // Create the player.
    create_player() {
        this.player = new Player(this);
    }
    
    // Create Enemies.
    create_enemies() {
        this.enemies = [];
        
        const event = new Object();
        event.delay = 100;
        event.callback = this.spawn_enemy;
        event.callbackScope = this;
        event.loop = true;
        
        // Queue the enemy spawn.
        this.time.addEvent(event, this);
    }
    
    // Spawn Enemies.
    spawn_enemy() {
        const position = {};
        
        position.x = 640 + 32;
        position.y = Phaser.Math.Between(0, 480);
        const monster = new Enemy(this, position);
        
        this.enemies.push(monster);
        this.score += 1;
    }
    
    // Create Power Ups.
    create_powerups() {
        this.powerups = [];
        const event = new Object();
        event.delay = 1000;
        event.callback = this.spawn_powerup;
        event.callbackScope = this;
        event.loop = true;
        this.time.addEvent(event, this);
    }
    
    // Spawn Power Ups.
    spawn_powerup() {
        if (Phaser.Math.Between(0, 4) !== 0) return;
        
        this.powerup_types = [ProjectilePowerUp, SlayPowerUp]
        
        // 1. Pick a PowerUp CLASS
        const PowerUpClass = Phaser.Utils.Array.GetRandom(this.powerup_types);
        
        // 2. Define the spawn position
        const position = {
            x: 640 + 32,
            y: Phaser.Math.Between(50, 430)
        };
        
        // 3. Instantiate the chosen class and add it to a SINGLE group/array
        const powerup = new PowerUpClass(this, position.x, position.y);
        this.powerups.push(powerup);
    }
    
    // The beautifully simple, polymorphic callback
    collect_powerup(player, powerup) {
        // Tell the power-up to do its thing. The scene doesn't care what it is.
        powerup.applyEffect(player);
        powerup.destroy();
    }
    
    // Create collisions (between player and enemies).
    create_collisions() {
        this.physics.add.overlap(this.player, this.enemies, this.game_over, null, this);
        this.physics.add.overlap(this.player_projectiles,this.enemies,this.slay_enemy,null,this);
        this.physics.add.overlap(this.enemy_projectiles,this.player,this.game_over,null,this);
        this.physics.add.overlap(this.player_projectiles,this.enemy_projectiles,this.destroy_projectiles,null,this);
        this.physics.add.overlap(this.player, this.powerups, this.collect_powerup, null, this);
    }
    
    // Game Over.
    game_over() {
        
        const {top_score, winner} = this.registry.values;
        
        // Update game over.
        if (this.score >= top_score) {
            this.registry.set('top_score', this.score);
            this.physics.pause(); // freeze gameplay
            const winner = prompt("Winner! Enter you name: ");
            this.registry.set('winner', winner || 'Top Score');
            this.input.keyboard.keys = [] // reset phaser keys stream, so that we don't have blocked keys
        }
        
        this.cameras.main.flash();
        this.scene.restart();
    }
    
    // Method to create animations for either the player and the enemies.
    create_animations(scene) {
        
        // Player moving animation.
        if(!this.anims.exists('player-move')) {
            const anim_player_move = new Object();
            
            anim_player_move.key = 'player-move'; //key to register into phaser
            anim_player_move.frames = [{key: 'player-0'}, {key: 'player-1'}]; //list of image keys for anim
            anim_player_move.frameRate = 6; //speed to play animation (6fps)
            anim_player_move.repeat = -1; //-1 for infinite loop
            
            this.anims.create(anim_player_move);
        }
        
        // Enemies moving animation.
        if(!this.anims.exists('enemy-move')) {
            const anim_enemy_move = new Object();
            
            anim_enemy_move.key = 'enemy-move'; //key to register into phaser
            anim_enemy_move.frames = [{key: 'enemy-0'}, {key: 'enemy-1'}]; //list of image keys for anim
            anim_enemy_move.frameRate = 6; //speed to play animation (6fps)
            anim_enemy_move.repeat = -1; //-1 for infinite loop
            
            this.anims.create(anim_enemy_move);
        }
    }
    
    create_hud() {
        
        // Actual Score text.
        this.score = 0;
        this.score_text = this.add.text(32, 32, "");
        this.score_text.depth = 3;
        this.score_text.setColor( 'rgb(255,255,255)' );
        
        // Initialize persistent state by reading from the registry
        const {winner, top_score} = this.registry.values;
        
        // Top score text.
        this.top_score_text = this.add.text(600, 32, `${winner}: ${top_score}`);
        this.top_score_text.depth = 3;
        
        // So that text won't get out of the screen.
        // Aligns text with the top (0) right (1) corner of the screen.
        this.top_score_text.setOrigin(1,0);
    }
    
    create_projectiles() {
        this.player_projectiles = [];
        this.enemy_projectiles = [];
    }
    
    
    // Update Helper Functions.
    // Update the player.
    update_player(time) {
        this.player.move();
        this.player.attack(time);
    }
    
    // Update the enemies.
    update_enemies(time){
        // 1. Update all enemies
        this.enemies.forEach(enemy => enemy.attack(time));
        
        // 2. Destroy enemies that go off-screen (using a reverse for loop for safe removal)
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            
            // Check if the enemy is fully off the left edge of the screen
            if (enemy.x < -64) { // Assuming 32px object width
                enemy.destroy(); // Remove from scene/physics
                this.enemies.splice(i, 1); // Remove from the array (CRUCIAL step)
            }
        }
    }
    
    update_projectiles() {
        // Clean up player projectiles
        for (let i = this.player_projectiles.length - 1; i >= 0; i--) {
            const projectile = this.player_projectiles[i];
            
            // Assuming player projectiles move right (x > 640)
            if (projectile.x > 640 + 32) { 
                projectile.destroy();
                this.player_projectiles.splice(i, 1);
            }
        }
        
        // Clean up enemy projectiles
        for (let i = this.enemy_projectiles.length - 1; i >= 0; i--) {
            const projectile = this.enemy_projectiles[i];
            
            // Assuming enemy projectiles move left (x < 0)
            if (projectile.x < -32) { 
                projectile.destroy();
                this.enemy_projectiles.splice(i, 1);
            }
        }
    }
    
    // Function to update the background, to make it look like scrolling.
    update_background() {
        this.background.tilePositionX += 5;
    }
    
    // Method to update the player's score.
    update_score() {
        this.score_text.setText("Score: " + this.score);
        const {winner, top_score} = this.registry.values;
        this.top_score_text.setText(`${winner}: ${top_score}`);
    }
    
    // Method to kill an enemy with a projectile. 
    slay_enemy(projectile, enemy) {
        enemy.destroy();
        projectile.destroy();
        
        // BONUS: If enemy killed, +1 extra point.
        this.score += 1;
    }
    
    destroy_projectiles(projectile1, projectile2) {
        projectile1.destroy();
        projectile2.destroy();
        
        this.score += 5;
    }
    
}