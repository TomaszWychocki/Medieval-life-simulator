class Miner extends Villager
{
    constructor(x, y, _mine, _blacksmith)
    {
        super(x, y);
        this.mine = _mine;
        this.blacksmith = _blacksmith;
        this.iron = 0;
        this.state = 0;
        this.speed = 5;
        this.toRightAnimation = minerRightAnimation;
        this.toLeftAnimation = minerLeftAnimation;
        this.displayText = `MINER (${this.health})`;
        this.hospital = getBuildingsArrayByType("Hospital")[0];
    }

    update()
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
            this.move(this.mine.posX, this.mine.posY);
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
            this.move(this.blacksmith.posX, this.blacksmith.posY);
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
            if (distanceTo(this.posX, this.posY, this.hospital.posX, this.hospital.posY) < 15)
            {
                if(this.hospital.addPatient())
                {
                    this.state = 4;
                }
            }

            this.move(this.hospital.posX, this.hospital.posY);
            this.animate();
        }

        if (this.state == 4)
        {
            this.hospital.healPatient(this);

            if (this.health >= 100)
            {
                this.health = 100;
                this.hospital.releasePatient();
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

    show()
    {
        let animation = this.imageDirection === 1 ? this.toRightAnimation : this.toLeftAnimation;
        image(animation[this.index % animation.length], this.posX, this.posY, 20, 40);

        if (this.iron > 0)
        {
            image(ironImg, this.posX - 2, this.posY, 15, 15);
        }
        text(this.displayText, this.posX, this.posY - 28);
        this.displayHealth();

        if (this.state == 1)
        {
            this.grunt();
        }
    }

    grunt()
    {
        noStroke();
        fill(255);
        rect(this.posX + 15, this.posY - 40, 40, 20, 5);
        triangle(this.posX + 15 + 5, this.posY - 40 + 20, this.posX + 15 + 15, this.posY - 40 + 20, this.posX + 15 + 2, this.posY - 40 + 30);

        let previousTextSize = textSize();
        fill(0);
        textSize(8);
        textAlign(CENTER, CENTER);
        text("Grunt!", this.posX + 15 + 20, this.posY - 40 + 10);
        textSize(previousTextSize);
    }
}
