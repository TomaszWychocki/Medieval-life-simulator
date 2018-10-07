let mines = [],
  miners = [],
  blacksmiths = [],
  barracks = [],
  hospitals = [],
  enemies = [],
  warriors = [],
  townhall;
let mineImg, ironImg, blacksmithImg, minerSpritesheet, minerSpriteData;
let minerRightAnimation = [],
  minerLeftAnimation = [];
let blacksmithMusic, miningMusic;

function preload() {
  mineImg = loadImage("./assets/images/mine.png");
  ironImg = loadImage("./assets/images/iron.png");
  blacksmithImg = loadImage("./assets/images/blacksmith_000.png");
  minerSpriteDataRight = loadJSON("./assets/data/miner-right.json");
  minerSpriteDataLeft = loadJSON("./assets/data/miner-left.json");
  minerSpritesheet = loadImage(
    "./assets/images/universal-lpc-sprite_male_01_walk-3frame.png"
  );
  blacksmithMusic = loadSound("./assets/music/blacksmith.wav");
  miningMusic = loadSound("./assets/music/mining-sound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create animated frames from miner sprite
  let minerRightFrames = minerSpriteDataRight.frames;
  let minerLeftFrames = minerSpriteDataLeft.frames;
  for (let i = 0; i < minerRightFrames.length; i++) {
    let pos = minerRightFrames[i].position;
    let minerImg = minerSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    minerRightAnimation.push(minerImg);
  }
  for (let i = 0; i < minerLeftFrames.length; i++) {
    let pos = minerLeftFrames[i].position;
    let minerImg = minerSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    minerLeftAnimation.push(minerImg);
  }

  for (let i = 0; i < 4; i++) {
    let pos = { x: random(width), y: random(height) };

    if (checkCollisionsWithExistingBuildings(pos)) {
      mines.push(new Mine(pos.x, pos.y));
    } else {
      i--;
    }
  }

  for (let i = 0; i < 5; i++) {
    let pos = { x: random(width), y: random(height) };

    if (checkCollisionsWithExistingBuildings(pos)) {
      blacksmiths.push(new Blacksmith(pos.x, pos.y));
    } else {
      i--;
    }
  }

  for (let i = 0; i < 2; i++) {
    let pos = { x: random(width), y: random(height) };

    if (checkCollisionsWithExistingBuildings(pos)) {
      barracks.push(new Barracks(pos.x, pos.y));
    } else {
      i--;
    }
  }

  let pos = { x: random(width), y: random(height) };
  while (!checkCollisionsWithExistingBuildings(pos)) {
    pos = { x: random(width), y: random(height) };
  }
  hospitals.push(new Hospital(pos.x, pos.y));

  while (!checkCollisionsWithExistingBuildings(pos)) {
    pos = { x: random(width), y: random(height) };
  }
  townhall = new Townhall(pos.x, pos.y);

  miners.push(
    new Miner(random(width), random(height), mines[0], blacksmiths[0])
  );
  miners.push(
    new Miner(random(width), random(height), mines[0], blacksmiths[1])
  );
  miners.push(
    new Miner(random(width), random(height), mines[1], blacksmiths[2])
  );
  miners.push(
    new Miner(random(width), random(height), mines[1], blacksmiths[3])
  );
  miners.push(
    new Miner(random(width), random(height), mines[2], blacksmiths[4])
  );
  miners.push(
    new Miner(random(width), random(height), mines[2], blacksmiths[4])
  );
  miners.push(
    new Miner(random(width), random(height), mines[3], blacksmiths[3])
  );
  miners.push(
    new Miner(random(width), random(height), mines[3], blacksmiths[2])
  );

  // I suppose 3 badguys should be enough...
  for (let i = 0; i < 3; i++) {
    enemies.push(new Enemy(random(width), random(height)));
  }

  // Blacksmith Music Setting
  blacksmithMusic.setVolume(2);
  blacksmithMusic.play();
  blacksmithMusic.loop();

  // Mining Music Setting
  miningMusic.setVolume(1);
  miningMusic.play();
  miningMusic.loop();
}

function draw() {
  background(125);

  mines.forEach(mine => {
    mine.draw();
  });

  blacksmiths.forEach(blacksmith => {
    blacksmith.draw();
    blacksmith.createSword();
  });

  miners.forEach(miner => {
    miner.draw();
    miner.action();
  });

  barracks.forEach(barrack => {
    barrack.createWarrior();
    barrack.checkForEnemies();
    barrack.draw();
  });

  hospitals.forEach(hospital => {
    hospital.draw();
  });

  townhall.draw();

  warriors.forEach(warrior => {
    warrior.draw();
  });
  enemies.forEach(enemy => enemy.draw());
}

function distanceTo(x, y, x2, y2) {
  let x_diff = x - x2;
  let y_diff = y - y2;
  return sqrt(x_diff * x_diff + y_diff * y_diff);
}

function getNextPoint(actualX, actualY, destX, destY, speed) {
  let v = [destX - actualX, destY - actualY];
  // Normalize
  let vLength = sqrt(v[0] * v[0] + v[1] * v[1]);
  let vNormalized = [v[0] / vLength, v[1] / vLength];

  return [actualX + vNormalized[0] * speed, actualY + vNormalized[1] * speed];
}

function checkCollisionsWithExistingBuildings(pos) {
  let collision = false;
  let minDistance = 80;

  if (pos.x < 90 || pos.x > width - 90 || pos.y < 90 || pos.y > height - 90) {
    return false;
  }

  mines.forEach(mine => {
    if (distanceTo(mine.posX, mine.posY, pos.x, pos.y) < minDistance) {
      collision = true;
      return;
    }
  });

  blacksmiths.forEach(blacksmith => {
    if (
      distanceTo(blacksmith.posX, blacksmith.posY, pos.x, pos.y) < minDistance
    ) {
      collision = true;
      return;
    }
  });

  barracks.forEach(barrack => {
    if (distanceTo(barrack.posX, barrack.posY, pos.x, pos.y) < minDistance) {
      collision = true;
      return;
    }
  });

  hospitals.forEach(hospital => {
    if (distanceTo(hospital.posX, hospital.posY, pos.x, pos.y) < minDistance) {
      collision = true;
      return;
    }
  });

  if (townhall !== undefined && townhall !== null) {
    if (distanceTo(townhall.posX, townhall.posY, pos.x, pos.y) < minDistance) {
      return false;
    }
  }

  return !collision;
}
