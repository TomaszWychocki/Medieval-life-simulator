class Barracks
{
    constructor(x, y)
    {
        this.posX = x;
        this.posY = y;
        this.img = barracksImg;
        this.warriors = 0;
        this.trainingProgress = 0;
        this.deployed = 0;
    }

    createWarrior()
    {
        if (this.warriors <= 3)
        {
            this.trainingProgress++;
        }

        if (this.trainingProgress >= 100)
        {
            this.trainingProgress = 0;
            this.warriors++;
        }
    }

    checkForEnemies(blacksmiths)
    {
        enemies.forEach(enemy =>
        {
            var dist = distanceTo(this.posX, this.posY, enemy.posX, enemy.posY);
            if (dist < 100)
            {
                var randomBlackSmith = int(random(0, blacksmiths.length))
                this.deployWarrior(blacksmiths[randomBlackSmith]);
            }
        });
    }

    deployWarrior(blacksmith)
    {
        if (this.deployed >= this.warriors)
        {
            return;
        }
        warriors.push(new Warrior(this.posX, this.posY, this, blacksmith));
        this.deployed++;
    }

    warriorDied()
    {
        this.warriors--;
        this.deployed--;
    }

    draw()
    {
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 60, 60);

        fill(255);
        textAlign(CENTER);
        text('BARRACKS', this.posX, this.posY - 30);
    }
}
