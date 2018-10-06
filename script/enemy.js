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
			if (dist < 15)
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
		
	}

	show()
	{
		let animation;
		let currDir; // Store change in direction
		let prevPosX = this.posX;
		if (this.health > 0)
		{
			this.checkForMiners();
			this.checkForWarriors();

			if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 10)
			{
				this.direction = [random(width), random(height)];
			}

			var point = getNextPoint(this.posX, this.posY, this.direction[0], this.direction[1], this.speed);
			this.posX = point[0];
			this.posY = point[1];
			this.animate();
		}
		else
		{
			this.displayText = "DEAD ENEMY";
		}

		currDir = this.posX - prevPosX;
		animation = currDir > 0 ? this.toRightAnimation : this.toLeftAnimation;
		imageMode(CENTER);
        image(animation[this.index % animation.length], this.posX, this.posY, 60, 60);

		fill(255);
		textAlign(CENTER);
		text(this.displayText, this.posX - 5, this.posY - 34);
	}

	animate()
    {
        this.index += this.speed;
    }
}