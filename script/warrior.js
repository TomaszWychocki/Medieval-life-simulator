class Warrior
{
	constructor(x, y, barrak, health = 100, defense = 75)
	{
		this.posX = x;
		this.posY = y;
		this.health = health;
		this.defense = defense;
		this.speed = 5;
		this.direction = [random(width), random(height)];
		this.barrak = barrak;
	}

	checkForEnemies()
	{
		enemies.forEach(enemy =>
		{
			var dist = distanceTo(this.posX, this.posY, enemy.posX, enemy.posY);
			if (dist < 15)
			{
				enemy.health -= 10;
				enemy.displayText = "OUCH!";
				setTimeout(() => enemy.displayText = `ENEMY (${enemy.health})`, 1500);
			}
		});
	}

	die()
	{
		this.barrak.warriorDied();
	}

	draw()
	{
		this.checkForEnemies();

		if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 10)
		{
			this.direction = [random(width), random(height)];
		}

		var point = getNextPoint(this.posX, this.posY, this.direction[0], this.direction[1], this.speed);
		this.posX = point[0];
		this.posY = point[1];

		noStroke();
		fill(214, 66, 126);
		ellipse(this.posX, this.posY, 20, 20);
		fill(255);
		textAlign(CENTER);
		text('Warrior', this.posX, this.posY - 12);
	}
}