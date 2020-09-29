 var arr = [];
 var len = 100;
 var lenInd=1;
 var canvas;
 var actions = [];
 var updateInd=0;	
 var fps =1000;
 var canvasSize=500;
 var circleCount=0;
 var totalCount=0;
 
 
function speed(){
	fps+=2;
}
function slow(){
	fps-=2;
}

 function animate(){
	
	update();
	requestAnimationFrame(animate);
	
	
}

 function init(){
	canvas = document.getElementById('myCanvas');
	draw();
	animate();
 }
 
  function draw() {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvasSize, canvasSize);
		ctx.fillStyle='rgb(0, 0, 0)';
		ctx.fillRect(0, 0, canvasSize, canvasSize);
		ctx.beginPath();
		ctx.arc(250, 250, 250, 0, 2 * Math.PI);
		ctx.fillStyle='rgb(255, 0, 0)';
		ctx.fill();
		
		ctx.stroke();
	}
 }
 
 function update(){
	var x = Math.random()*250-125;
	var y = Math.random()*250-125;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle='rgb(255, 255, 255)';
	if(x*x+y*y<=(250*250)/4){
		circleCount++;
		ctx.fillStyle='rgb(0, 255, 0)';
	}
		
	totalCount++;
	
	ctx.fillRect(250+x*2,250+y*2,2,2);
	document.getElementById("pi").innerHTML = "pi : "+ parseFloat(4*(circleCount/totalCount)).toFixed(8);
 }
 