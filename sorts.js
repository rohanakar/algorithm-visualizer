 var arr = [];
 var len = 100;
 var lenInd=1;
 var canvas;
 var actions = [];
 var updateInd=0;	
 var framesPerSecond =10;
 
 function disableButtons() {
	document.getElementById("bs").disabled = true;
	document.getElementById("ms").disabled = true;
 }
 
 function changeArrSize(){
	var sizes=[10,100,1000,3000];
	lenInd++;
	lenInd%=sizes.length;
	len = sizes[lenInd];
	document.getElementById("elements").innerHTML = "no. of elements : "+ len;
	clears();
 }
 
 function enableButtons() {
	document.getElementById("bs").disabled = false;
	document.getElementById("ms").disabled = false;
 }
 function  displayIterations(){
	 document.getElementById("actions").innerHTML = "no. of actions : "+ actions.length;
 }
 
 function init(){
	canvas = document.getElementById('myCanvas');
	var i=0;
	while(i<len){
		arr.push(Math.ceil(Math.random() * 45)); 
		i++;
	}
	draw();
 }
 

 
 function clears(){
	 arr=[];
	 init();
	 draw();
	 updateInd=0;
	 updateInd=0;
	 actions=[];
 }
 
 function speed(){
	animate();
	animate();
 }
 

 
 function draw() {
	 
	var width = 2*213/len;
	var height = 480;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 640, 480);
		let c=0;
		while(c<len){
			ctx.fillStyle = 'rgb(200, 0, 0)';
			ctx.fillRect(1+width*1.5*c, height, width, -10*arr[c]);
			c++;
		}
	}
}



function BS(){
	var Arr = [];
	disableButtons();
	copy(Arr,arr);
	actions=[];
	updateInd=0;
	bubbleSort();
	displayIterations();
	arr=[];
	copy(arr,Arr);
	animate();
	
}
function MS(){
	disableButtons();
	var Arr = [];
	copy(Arr,arr);
	actions=[];
	updateInd=0;
	mergeSort();
	displayIterations();
	arr=[];
	copy(arr,Arr);
	animate();
}

function copy(a,b){
	for(var x in b){
		a.push(b[x]);
	}
}

function update(){
	var x= actions[updateInd][0]
	var y = actions[updateInd][1];
	if(actions[updateInd].length==3){
		arr[x]=y;updateInd++;
		return;
	}
	let temp = arr[x];
	arr[x]=arr[y];
	arr[y]=temp;
	updateInd++;
}
	
function animate(){
	if(updateInd==actions.length){
		enableButtons();
		return;
	}
	update();
	draw();
	requestAnimationFrame(animate);
}

function bubbleSort() {
	for(var i=0;i<len-1;i++){
		let maxInd=-1;
		for(var j=0;j<len-i-1;j++){
			if(arr[j]>arr[j+1]){
				swap(j,j+1);
			}
		}
	}
}


function mergeSort() {
	updateMS(0,len-1);	
}


function updateMS(s,e){
	if(s==e)
		return;
	let mid = s+ (e-s)/2;
	mid = Math.floor(mid);
	updateMS(s,mid);
	updateMS(mid+1,e);
	merge(s,e);
	
}



function merge(s,e){
	let mid = s+ (e-s)/2;
	mid = Math.floor(mid);
	var a1=[];
	var a2=[];
	for(i=s;i<=mid;i++){
		a1.push(arr[i]);
	}
	for(i=mid+1;i<=e;i++){
		a2.push(arr[i]);
	}
	
	mergeHelper(a1,a2,s,e,mid);
}

function mergeHelper(a1,a2,s,e,mid){
	
	var iMS=0;
	var jMS=0;
	var arrPointer=s;
	while(true){
		if(iMS>=a1.length && jMS >= a2.length)
			return;
		if(iMS>=a1.length){	
			
			actions.push([arrPointer,a2[jMS],-1]);
			arr[arrPointer++] = a2[jMS++];
		}
		else if(jMS>=a2.length){
			actions.push([arrPointer,a1[iMS],-1]);
			arr[arrPointer++] = a1[iMS++];
		}
		else if(a1[iMS]<=a2[jMS]){
			actions.push([arrPointer,a1[iMS],-1]);
			arr[arrPointer++] = a1[iMS++];		
		}
		else if(a1[iMS]>a2[jMS]){
			actions.push([arrPointer,a2[jMS],-1]);
			arr[arrPointer++] = a2[jMS++];		
		}
	}
}


function swap( x, y){
	let temp = arr[x];
	arr[x]=arr[y];
	arr[y]=temp;
	actions.push([x,y]);
}