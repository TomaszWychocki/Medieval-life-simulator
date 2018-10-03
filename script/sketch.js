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

class Mine 
{
    constructor(x, y) 
    {
        this.posX = x;
        this.posY = y;
        this.miningProgress = 0;
        this.iron = 0;
    }

    dig() 
    {
        this.miningProgress += 3;

        if(this.miningProgress >= 100) 
        {
            this.miningProgress = 0;
            this.iron++;
        }
    }

    draw() 
    {
        noStroke();
        fill(255, 204, 100);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('MINE', this.posX, this.posY - 12);
    }
}

class Blacksmith 
{
    constructor(x, y) 
    {
        this.posX = x;
        this.posY = y;
        this.iron = 0;
        this.swords = 0;
        this.workProgress = 0;
    }

    createSword()
    {
        if(this.iron >= 2)
        {
            this.workProgress++;
        }

        if(this.workProgress >= 100)
        {
            this.workProgress = 0;
            this.iron -= 2;
            this.swords++;
        }
    }

    draw() 
    {
        noStroke();
        fill(2, 204, 200);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('BLACKSMITH', this.posX, this.posY - 12);
    }
}

class Miner 
{
    constructor(x, y, _mine, _blacksmith) 
    {
        this.posX = x;
        this.posY = y;
        this.mine = _mine;
        this.blacksmith = _blacksmith;
        this.iron = 0;
        this.state = 0; // 0 - go to the mine | 1 - dig iron | 2 - go to the blacksmith
        this.speed = 5;
    }

    action() 
    {
        if(this.state == 0) 
        {
            let nextPoint = getNextPoint(this.posX, this.posY, this.mine.posX, this.mine.posY, this.speed);

            this.posX = nextPoint[0];
            this.posY = nextPoint[1];

            if(distanceTo(this.posX,this.posY,this.mine.posX,this.mine.posY) < 15)
            {
                this.state = 1;
            }
        }

        if(this.state == 1) 
        {
            this.mine.dig();

            if(this.mine.iron > 0)
            {
                this.iron = this.mine.iron;
                this.mine.iron = 0;
                this.state = 2;
            }
        }

        if(this.state == 2) 
        {
            let nextPoint = getNextPoint(this.posX, this.posY, this.blacksmith.posX, this.blacksmith.posY, this.speed);

            this.posX = nextPoint[0];
            this.posY = nextPoint[1];

            if(distanceTo(this.posX,this.posY,this.blacksmith.posX,this.blacksmith.posY) < 15) 
            {
                this.blacksmith.iron += this.iron;
                this.iron = 0;
                this.state = 0;
            }
        }
    }

    draw()
    {
        noStroke();
        fill(55, 204, 100);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('MINER', this.posX, this.posY - 12);

        if(this.iron > 0) 
        {
            fill(0);
            ellipse(this.posX - 2, this.posY - 2, 4, 4);
        }
    }
}