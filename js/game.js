// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// --------------------------Carga de imagenes-------------------
// --------------------------------------------------------------

// Background image
var bgReady = false; // variable que controla el  Backround
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Monster image
var monstruoReady = false;
var monstruoImage = new Image();
monstruoImage.onload = function() {
    monstruoReady = true;
};
monstruoImage.src = "images/monster.png"

// Hero image
var heroReady = false; 
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// Piedra image
var piedraReady = false; // variable que controla el  Backround
var piedraImage = new Image();
piedraImage.onload = function () {
	piedraReady = true;
};
piedraImage.src = "images/stone.png";


// Game objects
var piedras = {};
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {}; // 
//var princessesCaught = 0;
var princessesCaught =  localStorage.getItem("puntos");
if (princessesCaught ==null){
    princessesCaught =0;
}
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
   // console.log(" keydown "+e.keyCode);	
    keysDown[e.keyCode] = true;
    
}, false);

addEventListener("keyup", function (e) {
    //console.log(" keyup "+e.keyCode);	
    delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    

	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * (canvas.width - 64));
	princess.y = 32 + (Math.random() * (canvas.height - 64));
    if(princess.x ==0){
        princess.x = princess.x +32;   
     } else if(princess.x == 484 ){
        princess.x = princess.x -32;
    
    }else if(princess.y ==0){
        princess.y = princess.y +32;   
     } else if(princess.y == 450 ){
        princess.y = princess.y -32;
    }    
    
    // console.log("resset princesaX "+princess.x);
    //console.log("reset princesaY "+princess.y);
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
        if(hero.y > 32){
                		          //  hero.y -= hero.speed * modifier;
                if (hero.y <=120 && hero.y >=90 && hero.x >= 150 && hero.x<=210){

                    console.log("up "+hero.x+", "+hero.y);                      
                     hero.x = hero.x;
                      hero.y = hero.y;
                }else{
		            hero.y -= hero.speed * modifier;
                }
        }else{

            
            //pintar el mensaje
                ctx.fillStyle = "rgb(250, 250, 250)";
	            ctx.font = "24px Helvetica";
	            ctx.textAlign = "left";
	            ctx.textBaseline = "top";
                ctx.fillText("retorna hacia abajo! ", hero.x-32, hero.y-32);
                hero.y = 32;
        }          

   }
    

   if (40 in keysDown) { // Player holding down
	      if(hero.y < 418){
             
                if (hero.y >=60 && hero.y <=100 && hero.x >= 150 && hero.x <=210) {
                            console.log("down "+hero.x+", "+hero.y);                      
                            hero.x = hero.x;
                            hero.y = hero.y;
                }else{
                     hero.y += hero.speed * modifier;
                }
        }else{

              
              ctx.fillStyle = "rgb(250, 250, 250)";
	          ctx.font = "24px Helvetica";
	          ctx.textAlign = "left";
	          ctx.textBaseline = "top";
              ctx.fillText("retorna hacia arriba! ", hero.x, hero.y+32);
              hero.y = 418;
          }    

    }
	if (37 in keysDown) { // Player holding left
		    if(hero.x > 32){

                    hero.x -= hero.speed * modifier; 
                /*  if (hero.x <= 179 ) {
                        console.log("pieddra "+hero.x+", "+hero.y);                      
                        hero.x = hero.x;
                        hero.y = hero.y;
                   }else{
                      hero.x -= hero.speed * modifier; 
                    }
            } */
            }else{
                hero.x = 32;
            }
    }
	if (39 in keysDown) { // Player holding right
            if(hero.x < 450){		    

                  if (hero.x >= 150 && hero.x <=199 && hero.y >=60 && hero.y <=120) {
                        console.log("derecha "+hero.x+", "+hero.y);                      
                        hero.x = hero.x;
                        hero.y = hero.y;
                 }else{
                      hero.x += hero.speed * modifier; 
                    }

            }else{
                hero.x =450;
            } 
            
    }

	// Are they touching?  // Controla la colision del herore con la princesa
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		localStorage.setItem("puntos", princessesCaught);
		reset();
	}

     
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

    
  if(monstruoReady){

        ctx.drawImage(monstruoImage, 100, 150); 
         ctx.drawImage(monstruoImage, 250, 130); 
    }

    if (piedraReady) {

       
        // piedras columna izquierda       
        ctx.drawImage(piedraImage, 180, 100);
        ctx.drawImage(piedraImage, 100, 250);
        ctx.drawImage(piedraImage, 100, 350);

        // piedras fila superior
         ctx.drawImage(piedraImage, 250, 64); 
     
        
        // columna de la derecha
	    ctx.drawImage(piedraImage, 350, 100); 
        ctx.drawImage(piedraImage, 350, 200); 
        ctx.drawImage(piedraImage, 350, 350);
      

        // Piedras  centro
        ctx.drawImage(piedraImage, 220, 200); 
        ctx.drawImage(piedraImage, 250, 350);  
}
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
