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