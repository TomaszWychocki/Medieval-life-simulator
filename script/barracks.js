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
        if (warriors <= 3)
        {
            trainingProgress++;
        }

        if (trainingProgress >= 100)
        {
            trainingProgress = 0;
            warriors++;
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
        characters.push(new Warrior(posX, posY, this));
        this.deployed++;
    }

    warriorDied()
    {
        warriors--;
        deployed--;
    }

    update()
    {
        this.createWarrior();
        this.checkForEnemies();
    }

    show()
    {
        imageMode(CENTER);
        image(this.img, posX, posY, 60, 60);

        fill(255);
        textAlign(CENTER);
        text('BARRACKS', this.posX, this.posY - 30);
    }
}
