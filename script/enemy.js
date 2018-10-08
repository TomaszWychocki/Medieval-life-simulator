class Enemy extends Villager
{
	constructor(x, y, health = 100, defense = 75)
	{
		super(x, y);
		this.defense = defense;
		this.speed = 5;
		this.index = 0;
        this.toRightAnimation = enemyWalkAnimRight;
        this.toLeftAnimation = enemyWalkAnimLeft;
		this.displayText = "Enemy";
	}

	checkForMiners()
	{
		getCharactersArrayByType("Miner").forEach(miner =>
		{
			var dist = distanceTo(this.posX, this.posY, miner.posX, miner.posY);
			if (dist < 15 && !miner.inBuilding)
			{
				miner.health -= 10;
				miner.displayText = "OUCH!";
				setTimeout(() => miner.displayText = `MINER (${miner.health})`, 1500);
			}
		});
	}

	checkForWarriors()
	{
		getCharactersArrayByType("Warrior").forEach(warrior =>
		{
			var dist = distanceTo(this.posX, this.posY, warrior.posX, warrior.posY);
			if (dist < 15)
			{
				warrior.health -= 10 * (warrior.defense / 100);
				warrior.displayText = "OUCH!";
				setTimeout(() => warrior.displayText = `WARRIOR (${warrior.health})`, 1500);
			}
		});
	}

	update()
	{
		if (this.health > 0)
		{
			this.checkForMiners();
			this.checkForWarriors();

			if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 10)
			{
				this.direction = [random(width), random(height)];
			}

			this.move(this.direction[0], this.direction[1]);
			this.animate();
		}
		else
		{
			this.displayText = "DEAD ENEMY";
		}
	}

	show()
	{
		let animation = this.imageDirection === 1 ? this.toRightAnimation : this.toLeftAnimation;
        image(animation[this.index % animation.length], this.posX, this.posY, 60, 60);
		fill(255);
		text(this.displayText, this.posX, this.posY - 34);
        this.displayHealth();
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
}