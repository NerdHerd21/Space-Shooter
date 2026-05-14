let secondsSinceStart = 0;
let cooldown = 0;
let spaceship;
let bgm;
let starBarrier;
let stars = [];
let spaceshipFrameCounter = 0;
let enemy;
let bullets;
let enemies;
let gameRunning;
let leftWall, rightWall;

function preload(){
	bgm = loadSound("Assets/bgm.wav");
	spaceship1 = loadImage("Assets/spaceship frame 1.png");
	spaceship2 = loadImage("Assets/spaceship frame 2.png");
	spaceship3 = loadImage("Assets/spaceship frame 3.png");
	spaceship4 = loadImage("Assets/spaceship frame 4.png");
	spaceship5 = loadImage("Assets/spaceship frame 5.png");
	spaceship6 = loadImage("Assets/spaceship frame 6.png");
	laserBeam = loadImage("Assets/laser bolt.png");
	blueEnemy = loadImage("Assets/blue enemy.png");
	greenEnemy = loadImage("Assets/green enemy.png");
	redEnemy = loadImage("Assets/red enemy.png");
	pinkEnemy = loadImage("Assets/pink enemy.png");
	

}

function setup() {
    createCanvas(windowWidth, windowHeight);
	world.gravity.y = 0;
	bullets = new Group();
	enemies = new Group();
	gameRunning = true;

	spaceship = new Sprite();
	spaceship.w = 75;
	spaceship.h = 75;
	spaceship.x = width/2;
	spaceship.y = (height-100);
	spaceship.img = spaceship1;
	spaceship.img.scale = 2.5;
	spaceship.layer = 2;
	spaceship.collider = "dynamic";
	spaceship.rotationLock = true;
	//spaceship.debug = true;

	starBarrier = new Sprite();
	starBarrier.w = width;
	starBarrier.h = 20;
	starBarrier.x = width/2;
	starBarrier.y = spaceship.y + 150
	starBarrier.color = "#ffffff"
	starBarrier.collider = "static"

	leftWall = new Sprite();
	leftWall.h = height;
	leftWall.w = 10;
	leftWall.x = width - width;
	leftWall.y = height / 2;
	leftWall.collider = "kinematic";
	leftWall.visible = false;

	rightWall = new Sprite();
	rightWall.h = height;
	rightWall.w = 10;
	rightWall.x = width;
	rightWall.y = height / 2;
	rightWall.collider = "kinematic";
	rightWall.visible = false;
}

function mousePressed(){
	userStartAudio();
	if(!bgm.isPlaying()){
		bgm.loop();
		bgm.setVolume(1);
	}
	if(!gameRunning){
		userStartAudio();
		if(!bgm.isPlaying()){
			bgm.loop();
			bgm.setVolume(1);
		}
		setup();
		secondsSinceStart = 0;
		draw();
		loop();
	}
}

function draw() {
	background("#000000");


	//SPACESHIP ANIMATION
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
    //STAR CREATION AND LOGIC
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

	//ENEMY CREATION
	if ((frameCount % 480 === 1) && (secondsSinceStart >= 2)){
		enemy = new enemies.Sprite(random(width),((height - height) + 100));
		enemy.w = 100;
		enemy.h = 50;
		enemy.rotationLock = true;
		let spriteDecider = floor(random(1,5));
		if(spriteDecider == 1) {
			enemy.img = blueEnemy;
			enemy.img.scale = 2.5;
		} else if (spriteDecider == 2){
			enemy.img = pinkEnemy;
			enemy.img.scale = 2.5;
		} else if (spriteDecider == 3){
			enemy.img = redEnemy;
			enemy.img.scale = 2.5;
		} else if (spriteDecider == 4){
			enemy.img = greenEnemy;
			enemy.img.scale = 2.5;
		}
		enemy.vel.x = random() < 0.5 ? -2 : 2;
		enemy.vel.y = 2.5;
	}

	//ENEMY LOGIC

	for (let enemy of enemies){
		if(enemy.overlaps(leftWall) || enemy.overlaps(rightWall)){
			enemy.vel.x = -enemy.vel.x
		}
		if(enemy.collides(starBarrier)){
			if(gameRunning === true){
				fill("#ff0000");
				textAlign(CENTER,CENTER);
				textSize(50);
				text("G   A   M   E\n\nO   V   E   R\n\n\n\nclick to restart", width / 2, height / 2);
				gameRunning = false
			}
				if(gameRunning === false){
				allSprites.delete();
				bgm.stop();
				noLoop();
			}
		}
		if(enemy.collides(spaceship)){
			if(gameRunning === true){
				fill("#ff0000");
				textAlign(CENTER,CENTER);
				textSize(50);
				text("G   A   M   E\n\nO   V   E   R\n\n\n\nclick to restart", width / 2, height / 2);
				gameRunning = false
			}
				if(gameRunning === false){
				allSprites.delete();
				bgm.stop();
				noLoop();
			}
		}
	}


	//BULLET LOGIC
    for (let bullet of bullets) {
		for (let enemy of enemies){
			if (bullet.collides(enemy)){
			enemy.delete();
			bullet.delete();
			}
	    }
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
		let bullet = new bullets.Sprite();
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
