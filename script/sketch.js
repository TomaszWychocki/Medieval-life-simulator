let buildings = [], characters = [];
let mineImg, ironImg, blacksmithImg, hospitalImg, townhallImg, barracksImg, grassTexture;
let minerSpritesheet, minerSpriteDataRight, minerSpriteDataLeft;
let minerRightAnimation = [], minerLeftAnimation = [];
let enemySpritesheet, enemyWalkDataRight, enemyWalkDataLeft;
let enemyWalkAnimRight = [], enemyWalkAnimLeft = [];
let blacksmithMusic, miningMusic;
let SWORD_DURABLE = 100, SWORD_DEGRADE = 50;

function preload()
{
    mineImg = loadImage('./assets/images/mine.png');
    ironImg = loadImage('./assets/images/iron.png');
    blacksmithImg = loadImage('./assets/images/blacksmith_000.png');
    hospitalImg = loadImage('./assets/images/hospital.png');
    townhallImg = loadImage('./assets/images/townhall.png');
    barracksImg = loadImage('./assets/images/barracks_000.png');
    minerSpriteDataRight = loadJSON('./assets/data/miner-right.json');
    minerSpriteDataLeft = loadJSON('./assets/data/miner-left.json');
    minerSpritesheet = loadImage('./assets/images/universal-lpc-sprite_male_01_walk-3frame.png');
    enemySpritesheet = loadImage('./assets/images/goblinsword.png');
    enemyWalkDataRight = loadJSON('./assets/data/enemy-walk-right.json');
    enemyWalkDataLeft =  loadJSON('./assets/data/enemy-walk-left.json');
    blacksmithMusic = loadSound("./assets/music/blacksmith.mp3");
    miningMusic = loadSound("./assets/music/mining-sound.mp3");
    grassTexture = loadImage('./assets/images/grass_texture.jpg');
}

function setup()
{
    createCanvas(windowWidth, windowHeight);

    // Create animated frames from miner sprite
    let minerRightFrames = minerSpriteDataRight.frames;
    let minerLeftFrames = minerSpriteDataLeft.frames;
    for (let i = 0; i < minerRightFrames.length; i++)
    {
        let pos = minerRightFrames[i].position;
        let minerImg = minerSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        minerRightAnimation.push(minerImg);
    }
    for (let i = 0; i < minerLeftFrames.length; i++)
    {
        let pos = minerLeftFrames[i].position;
        let minerImg = minerSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        minerLeftAnimation.push(minerImg);
    }

    // Create animated frames from enemy sprite
    let enemyWalkRFrames = enemyWalkDataRight.frames;
    let enemyWalkLFrames = enemyWalkDataLeft.frames;
    for (let i = 0; i < enemyWalkRFrames.length; i++)
    {
        let pos = enemyWalkRFrames[i].position;
        let enemyImg = enemySpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        enemyWalkAnimRight.push(enemyImg);
    }
    for (let i = 0; i < enemyWalkLFrames.length; i++)
    {
        let pos = enemyWalkLFrames[i].position;
        let enemyImg = enemySpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        enemyWalkAnimLeft.push(enemyImg);
    }

    for (let i = 0; i < 4; i++)
    {
        let pos = generateBuildingPosition();
        buildings.push(new Mine(pos.x, pos.y));
    }

    for (let i = 0; i < 5; i++)
    {
        let pos = generateBuildingPosition();
        buildings.push(new Blacksmith(pos.x, pos.y));
    }

    for (let i = 0; i < 2; i++)
    {
        let pos = generateBuildingPosition();
        buildings.push(new Barracks(pos.x, pos.y));
    }

    let pos = generateBuildingPosition();
    buildings.push(new Hospital(pos.x, pos.y));

    pos = generateBuildingPosition();
    buildings.push(new Townhall(pos.x, pos.y));

    pos = generateBuildingPosition();
    buildings.push(new Cemetery(pos.x, pos.y));

    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[0], getBuildingsArrayByType("Blacksmith")[0])
    );
    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[0], getBuildingsArrayByType("Blacksmith")[1])
    );
    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[1], getBuildingsArrayByType("Blacksmith")[2])
    );
    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[1], getBuildingsArrayByType("Blacksmith")[3])
    );
    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[2], getBuildingsArrayByType("Blacksmith")[4])
    );
    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[2], getBuildingsArrayByType("Blacksmith")[4])
    );
    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[3], getBuildingsArrayByType("Blacksmith")[3])
    );
    characters.push(
        new Miner(random(width), random(height), getBuildingsArrayByType("Mine")[3], getBuildingsArrayByType("Blacksmith")[2])
    );

    // I suppose 3 badguys should be enough...
    for (let i = 0; i < 3; i++)
    {
        characters.push(new Enemy(random(width), random(height)));
    }

    characters.push(
        new Priest(random(width), random(height))
    );
    for (let i = 0; i < 5; i++)
    {
        characters.push(new Farmer(random(width), random(height)));
    }
    // Blacksmith Music Setting
    blacksmithMusic.setVolume(1);
    blacksmithMusic.play();
    blacksmithMusic.loop();

    // Mining Music Setting
    miningMusic.setVolume(.5);
    miningMusic.play();
    miningMusic.loop();
}

function draw()
{
    background(0);
    var gCols = windowWidth / grassTexture.width + 1,
        gRows = windowHeight / grassTexture.height + 1;
    for (let w = 0; w < gCols; w++)
    {
        for(let h = 0; h < gRows; h++) {
            image(grassTexture, w*grassTexture.width, h*grassTexture.height);
        }
    }

    buildings.forEach(building =>
    {
        building.update();
        building.show();
    });

    characters.forEach(character =>
    {
        character.update();
        character.show();
    });
}

function distanceTo(x, y, x2, y2)
{
    let x_diff = x - x2;
    let y_diff = y - y2;
    return sqrt(x_diff * x_diff + y_diff * y_diff);
}

function getNextPoint(actualX, actualY, destX, destY, speed)
{
    let v = [destX - actualX, destY - actualY];
    // Normalize
    let vLength = sqrt(v[0] * v[0] + v[1] * v[1]);
    let vNormalized = [v[0] / vLength, v[1] / vLength];

    return [actualX + vNormalized[0] * speed, actualY + vNormalized[1] * speed];
}

function generateBuildingPosition()
{
    let collision = true;
    let minDistance = 80;
    let pos;

    while (collision)
    {
        pos = {
            x: random(width),
            y: random(height)
        };
        collision = false;

        if (pos.x < 90 || pos.x > width - 90 || pos.y < 90 || pos.y > height - 90)
        {
            collision = true;
            continue;
        } 

        buildings.forEach(building =>
        {
            if (distanceTo(building.posX, building.posY, pos.x, pos.y) < minDistance)
            {
                collision = true;
            }
        });
    }

    return pos;
}

function getBuildingsArrayByType(type)
{
    return buildings.filter(building => building.getType() == type);
}

function getCharactersArrayByType(type)
{
    return characters.filter(character => character.getType() == type);
}

function removeBuilding(toRemove)
{
    buildings = buildings.filter(building => building.id != toRemove.id);
    delete toRemove;
}

function removeCharacter(toRemove)
{
    characters = characters.filter(character => character.id != toRemove.id);
    delete toRemove;
}