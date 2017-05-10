
var myConfig = {
canWidth : 480,
canHeight : 270, 
animeInterval : 10,
cannonWidth : 30,
cannonHeight :30,
}

var mySquare;
var myCannon;
var myBullet = [];
var myObstacles = [];
var myScore;
var myPts =0;


function startGame() {
    
    myGameArea.start();
    myScore = new component("20px", "Consolas", "black", 10, 30, "text");
    myScore.text = "Score: 0"; 
    myCannon = new component( myConfig.cannonWidth,myConfig.cannonHeight,"pic/cannon1.png",(myGameArea.canvas.width/2)-(myConfig.cannonWidth/2),myGameArea.canvas.height-myConfig.cannonHeight,"image");

}
var myGameArea = {
	
    canvas : document.createElement("canvas"),
    
    start : function() {
    	
        this.canvas.width = myConfig.canWidth
        this.canvas.height = myConfig.canHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, myConfig.animeInterval);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
        })
  	
  	},
  	
  	clear : function() {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    },

  	stop : function() {

        clearInterval(this.interval);
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 150,100);
        

    }
}

function component(width, height, color, x, y,type) {
    this.type = type
    if (type == "image") {
    	this.image = new Image();
    	this.image.src = color;
  		}
  		if (type == "text") {
  		
  		}
  		
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
        
    this.update = function(){
    ctx = myGameArea.context;
    
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
    	
    	}
        if (type == "image") {
      		ctx.drawImage(this.image, 
        		this.x, 
        		this.y,
        		this.width, this.height);
    		} else {
        		ctx.fillStyle = color;
        		ctx.fillRect(this.x, this.y, this.width, this.height);
			}
    };
    
    this.newPos = function() {
		  if (this.x < myGameArea.canvas.width-30 && this.x>0 ) {        
        this.x += this.speedX;
        }
        if (this.x==0) {this.x=1}
        if (this.x==myGameArea.canvas.width-30) {this.x=myGameArea.canvas.width-30-1}
        this.y += this.speedY; 
    };
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    };
    
}  
function updateGameArea() {
	//koniec gry kiedy cel trafi w działo
	
	  for (i = 0; i < myObstacles.length; i++) {
        
        if (myCannon.crashWith(myObstacles[i])) {
            
            myGameArea.stop();
					            
            return;
        } 
    	}
    //gdy strzał celny usuń trafiony cel oraz nalicz punktacje
    
     for (i = 0; i<myObstacles.length; i++) {
     
     		for (j=0;j<myBullet.length;j++) {
     			
     			if (myBullet[j].crashWith(myObstacles[i])) {
     				
     				myObstacles.splice(i,1);
					myBullet.splice(j,1);
					myPts += 1;
					myScore.text = "Score: " + myPts;
								
     			}
     		}	
     	
     	
     }
    

		myGameArea.clear();
		myCannon.speedX=0;
		myGameArea.frameNo += 1;
		myScore.update();
	
		//ruch działem (prawo, lewo)
	
		if (myGameArea.keys && myGameArea.keys[37]) {myCannon.speedX = -1; }
	
		if (myGameArea.keys && myGameArea.keys[39]) {myCannon.speedX = 1; }
	
		myCannon.newPos();	
		myCannon.update();
		// cele do odstrzelenie ;)
		var x;   

   	if (myGameArea.frameNo == 1 || everyinterval(150)) {
   
			x = Math.floor(Math.random()*myGameArea.canvas.width - 20);
			myObstacles.push(new component(20,20,"blue",x,0));   
  		 }
	
		for (i=0;i<myObstacles.length;i++) {
		
			myObstacles[i].y +=1;
			myObstacles[i].update();
		}
	   

   	//strzał (jeśli choć jeden poprzedni pocisk jest na odpowiedniej wysokości)	
   
		var nextBullet=true;
		
		for(i=0;i<myBullet.length;i++){
		
			if (myBullet[i].y>150) nextBullet=false;
			
			myBullet[i].y +=-1;
			myBullet[i].update();
		}
		
		if (myGameArea.keys && myGameArea.keys[32] && nextBullet) {
		
				myBullet.push (new component(10,10,"red",myCannon.x+10,myCannon.y-10));
		}
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

document.body.onload = startGame();