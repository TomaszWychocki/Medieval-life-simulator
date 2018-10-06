class Priest extends Villager
{
    constructor(x, y)
    {
        super(x, y);
        this.state = 0;
        this.speed = 5;
        this.deadCharacter = null;
    }

    action()
    {
        /**
         * PRIEST STATES:
         * 0 - wait for dead character
         * 1 - go to dead character
         * 2 - go back cemetery
         */

        if (this.state == 0)
        {
            if (distanceTo(this.posX, this.posY, cemetery.posX, cemetery.posY) > 15)
            {
                let nextPoint = getNextPoint(this.posX, this.posY, cemetery.posX, cemetery.posY, this.speed);
                this.posX = nextPoint[0];
                this.posY = nextPoint[1];
            }

            miners.forEach(miner =>
            {
                if(miner.health <= 0 && miner.isBurried == false)
                {
                    this.deadCharacter = miner;
                    this.state = 1;
                }
            });

            warriors.forEach(warrior =>
            {
                if(warrior.health <= 0 && warrior.isBurried == false)
                {
                    this.deadCharacter = warrior;
                    this.state = 1;
                }
            });

            enemies.forEach(enemy => {
                if(enemy.health <= 0 && enemy.isBurried == false)
                {
                    this.deadCharacter = enemy;
                    this.state = 1;
                }
            });
        }

        if (this.state == 1)
        {
            let nextPoint = getNextPoint(this.posX, this.posY, this.deadCharacter.posX, this.deadCharacter.posY, this.speed);

            this.posX = nextPoint[0];
            this.posY = nextPoint[1];

            if (distanceTo(this.posX, this.posY, this.deadCharacter.posX, this.deadCharacter.posY) < 15)
            {
                this.state = 2;
            }
        }

        if (this.state == 2)
        {
            let nextPoint = getNextPoint(this.posX, this.posY, cemetery.posX, cemetery.posY, this.speed);

            this.posX = nextPoint[0];
            this.posY = nextPoint[1];
            this.deadCharacter.posX = nextPoint[0] + 10;
            this.deadCharacter.posY = nextPoint[1] + 10;

            if (distanceTo(this.posX, this.posY, cemetery.posX, cemetery.posY) < 15)
            {
                this.deadCharacter.isBurried = true;
                this.state = 0;
            }
        }
    }

    draw()
    {
        noStroke(255);
        fill(0, 255, 0);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('PRIEST', this.posX, this.posY - 12);
    }
}
