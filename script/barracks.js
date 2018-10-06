class Barracks extends Building
{
    constructor(x, y)
    {
        super(x, y, barracksImg);
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

    checkForEnemies()
    {
        getCharactersArrayByType("Enemy").forEach(enemy =>
        {
            var dist = distanceTo(this.posX, this.posY, enemy.posX, enemy.posY);
            if (dist < 100)
            {
                this.deployWarrior();
            }
        });
    }

    deployWarrior()
    {
        if (this.deployed >= this.warriors)
        {
            return;
        }
        characters.push(new Warrior(this.posX, this.posY, this));
        this.deployed++;
    }

    warriorDied()
    {
        this.warriors--;
        this.deployed--;
    }

    update()
    {
        this.createWarrior();
        this.checkForEnemies();
    }

    show()
    {
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 60, 60);

        fill(255);
        textAlign(CENTER);
        text('BARRACKS', this.posX, this.posY - 30);
    }
}
