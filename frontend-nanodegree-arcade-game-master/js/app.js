'use strict';
var variable= variable||{};
 variable.count=0;
 variable.check=0;
// Enemies our player must avoid
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed =  Math.random()*300;
};

// Updating the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
          this.x = this.x + this.speed*dt;
    if(this.x >= 500) {
        this.x = -100;
    }


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  player class
// This class requires an update(), render() and
// a handleInput() method.


var Player=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update=function(dt){
    this.checkCollisions();
        this.win();

};

Player.prototype.win=function(){
    if(this.y<=40 && this.y>=0){
       ctx.fillStyle = "yellow";
       ctx.fillRect(0,0,500,100);
         ctx.font = "bold 40px sans-serif";
         ctx.fillStyle="red";
        ctx.fillText(" YOU WON!!!",50,50);
        variable.check=1;

    }
};

Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput=function(direction) {
     if(direction ==='left'&& this.x>10 ){
        this.x -= 50;
    }
    else if(direction==='right'&& this.x<390){
        this.x+=50;
    }
    else if(direction==='up'&& this.y>0 ){
        this.y-=50;
    }
    else if(direction==='down' && this.y<390){
        this.y+=50;
}

};
// to check colllisions
Player.prototype.checkCollisions = function() {
 for(var i=0; i<allEnemies.length; i++) {
if(this.x +50> allEnemies[i].x  && this.x  <allEnemies[i].x+50 && this.y + 50> allEnemies[i].y  && this.y < allEnemies[i].y+50 ) {
variable.count=variable.count+1;
this.warning();
this.reset();
     }
   }
};

Player.prototype.reset = function() {
this.x = 200;
this.y = 400;

};
// warning after 2 collisions
Player.prototype.warning= function(){  //to warn  after 2 collision
if(variable.count===2){
       ctx.fillStyle="red";
       ctx.fillRect(0,0,500,100);
       ctx.font = "bold 30px sans-serif";
       ctx.fillStyle="yellow";
       ctx.fillText("oops.. one life remaining!!!",50,25);
       }
       else if(variable.count===3){
        ctx.fillStyle="red";
       ctx.fillRect(0,0,500,100);
       ctx.font = "bold 30px sans-serif";
       ctx.fillStyle="yellow";
       ctx.fillText("GAME OVER, Reload",50,25);
       variable.check=1;

       }
};


//  instantiating  objects.

var enemy1= new Enemy(0,50);
var enemy2= new Enemy(65,100);
var enemy3= new Enemy(130,230);
var enemy4= new Enemy(-65,300);

var allEnemies=[enemy1 ,enemy2, enemy3, enemy4];
var player= new Player(200,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
 if(variable.check===0){
    var allowedKeys = {

        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
}

    player.handleInput(allowedKeys[e.keyCode]);
});
