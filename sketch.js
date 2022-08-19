var pcInAir;
a = 0;
var playerName;
var score = 0;
function preload() {
  bg = loadImage("sprite_0.png");
  groundIMG = loadImage("ground0.png");
  standingNinja = loadAnimation("standing0.png", "standing1.png");
  runningNinja = loadAnimation("running0.png", "running1.png", "running2.png");
  jumpingNinja = loadAnimation("jump0.png", "jump1.png");
  goldCoinImage = loadImage("goldCoin.png");
  spikeImage = loadImage("spike.png");
}

function setup() {
  createCanvas(500, 500);

  platformGroup = new Group();
  spikeGroup = new Group();

  //playing char
  pc = createSprite(400, height - 120);
  pc.addAnimation("standing", standingNinja);
  pc.addAnimation("running", runningNinja);
  pc.addAnimation("jumping", jumpingNinja);
  pc.changeAnimation("standing");
  pc.scale = 0.7;

  //ground & platforms
  ground = createSprite(width / 2, height - 31, width * 15, 20);
  ground.visible = false;
  createPlatforms();
  gameState = 0;
  tempX = pc.x;
  coinGroup = new Group();
  if (gameState === 0) {
    background("grey");
    showElements();

    playButton.mousePressed(() => {
      gameState = 1;
      input.hide();
      playButton.hide();
    });
  }
}

function draw() {
  //bg
  background("white");
  createImages();
  playerName = input.value();
  if (gameState == 1) {
    drawSprites();
    textSize(20);
    fill("green");
    text(playerName, 150, 20);
    text("Score:" + score, 150, 40);
    camera.position.x = pc.position.x;
    pc.collide(ground);
    //pc controls
    if (keyDown(RIGHT_ARROW)) {
      pc.x += 15;
      tempX = pc.x;
      pc.changeAnimation("running");
    }
    if (keyDown(LEFT_ARROW)) {
      if (tempX === pc.x) pc.x += -15;
    }

    if (keyWentDown("space")) {
      pc.velocityY = -20;
      pc.changeAnimation("jumping");
      pcInAir = true;
    }

    createObstacles();
    pc.changeAnimation("standing");
    for (var i = 0; i < platformGroup.length; i++)
      collideWithPlatforms(pc, platformGroup[i]);
    for (var i = 0; i < coinGroup.length; i++) {
      collideWithCoins(pc, coinGroup[i]);
    }
    pc.velocityY += 1;
  }
}
function collideWithCoins(collider, collided) {
  if (collider.collide(collided)) {
    collided.remove();
    score = score + 1;
  }
}
function createPlatforms() {
  var platform1 = createSprite(400, height - 100, 100, 20);
  platformGroup.add(platform1);

  var platform2 = createSprite(800, height - 80, 100, 20);
  platformGroup.add(platform2);

  var platform3 = createSprite(1200, height - 200, 100, 20);
  platformGroup.add(platform3);
}

function collideWithPlatforms(collider, collided) {
  if (collider.isTouching(collided)) {
    collider.collide(collided);
  }
}

function createImages() {
  image(bg, 0, 0, width, height);
  image(bg, 500, 0, width, height);
  image(bg, 1000, 0, width, height);
  image(bg, 1500, 0, width, height);
  image(bg, 2000, 0, width, height);
  image(bg, 2500, 0, width, height);
  image(bg, 3000, 0, width, height);
  image(bg, 3500, 0, width, height);
  image(bg, 4000, 0, width, height);
  image(bg, 4500, 0, width, height);

  image(groundIMG, 0, height - 35, 435, 32);
  image(groundIMG, 435, height - 35, 435, 32);
  image(groundIMG, 435 * 2, height - 35, 435, 32);
  image(groundIMG, 435 * 3, height - 35, 435, 32);
  image(groundIMG, 435 * 4, height - 35, 435, 32);
  image(groundIMG, 435 * 5, height - 35, 435, 32);
  image(groundIMG, 435 * 6, height - 35, 435, 32);
  image(groundIMG, 435 * 7, height - 35, 435, 32);
  image(groundIMG, 435 * 8, height - 35, 435, 32);
  image(groundIMG, 435 * 9, height - 35, 435, 32);
  image(groundIMG, 435 * 10, height - 35, 435, 32);
  image(groundIMG, 435 * 11, height - 35, 435, 32);
}

function createObstacles() {
  if (frameCount % 100 === 0) {
    var sprite = createSprite(pc.x + 500, random(250, 450), 50, 10);
    sprite.velocityX = -4;
    sprite.addImage(spikeImage);
    sprite.scale = 0.09;
    spikeGroup.add(sprite);
  }
  if (frameCount % 90 === 0) {
    var sprite = createSprite(pc.x + 300, random(100, 450), 50, 10);
    sprite.addImage(goldCoinImage);
    sprite.scale = 0.09;
    coinGroup.add(sprite);
  }
}

function showElements() {
  input = createInput("").attribute("placeholder", "Enter your name");
  playButton = createButton("Play");

  input.position(width / 2 - 150, height / 2 - 100);
  playButton.position(width / 2 - 150, height / 2 - 50);

  input.class("customInput");
  playButton.class("customButton");
}
