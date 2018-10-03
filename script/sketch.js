let mines = [], miners = [], blacksmiths = [];

function setup() 
{
    createCanvas(windowWidth, windowHeight);

    for(let i = 0; i < 4; i++)
    {
        mines.push(new Mine(random(width * 0.25),random(height * 0.25)));
    }

    for(let i = 0; i < 5; i++)
    {
        blacksmiths.push(new Blacksmith(random(width - (0.25 * width), width),random(height * 0.25)));
    }

    miners.push(new Miner(random(width), random(height), mines[0], blacksmiths[0]));
    miners.push(new Miner(random(width), random(height), mines[0], blacksmiths[1]));
    miners.push(new Miner(random(width), random(height), mines[1], blacksmiths[2]));
    miners.push(new Miner(random(width), random(height), mines[1], blacksmiths[3]));
    miners.push(new Miner(random(width), random(height), mines[2], blacksmiths[4]));
    miners.push(new Miner(random(width), random(height), mines[2], blacksmiths[4]));
    miners.push(new Miner(random(width), random(height), mines[3], blacksmiths[3]));
    miners.push(new Miner(random(width), random(height), mines[3], blacksmiths[2]));
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
        }
    );

    miners.forEach(
        function (miner) 
        {
            miner.draw();
            miner.action();
        }
    );
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