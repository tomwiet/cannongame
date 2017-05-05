var mySquare;
var myCannon;
var myBullet;


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
	
	if (myGameArea.keys && myGameArea.keys[37]) {myCannon.speedX = -1; }
	
	if (myGameArea.keys && myGameArea.keys[39]) {myCannon.speedX = 1; }
	
	myCannon.newPos();	
	myCannon.update();
	
	if (myGameArea.keys && myGameArea.keys[32]) {
		myBullet = new component(10,10,"red",myCannon.x+10,myCannon.y-10); 
		
		}
   
   
	
	if (myBullet) {
		myBullet.speedY=-1;
		myBullet.newPos();
		myBullet.update();		
	}
	
}

document.body.onload = startGame();