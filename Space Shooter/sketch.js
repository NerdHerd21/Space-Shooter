let secondsSinceStart = 0;
let cooldown = 0;
let spaceship;
let bgm;
let starBarrier;
let stars = [];
let spaceshipFrameCounter = 0;

function preload(){
	bgm = loadSound("Assets/bgm.wav");
	spaceship1 = loadImage("Assets/spaceship frame 1.png");
	spaceship2 = loadImage("Assets/spaceship frame 2.png");
	spaceship3 = loadImage("Assets/spaceship frame 3.png");
	spaceship4 = loadImage("Assets/spaceship frame 4.png");
	spaceship5 = loadImage("Assets/spaceship frame 5.png");
	spaceship6 = loadImage("Assets/spaceship frame 6.png");
	laserBeam = loadImage("Assets/laser bolt.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
	world.gravity.y = 0;
	spaceship = new Sprite();
	spaceship.w = 75;
	spaceship.h = 75;
	spaceship.x = width/2;
	spaceship.y = (height-100);
	spaceship.img = spaceship1;
	spaceship.img.scale = 2.5;
	spaceship.layer = 2;
	spaceship.collider = "kinematic";
	//spaceship.debug = true;

	starBarrier = new Sprite();
	starBarrier.w = width;
	starBarrier.h = 20;
	starBarrier.x = width/2;
	starBarrier.y = spaceship.y + 150
	starBarrier.color = "#00ff00"
	starBarrier.collider = "static"
}

function mousePressed(){
	userStartAudio();
	if(!bgm.isPlaying()){
		bgm.loop();
		bgm.setVolume(1);
	}
}

function draw() {
	background("#000000");
	if(frameCount % 6 === 0){
	if(spaceshipFrameCounter == 0){
		spaceship.img = spaceship1;
		spaceship.img.scale = 2.5;
		spaceshipFrameCounter++;
	} else if(spaceshipFrameCounter == 1){
		spaceship.img = spaceship2;
		spaceship.img.scale = 2.5;
		spaceshipFrameCounter++;
	} else if(spaceshipFrameCounter == 2){
		spaceship.img = spaceship3;
		spaceship.img.scale = 2.5;
		spaceshipFrameCounter++;
	}else if(spaceshipFrameCounter == 3){
		spaceship.img = spaceship4;
		spaceship.img.scale = 2.5;
		spaceshipFrameCounter++;
	}else if(spaceshipFrameCounter == 4){
		spaceship.img = spaceship5;
		spaceship.img.scale = 2.5;
		spaceshipFrameCounter++;
	}else if(spaceshipFrameCounter == 5){
		spaceship.img = spaceship6;
		spaceship.img.scale = 2.5;
		spaceshipFrameCounter = 0
	}
}
	for (let i = 0; i < 1; i++){
		let star = new Sprite(random(width),height - height,3,3);
		star.color = "#ffffff";
	    star.collider = "none";
		star.layer = 0;
		star.vel.y = 10;
		stars.push(star);
		
	}
	for (let i = stars.length - 1; i >= 0; i--){
		let star = stars[i];

		if (star.y > starBarrier.y) {
			star.delete();
			stars.splice(i,1);
		}
	}
	if (frameCount % 60 === 1){
		secondsSinceStart++;
	}
	if(cooldown > 0){
		cooldown--;
	}
	if(kb.arrowLeft){
		spaceship.vel.x = -5;
	} else if (kb.arrowRight) {
		spaceship.vel.x = 5;
		
	}else{
		spaceship.vel.x = 0
		
	}
	if(kb.spacebar && cooldown == 0){
		let bullet = new Sprite();
		bullet.x = spaceship.x;
		bullet.y = spaceship.y - 50;
		bullet.w = 5;
		bullet.h = 10;
		bullet.img = laserBeam
		bullet.img.scale = 7
		bullet.vel.y = -10;
		bullet.life = 180;
		bullet.layer = 1;
		cooldown += 20;
	}
	
    
}
