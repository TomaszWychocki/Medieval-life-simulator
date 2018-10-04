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
        this.state = 0;
        this.speed = 5;
        this.index = 0;
        this.toRightAnimation = minerRightAnimation;
        this.toLeftAnimation = minerLeftAnimation;
        this.displayText = `MINER (${this.health})`;
    }

    action()
    {
        /**
         * MINER STATES:
         * 0 - go to the mine
         * 1 - dig iron
         * 2 - go to the blacksmith
         * 3 - go to hospital
         * 4 - heal wounds
         */

        if (this.health <= 0)
        {
            this.displayText = "DEAD MINER";
            return;
        }

        if (this.health < 100 && this.iron == 0 && this.state != 4)
        {
            this.state = 3;
        }

        if (this.state == 0)
        {
            let nextPoint = getNextPoint(this.posX, this.posY, this.mine.posX, this.mine.posY, this.speed);

            this.direction = nextPoint[0] < this.posX ? 0 : 1;
            this.posX = nextPoint[0];
            this.posY = nextPoint[1];
            this.animate();

            if (distanceTo(this.posX, this.posY, this.mine.posX, this.mine.posY) < 15)
            {
                this.state = 1;
            }
        }

        if (this.state == 1)
        {
            this.mine.dig();

            if (this.mine.iron > 0)
            {
                this.iron = this.mine.iron;
                this.mine.iron = 0;
                this.state = 2;
            }
        }

        if (this.state == 2)
        {
            let nextPoint = getNextPoint(this.posX, this.posY, this.blacksmith.posX, this.blacksmith.posY, this.speed);

            this.direction = nextPoint[0] < this.posX ? 0 : 1;
            this.posX = nextPoint[0];
            this.posY = nextPoint[1];
            this.animate();

            if (distanceTo(this.posX, this.posY, this.blacksmith.posX, this.blacksmith.posY) < 15)
            {
                this.blacksmith.receiveIron(this.iron);
                this.iron = 0;
                this.state = 0;
            }
        }

        if (this.state == 3)
        {
            if (distanceTo(this.posX, this.posY, hospitals[0].posX, hospitals[0].posY) < 15)
            {
                if(hospitals[0].addPatient())
                {
                    this.state = 4;
                }
            }

            let nextPoint = getNextPoint(this.posX, this.posY, hospitals[0].posX, hospitals[0].posY, this.speed * 0.75);

            this.direction = nextPoint[0] < this.posX ? 0 : 1;
            this.posX = nextPoint[0];
            this.posY = nextPoint[1];
            this.animate();
        }

        if (this.state == 4)
        {
            hospitals[0].healPatient(this);

            if (this.health >= 100)
            {
                this.health = 100;
                hospitals[0].releasePatient();
                this.state = 0;
            }
        }
    }

    displayHealth() {
        push()
            let healthLength = constrain(this.health/100*30, 0, 30)
            strokeWeight(0)
            fill(color("green"))
            rect(this.posX - 15, this.posY - 25, healthLength ,5)
            fill(color("red"))
            rect(this.posX - 15 + healthLength, this.posY - 25, 30 - healthLength ,5)
        pop()
    }

    draw()
    {
        let animation = this.direction === 1 ? this.toRightAnimation : this.toLeftAnimation;
        image(animation[this.index % animation.length], this.posX, this.posY, 20, 40);

        if (this.iron > 0)
        {
            image(ironImg, this.posX - 2, this.posY, 15, 15);
        }
        text(this.displayText, this.posX, this.posY - 28);
        this.displayHealth()
    }

    animate()
    {
        this.index += this.speed;
    }
}
