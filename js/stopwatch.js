var myCount = 00;
var myTimer = null;

function startTimer(){
    myTimer = setInterval(onTick, 1000);
}



function onTick() {
	myCount++;
    var div = Math.floor(myCount/60);
    var rem = myCount % 60;
    if(rem < 10) {
    	rem = "0" + rem;
    }
	document.getElementById('time').innerHTML = div + ":" + rem;
    
} 

function stopTimer()
{
	clearInterval(myTimer);
}

function resetTimer() {
	stopTimer();
	myCount = 00;
	document.getElementById('time').innerHTML = '0:00';
    myTimer = null;
}