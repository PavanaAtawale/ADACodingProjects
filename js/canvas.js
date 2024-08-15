//Single box moving down
function step1() {
    
    //Data to represent a box. Javascript object.
    var box = {x:200, y:10, w:10, h:20, s:1};

    //This variable connects your HTML page to the game
    var game = document.getElementById("mygame").getContext("2d");
    var gameWidth = document.getElementById("mygame").width;
    var gameHeight = document.getElementById("mygame").height;

    //Function to update the location of the box
    var update = function() {
      box.y = box.y +  box.s; //Just move the box down
    };

    //show it on the screen - just drawing the scene from the current data
    var draw = function() {
      game.clearRect(0,0, gameWidth, gameHeight);      
      game.fillStyle = "purple";
      game.fillRect(box.x, box.y, box.w, box.h);      
    };

    //This is the boilerplate animation loop.
    var animate = function() {
      update();
      draw();
      window.requestAnimationFrame(animate);
    };

    //This starts the animation.
    animate();
}


//An array of boxes moving down
function step2() {
    
    //Data to represent a box. Javascript object.
    var boxes = [
      { x: 100, y: 100, s: 1, w: 40, h: 40},
      { x: 220, y: 100, s: 2, w: 40, h: 40},
      { x: 340, y: 100, s: 3, w: 40, h: 40},
      { x: 460, y: 100, s: 7, w: 40, h: 40},
      { x: 580, y: 100, s: 9, w: 40, h: 40}
    ];  

    //This variable connects your HTML page to the game
    var game = document.getElementById("mygame").getContext("2d");
    var gameWidth = document.getElementById("mygame").width;
    var gameHeight = document.getElementById("mygame").height;

    //Function to update the location of the box
    var update = function() {
    
    	//Looping over each box
      	boxes.forEach ( function(box, id) {
        	box.y += box.s;
      	}) ;
      
    
    };

    //show it on the screen - just drawing the scene from the current data
    var draw = function() {
      game.clearRect(0,0, gameWidth, gameHeight);      
      game.fillStyle = "purple";
      
    	//Looping over each box
      	boxes.forEach ( function(box, id) {
        	game.fillRect(box.x, box.y, box.w, box.h);
      	}) ;      
            
    };

    //This is the boilerplate animation loop.
    var animate = function() {
      update();
      draw();
      window.requestAnimationFrame(animate);
    };

    //This starts the animation.
    animate();
}

//An array of boxes moving up and down
function step3() {
    
    //Data to represent a box. Javascript object.
    var boxes = [
      { x: 100, y: 100, s: 1, w: 40, h: 40},
      { x: 220, y: 100, s: 2, w: 40, h: 40},
      { x: 340, y: 100, s: 3, w: 40, h: 40},
      { x: 460, y: 100, s: 7, w: 40, h: 40},
      { x: 580, y: 100, s: 9, w: 40, h: 40}
    ];      

    //This variable connects your HTML page to the game
    var game = document.getElementById("mygame").getContext("2d");
    var gameWidth = document.getElementById("mygame").width;
    var gameHeight = document.getElementById("mygame").height;

    //Function to update the location of the box
    var update = function() {
    
    	//Looping over each box
      	boxes.forEach ( function(box, id) {
        	
            box.y += box.s;
            
        	//check borders
        	if(box.y <= 10) {
          		box.y = 10;
          		box.s *= -1;
        	}
        	else if(box.y >= gameHeight - 50) {
          		box.y = gameHeight - 50;
          		box.s *= -1;
        	}            
            
      	}) ;
      
    
    };

    //show it on the screen - just drawing the scene from the current data
    var draw = function() {
      game.clearRect(0,0, gameWidth, gameHeight);      
      game.fillStyle = "purple";
      
    	//Looping over each box
      	boxes.forEach ( function(box, id) {
        	game.fillRect(box.x, box.y, box.w, box.h);
      	}) ;      
            
    };

    //This is the boilerplate animation loop.
    var animate = function() {
      update();
      draw();
      window.requestAnimationFrame(animate);
    };

    //This starts the animation.
    animate();
}


//An player and the goal objects
function step4() {
    
    //Data to represent a box. Javascript object.
    var boxes = [
      { x: 100, y: 100, s: 1, w: 40, h: 40},
      { x: 220, y: 100, s: 2, w: 40, h: 40},
      { x: 340, y: 100, s: 3, w: 40, h: 40},
      { x: 460, y: 100, s: 7, w: 40, h: 40},
      { x: 580, y: 100, s: 9, w: 40, h: 40}
    ];     

    //This variable connects your HTML page to the game
    var game = document.getElementById("mygame").getContext("2d");
    var gameWidth = document.getElementById("mygame").width;
    var gameHeight = document.getElementById("mygame").height;

    //the player object
    var player = { x: 10, y: 160, s:1, w: 40, h: 40, isMoving: false };
    
    //make the player move
    var movePlayer = function(){
    	player.isMoving = true;
    };
    
    //make the player stop
    var stopPlayer = function(){
    	player.isMoving = false;
    };

    //the goal object
    var goal = { x: gameWidth - 40, y: 160, w: 50, h: 36 }
    
    //Needed to stop the game
    var gameLive = true;
    
    //event listeners to move player
    document.getElementById("mygame").addEventListener("mousedown", movePlayer);
    document.getElementById("mygame").addEventListener("mouseup", stopPlayer);
    document.getElementById("mygame").addEventListener('touchstart', movePlayer);
    document.getElementById("mygame").addEventListener('touchend', stopPlayer);   
    

    //Function to update the location of the box
    var update = function() {
    
        //check if you've won the game
        if(checkCollision(player, goal)) {
          //stop the game
            gameLive = false;
            alert('You win!');

            //reload page
            window.location = "";
        }


        //update player if the player is moving
        if(player.isMoving) {
          player.x = player.x + player.s;
        }
    
    
    
    	//Looping over each box
      	boxes.forEach ( function(box, id) {
        	
            //check for collision with player
            if(checkCollision(player, box)) {
            	//stop the game
            	gameLive = false;
            	alert('Game Over');
            
            	//reload
            	window.location = "";
            }              
            
            box.y += box.s;
            
        	//check borders
        	if(box.y <= 10) {
          		box.y = 10;
          		box.s *= -1;
        	}
        	else if(box.y >= gameHeight - 50) {
          		box.y = gameHeight - 50;
          		box.s *= -1;
        	}            
            
      	}) ;
        
      
    
    };

    //show it on the screen - just drawing the scene from the current data
    var draw = function() {
      	game.clearRect(0,0, gameWidth, gameHeight);      


      	//draw player
      	game.fillStyle = "#00FF00";
      	game.fillRect(player.x, player.y, player.w, player.h);
      
      	//draw goal
      	game.fillStyle = "rgb(255,255,0)";
      	game.fillRect(goal.x, goal.y, goal.w, goal.h);
      
      	game.fillStyle = "purple";
    	//Looping over each box
      	boxes.forEach ( function(box, id) {
        	game.fillRect(box.x, box.y, box.w, box.h);
      	}) ;      
            
    };
    

    //This is the boilerplate animation loop.
    var animate = function() {
      update();
      draw();
      window.requestAnimationFrame(animate);
    };


    var checkCollision = function(rect1, rect2) {
        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        return closeOnHeight && closeOnWidth;
    }

    //This starts the animation.
    animate();
}

//An player and the goal objects
function step5() {
    
    //Data to represent a box. Javascript object.
    var boxes = [
      { x: 100, y: 100, s: 1, w: 40, h: 30},
      { x: 220, y: 100, s: 2, w: 40, h: 30},
      { x: 340, y: 100, s: 3, w: 40, h: 30},
      { x: 460, y: 100, s: 7, w: 40, h: 30},
      { x: 580, y: 100, s: 9, w: 40, h: 30}
    ];    

    //This variable connects your HTML page to the game
    var game = document.getElementById("mygame").getContext("2d");
    var gameWidth = document.getElementById("mygame").width;
    var gameHeight = document.getElementById("mygame").height;

    //the player object
    var player = { x: 10, y: 160, s:1, w: 40, h: 40, isMoving: false };
    
    //make the player move
    var movePlayer = function(){
    	player.isMoving = true;
    };
    
    //make the player stop
    var stopPlayer = function(){
    	player.isMoving = false;
    };

    //the goal object
    var goal = { x: gameWidth - 50, y: 160, w: 50, h: 36 };
    
    //Needed to stop the game
    var gameLive = true;
    
    //event listeners to move player
    document.getElementById("mygame").addEventListener("mousedown", movePlayer);
    document.getElementById("mygame").addEventListener("mouseup", stopPlayer);
    document.getElementById("mygame").addEventListener('touchstart', movePlayer);
    document.getElementById("mygame").addEventListener('touchend', stopPlayer);   
    
	//Get some images
	var imagePlayer = new Image();
    imagePlayer.src = 'http://vignette2.wikia.nocookie.net/harrypotter/images/a/a1/Golden-snitch-lrg.png/revision/latest?cb=20160731003110';

	var imageGoal = new Image();
    imageGoal.src = 'http://cliparting.com/wp-content/uploads/2017/01/Treasure-chest-free-to-use-clip-art.png';

	var imageBox = new Image();
    imageBox.src = 'http://gallery.yopriceville.com/downloadfullsize/send/11196';

	var imageBackground = new Image();
    imageBackground.src = 'http://i583.photobucket.com/albums/ss280/phatx_photos/HOGWARTS/hogwartsquidditchfield.jpg';
    

    //Function to update the location of the box
    var update = function() {
    
        //check if you've won the game
        if(checkCollision(player, goal)) {
          //stop the game
            gameLive = false;
            alert('You win!');

            //reload page
            window.location = "";
        }


        //update player if the player is moving
        if(player.isMoving) {
          player.x = player.x + player.s;
        }
    
    
    
    	//Looping over each box
      	boxes.forEach ( function(box, id) {
        	
            //check for collision with player
            if(checkCollision(player, box)) {
            	//stop the game
            	gameLive = false;
            	alert('Game Over');
            
            	//reload
            	window.location = "";
            }              
            
            box.y += box.s;
            
        	//check borders
        	if(box.y <= 10) {
          		box.y = 10;
          		box.s *= -1;
        	}
        	else if(box.y >= gameHeight - 50) {
          		box.y = gameHeight - 50;
          		box.s *= -1;
        	}            
            
      	}) ;
        
      
    
    };

    //show it on the screen - just drawing the scene from the current data
    var draw = function() {
      	game.clearRect(0,0, gameWidth, gameHeight);      

      	game.drawImage(imageBackground, 0, 0, gameWidth, gameHeight);      
      	game.drawImage(imagePlayer, player.x, player.y, player.w, player.h);     
      	game.drawImage(imageGoal, goal.x, goal.y, 64, 64);
      
      	boxes.forEach ( function(box, id) {
            game.drawImage(imageBox, box.x, box.y, box.w, box.h);        
      	}) ;      
            
    };
    

    //This is the boilerplate animation loop.
    var animate = function() {
      update();
      draw();
      window.requestAnimationFrame(animate);
    };


    var checkCollision = function(rect1, rect2) {
        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        return closeOnHeight && closeOnWidth;
    }

    //This starts the animation.
    animate();
}

    