// Configuration for the game
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Create the game
const game = new Phaser.Game(config);

// Load assets
function preload() {
    this.load.image('player', 'sr25fab978dc2aws3.png');
    this.load.image('enemy', 'openart-image_HdbJLJoD_1743849908086_raw.jpg');
}

// Create game objects
function create() {
    // Create player
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setCollideWorldBounds(true);

    // Create enemy group
    this.enemies = this.physics.add.group();

    // Spawn enemies
    this.time.addEvent({
        delay: 1000,
        callback: spawnEnemy,
        callbackScope: this,
        loop: true
    });
}

// Update game state
function update() {
    // Move player
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.LEFT)) {
        this.player.setVelocityX(-200);
    } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.RIGHT)) {
        this.player.setVelocityX(200);
    } else {
        this.player.setVelocityX(0);
    }

    // Check for collisions with enemies
    this.physics.collide(this.player, this.enemies, (player, enemy) => {
        console.log('Collision detected!');
    });
}

// Spawn enemy
function spawnEnemy() {
    const x = Math.random() * 800;
    const y = Math.random() * 600;
    const enemy = this.enemies.create(x, y, 'enemy');
    enemy.setVelocity(Math.random() * 200 - 100, Math.random() * 200 - 100);
}
