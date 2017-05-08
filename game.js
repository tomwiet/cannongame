var mySquare;
var myCannon;
var myBullet = [];
var myObstacles = [];


function startGame() {
    
    myGameArea.start();
    myCannon = new component(30,30,"cannon1.png",(myGameArea.canvas.width/2)-15,myGameArea.canvas.height-30,"image");

}
var myGameArea = {
	
    canvas : document.createElement("canvas"),
    
    start : function() {
    	
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea,10);
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

    }
}

function component(width, height, color, x, y,type) {
    this.type = type
    if (type == "image") {
    	this.image = new Image();
    	this.image.src = color;
  		}
  		
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
        
    this.update = function(){
        ctx = myGameArea.context;
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
    
}  
function updateGameArea() {

	myGameArea.clear();
	myCannon.speedX=0;
	myGameArea.frameNo += 1;
	
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