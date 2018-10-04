class Enemy
{
	constructor(x, y, health = 100, defense = 75)
	{
		this.posX = x;
		this.posY = y;
		this.health = health;
		this.defense = defense;
		this.speed = 5;
		this.direction = [random(width), random(height)];
		this.displayText = "Enemy";
	}

	checkForMiners()
	{
		miners.forEach(miner =>
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

	draw()
	{
		if (this.health > 0)
		{
			this.checkForMiners();

			if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 10)
			{
				this.direction = [random(width), random(height)];
			}

			var point = getNextPoint(this.posX, this.posY, this.direction[0], this.direction[1], this.speed);
			this.posX = point[0];
			this.posY = point[1];
		}
		else
		{
			this.displayText = "DEAD ENEMY";
		}

		noStroke();
		fill(244, 66, 226);
		ellipse(this.posX, this.posY, 20, 20);
		fill(255);
		textAlign(CENTER);
		text(this.displayText, this.posX, this.posY - 12);
	}
}