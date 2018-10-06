class Warrior extends Villager
{
	constructor(x, y, barrak, health = 100, defense = 75)
	{
		super(x, y);
		this.defense = defense;
		this.speed = 5;
		this.barrak = barrak;
		this.sword_durable = 0; 
		
		let blacksmiths = getBuildingsArrayByType("Blacksmith");
		let randomBlackSmith = int(random(0, blacksmiths.length))
		this.blacksmith = blacksmiths[randomBlackSmith];
	}

	checkForEnemies()
	{
		getCharactersArrayByType("Enemy").forEach(enemy =>
		{
			var dist = distanceTo(this.posX, this.posY, enemy.posX, enemy.posY);
			if (dist < 15)
			{
				this.sword_durable = constrain(this.sword_durable - SWORD_DEGRADE, 0, SWORD_DURABLE);
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
	
	update() 
	{
		if(this.sword_durable == 0) 
		{
			this.direction = [this.blacksmith.posX, this.blacksmith.posY];
			if(this.blacksmith.swords > 0)
			{
				this.blacksmith.swords--;
				this.sword_durable = SWORD_DURABLE;
			}
		}
		else{
			this.checkForEnemies();
			if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 10)
			{
				this.direction = [random(width), random(height)];
			}
		} 

		var point = getNextPoint(this.posX, this.posY, this.direction[0], this.direction[1], this.speed);
		this.posX = point[0];
		this.posY = point[1];
	}

	show()
	{
		noStroke();
		fill(214, 66, 126);
		ellipse(this.posX, this.posY, 20, 20);
		fill(255);
		textAlign(CENTER);
		text('Warrior', this.posX, this.posY - 12);
		//
		push()
			textSize(10)
			text('DUR: '+this.sword_durable, this.posX, this.posY - 30);
		pop()
	}
}