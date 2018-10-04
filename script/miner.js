class Miner extends Villager
{
    constructor(x, y, _mine, _blacksmith)
    {
		super(x, y);
        this.posX = x;
        this.posY = y;
        this.mine = _mine;
        this.blacksmith = _blacksmith;
        this.iron = 0;
        this.state = 0; // 0 - go to the mine | 1 - dig iron | 2 - go to the blacksmith
        this.speed = 5;
        this.index = 0;
        this.toRightAnimation = minerRightAnimation;
        this.toLeftAnimation = minerLeftAnimation;
        this.displayText = `MINER (${this.health})`;
    }

    action()
    {
		if(this.health <= 0){
			this.displayText = "DEAD MINER";
			return;
		}

        if(this.state == 0)
        {
            let nextPoint = getNextPoint(this.posX, this.posY, this.mine.posX, this.mine.posY, this.speed);

            this.posX = nextPoint[0];
            this.posY = nextPoint[1];
            this.animate();

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
            this.animate();

            if(distanceTo(this.posX,this.posY,this.blacksmith.posX,this.blacksmith.posY) < 15)
            {
                this.blacksmith.receiveIron(this.iron);
                this.iron = 0;
                this.state = 0;
            }
        }
    }

    draw()
    {
        if(this.state == 0)
        {
            image(this.toLeftAnimation[this.index % this.toLeftAnimation.length], this.posX, this.posY, 20, 40);
        } else {
            image(this.toRightAnimation[this.index % this.toRightAnimation.length], this.posX, this.posY, 20, 40);
        }

        if(this.iron > 0)
        {
            image(ironImg, this.posX - 2, this.posY, 15, 15);
        }
    }

    animate() {
        this.index += this.speed;
    }
}