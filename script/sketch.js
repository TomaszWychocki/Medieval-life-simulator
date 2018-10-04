let mines = [], miners = [], blacksmiths = [], barracks = [], hospitals = [], enemies=[];;
let mineImg, ironImg, blacksmithImg, minerSpritesheet, minerSpriteData;
let minerRightAnimation = [], minerLeftAnimation = [];

function preload() {
    mineImg = loadImage('./assets/images/mine.png');
    ironImg = loadImage('./assets/images/iron.png');
    blacksmithImg = loadImage('./assets/images/blacksmith_000.png');
    minerSpriteDataRight = loadJSON('./assets/data/miner-right.json');
    minerSpriteDataLeft = loadJSON('./assets/data/miner-left.json');
    minerSpritesheet = loadImage('./assets/images/universal-lpc-sprite_male_01_walk-3frame.png');
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    // Create animated frames from miner sprite
    let minerRightFrames = minerSpriteDataRight.frames;
    let minerLeftFrames = minerSpriteDataLeft.frames;
    for(let i = 0; i < minerRightFrames.length; i++) {
        let pos = minerRightFrames[i].position;
        let minerImg = minerSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        minerRightAnimation.push(minerImg);
    }
    for(let i = 0; i < minerLeftFrames.length; i++) {
        let pos = minerLeftFrames[i].position;
        let minerImg = minerSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        minerLeftAnimation.push(minerImg);
    }

    for(let i = 0; i < 4; i++)
    {
        mines.push(new Mine(random(width * 0.4),random(height * 0.4)));
    }

    for(let i = 0; i < 5; i++)
    {
        blacksmiths.push(new Blacksmith(random(width - (0.4 * width), width),random(height * 0.4)));
    }

    for (let i = 0; i < 2; i++)
    {
        barracks.push(new Barracks(random(width * 0.4), random(height - (0.4 * height), height)));
    }

    hospitals.push(new Hospital(random(width - (0.4 * width), width),random(height - (0.4 * height), height)));

    miners.push(new Miner(random(width), random(height), mines[0], blacksmiths[0]));
    miners.push(new Miner(random(width), random(height), mines[0], blacksmiths[1]));
    miners.push(new Miner(random(width), random(height), mines[1], blacksmiths[2]));
    miners.push(new Miner(random(width), random(height), mines[1], blacksmiths[3]));
    miners.push(new Miner(random(width), random(height), mines[2], blacksmiths[4]));
    miners.push(new Miner(random(width), random(height), mines[2], blacksmiths[4]));
    miners.push(new Miner(random(width), random(height), mines[3], blacksmiths[3]));
    miners.push(new Miner(random(width), random(height), mines[3], blacksmiths[2]));

	// I suppose 3 badguys should be enough...
	for(let i = 0; i < 3; i++)
		enemies.push(new Enemy(random(width), random(height)));
}

function draw()
{
    background(125);

    mines.forEach(
        function (mine)
        {
            mine.draw();
        }
    );

    blacksmiths.forEach(
        function (blacksmith)
        {
            blacksmith.draw();
			blacksmith.createSword();
        }
    );

    miners.forEach(
        function (miner)
        {
            miner.draw();
            miner.action();
        }
    );

    barracks.forEach(
        function(barrack)
        {
            barrack.draw();
        }
    );

    hospitals.forEach(
        function(hospital)
        {
            hospital.draw();
        }
    );

	enemies.forEach(enemy=>enemy.draw());
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