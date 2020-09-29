 var arr = [];
 var canvas;
 var actions = [];
 var updateInd=0;	
 var size = 10;
 var sizeInd=0;
 var canvasSize=500;
 var fps=1;

 function draw() {
	 console.log(arr);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvasSize, canvasSize);
		for(var i=0; i<size;i++){
			for(var j=0;j<size;j++){
				ctx.fillStyle = arr[i][j]==1?'rgb(0, 0, 0)':'rgb(255, 255, 255)';
				if(arr[i][j]==1)
					ctx.fillStyle='rgb(0, 0, 0)';
				if(arr[i][j]==0)
					ctx.fillStyle='rgb(255, 255, 255)';
				if(arr[i][j]==2)
					ctx.fillStyle='rgb(0, 0, 255)';
				if(arr[i][j]==3)
					ctx.fillStyle='rgb(255, 0, 0)';
				if(arr[i][j]==4)
					ctx.fillStyle='rgb(0, 255, 0)';
				ctx.fillRect(canvasSize/size*i, canvasSize/size*j, canvasSize/size, canvasSize/size);
			}
		}
	}
 }
 
 function speed(){
	 fps+=5;
 }
 
  function slow(){
	 fps-=5;
	 fps=Math.max(2,fps);
 }
 
 function temp(){
	animate();
 }
 
 function animate(){
	if(updateInd==actions.length){
		return;
	}
	
	setTimeout(function() {
	update();
	draw();
	requestAnimationFrame(animate);
	 }, 1000 / fps);
}

function update(){
	var x = actions[updateInd][0];
	var y = actions[updateInd][1];
	var c = actions[updateInd][2];
	arr[x][y]=c;
	updateInd++;
}
 
 function CS(){
	var sizes=[10,15,20,25,30];
	sizeInd=(sizeInd+1)%sizes.length;
	size = sizes[sizeInd];
	arr=[];
	init();
 }

 function init(){
	canvas = document.getElementById('myCanvas');
	for(var i=0; i<size;i++){
		var temp = [];
		for(var j=0;j<size;j++){
			temp.push(Math.floor(Math.random() * 2));
		}
		arr.push(temp);
	}
	arr[0][0]=0;
	makeAPath();
	draw();
 }
 
 function bfs(){
	var visited={};
	fill(visited,false);
	visited[0]=true;
	var queue = [];
	actions = [];
	var par ={};
	par[[0,0]]=[0,0];
	queue.push(0);
	updateInd=0;
	while(queue.length>0){
		var s = queue.pop()
		var sx = Math.floor(s/size);
		var sy= s%size;
		if(sx==size-1&&sy==size-1){
			animate();
			return;
		}
		var paths = [[0,-1],[-1,0],[1,0],[0,1]];
		for(var i=0;i<4;i++){
			var x =sx+paths[i][0];
			var y =sy+paths[i][1];
			if(isValid(x,y) ){
				if(visited[x*size+y]===false && arr[x][y]==0){
					queue.unshift(x*size+y);
					visited[x*size+y]=true;
					actions.push([x,y,2]);
					par[[x,y]]=[sx,sy];
					if(x==size-1&&y==size-1)
					{
						push(actions,par);
						animate();
						return;
					}
				}
			}	
		}
			
	}
 }
 
 function push(actions,par){
	 var start = [size-1,size-1];
	 actions.push([...start,3]);
	while(start[0]!==0 || start[1] !==0){
		start = par[start];
		actions.push([...start,3]);
	}
 }
 
 function findPath(){
	var visited={};
	fill(visited,false);
	visited[0]=true;
	dfsPath(0,0,visited);
	animate();
 }
 
 function fill(visited){
	for(var i=0;i<size*size;i++){
		visited[i]=false;
	}
 }
 
 function makeAPath(){
	var visited={};
	fill(visited,false);
	visited[0]=true;
	dfs(0,0,visited);
 }
  function dfsPath(sx,sy,visited){
	var color = 'white';
	 var paths = [[0,-1],[-1,0],[1,0],[0,1]];
	 
	 if(isValid(sx,sy)){
		if(sx==size-1 && sy==size-1){
			actions.push([sx,sy,2]);
			return 'blue';
		}
		for(var i=0;i<4;i++){
			var x=sx+paths[(i+2)%4][0];
			var y=sy+paths[(i+2)%4][1];
			if(!isValid(x,y))
				;
			else if(arr[x][y] !== 1 && visited[x*size+y] === false){			
					visited[x*size+y]=true;
					actions.push([sx,sy,3]);
				if(dfsPath(x,y,visited)=='blue'){
					actions.push([sx,sy,2]);
					return "blue";
				}
				else{
					actions.push([sx,sy,4]);
					actions.push([x,y,4]);
					if(arr[size-1][size-1]==2){
						return 'red';
					}
					
				}
				
			}
		}
	 }
	 actions.push([sx,sy,3]);
	return 'red';	 
  }
  //0->white;
  //1->black
  //2->blue
  //3->red
 function dfs(sx,sy,visited){
	 
	 var color = 'white';
	 var paths = [[1,0],[0,1],[-1,0],[0,-1]];
	 
	 if(isValid(sx,sy)){
		if(sx==size-1 && sy==size-1){
			arr[sx][sy]=0;
			visited[sx*size+sy]=true;
			return 'blue';
		}
		var ind = Math.floor(Math.random() * 4);
		for(var i=0;i<4;i++){
			ind=ind+i;
			ind%=4;
			var x=sx+paths[ind][0];
			var y=sy+paths[ind][1];
			if(visited[x*size+y] === false){
				visited[x*size+y]=true;
				var c = dfs(x,y,visited);
				if(c === 'blue')
				{
					arr[sx][sy]=0;
					return 'blue';
				}
				else{
					arr[sx][sy]=1;
					if(arr[size-1][size-1]==2)
						return 'red';
				}
			}
			if(arr[size-1][size-1]==2)
				return 'red';
		}
	 }
	 else
		 color='green';
	return color; 
 }
 
 function isValid(sx,sy){
	if(sx>=0&&sx<size&&sy>=0&&sy<size)
		return true;
	return false;
 }