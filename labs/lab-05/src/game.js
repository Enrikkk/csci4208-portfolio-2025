const config = new Object();

config.width = 640;
config.height = 480;
config.scene = [ TitleScene, PlayScene ]; // For now, we will only have one scene, "PlayScene".
config.physics = { default:'arcade' }; // Collision physics available to all scenes..

const game = new Phaser.Game(config);   // Create new game with determinate configs.