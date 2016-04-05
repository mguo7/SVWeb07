var time;
var clocktimer;

var	stopWatch = function() {
		 
		var	startTime	= 0;	 
		var	stopTime = 0;	 

		var	now	= function() {
		  return (new Date()).getTime(); 
		}; 

		this.start = function() {
				startTime = startTime ? startTime : now();
			};

        this.stop = function(){
   		  
   		    stopTime = startTime ? stopTime + now() - startTime : stopTime;
   		    startTime = 0;
    	     
  		 };

		// Reset
		this.reset = function() {
			stopTime = 0;
			startTime = 0;
		};

		// Duration
		this.time = function() {
		  return stopTime + (startTime ? now() - startTime : 0); 
		};

		this.log = function(){	 
      	  return (stopTime - startTime)/1000;     
        };
	
	};

var watch = new stopWatch();

function pad(num, size) {
	var s = "00" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	var h = m = s = ms = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	return newTime;
}



function show() {
	time = document.getElementById('time');
	update();
}

function update() {
	time.innerHTML = formatTime(watch.time());
}

function start() {
	clocktimer = setInterval("update()", 1);
	watch.start();
}

function stop() {
	watch.stop();
	clearInterval(clocktimer);
}

function reset() {
	stop();
	watch.reset();
	update();
}



// Racer
function Racer(name) {
  this.name = name;
  this.stopWatch = new stopWatch();
  
  Racer.all.push(this);
}

Racer.all = [];

Racer.all.start = function() {
  for (var i = 0; i < Racer.all.length; i++) {
    Racer.all[i].start();
  }
};

Racer.all.stop = function() {
  for (var i = 0; i < Racer.all.length; i++) {
    Racer.all[i].stop();
  }
};

Racer.getWinners = function() {
  var found = Racer.all[0];
  
  for (var i = 0; i < Racer.all.length; i++) {
    if (Racer.all[i].log() < found.log())
      found = Racer.all[i];
  }
  
  return found;  
};

Racer.prototype.start = function(){
  this.stopWatch.start();
  return this;
};

Racer.prototype.stop = function() {
  this.stopWatch.stop();
  return this;
};

Racer.prototype.log = function() {
  return this.stopWatch.log();
};

travis = new Racer("Travis");
sumit = new Racer("Sumit");
harshit = new Racer("Harshit");

Racer.all.start();


for (var i = 0; i < 10000; i++){
  console.log(i);
  if (i == 4000) {
    harshit.stop();
  } else if (i == 8000) {
  	travis.stop();
  }
}

sumit.stop();

console.log("Travis : " + travis.log());
console.log("Sumit : " + sumit.log());
console.log("Harshit :" + harshit.log());
console.log("Winner is " + Racer.getWinners().name);


 


