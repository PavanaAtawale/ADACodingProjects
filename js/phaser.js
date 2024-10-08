var GAME_W = 800;
var GAME_H = 600;
var game = new Phaser.Game( GAME_W, GAME_H, Phaser.AUTO, '', { preload: preload, create: create5, update: update5 });

function preload() {
	game.load.image('sky', 'http://www.adacoding.com/phaser/assets/sky.png');
    game.load.image('ground', 'http://www.adacoding.com/phaser/assets/platform.png');
    game.load.image('star', 'http://www.adacoding.com/phaser/assets/star.png');
    game.load.image('angrybird', 'http://www.adacoding.com/phaser/assets/angrybird.png');
    game.load.spritesheet('dude', 'http://www.adacoding.com/phaser/assets/dude.png', 32, 48);
    game.load.image('dudeframes', 'http://www.adacoding.com/phaser/assets/dude.png');
}

function create() {
	game.add.sprite(0, 0, 'sky');
	game.add.sprite(100, 100, 'star');
    game.add.sprite(100, 200, 'angrybird');
    game.add.sprite(100, 300, 'dude');
    game.add.sprite(200, 200, 'dudeframes');
    game.add.sprite(0, 500, 'ground');
}

function update() {
}

//Step 2: create the scene
var platforms;

function create1() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;
}

//Class work: place 4 stars on left ledge, and 3 birds on the right ledge and dude on the ground

//Step 3:
var player;
function create2() {

	create1();

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function update2() {
    // Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
}

//Step 3: change update function to jump

function create3() {
	create2();
    
	//Create keyboard cursors
	cursors = game.input.keyboard.createCursorKeys();
}

function update3() {
    // Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);

 	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}

//Step 4: star and everything else
var stars;

function create4() {
	create3();
    
    stars = game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 30; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 30, 0, 'angrybird');

        //  Let gravity do its thing
        star.body.gravity.y = 50;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}

function update4() {
	update3();
    
	game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 100;
    scoreText.text = 'Score: ' + score;
}

//Step 5: calculate score
var score = 0;
var scoreText;

function create5() {
	create4();
    
    scoreText = game.add.text(16, 16, 'score: Game has not started yet! Sorry no points yet! =C', { fontSize: '28px', fill: '#000' });
}

function update5() {
	update3();
	game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
}    
    
