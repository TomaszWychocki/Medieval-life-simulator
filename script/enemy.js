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
		this.setDefaultDispalyText();
	}

	chectForVillagers()
	{
		characters.forEach(character =>
		{
			if(character.getType() != "Enemy")
			{
				var dist = distanceTo(this.posX, this.posY, character.posX, character.posY);
				if (dist < 15 && !character.inBuilding)
				{
					character.health -= 10;
					character.displayText = "OUCH!";
					setTimeout(() => this.setDefaultDispalyText(), 1500);
				}
			}
		});
	}

	update()
	{
		if (this.health > 0)
		{
			this.chectForVillagers();

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
		if(this.inBuilding == false && this.isBurried == false)
		{
			let animation = this.imageDirection === 1 ? this.toRightAnimation : this.toLeftAnimation;
			image(animation[this.index % animation.length], this.posX, this.posY, 60, 60);
			this.displayHealth();
		}
	}
}