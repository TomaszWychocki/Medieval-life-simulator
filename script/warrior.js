class Warrior extends Villager
{
	constructor(x, y, barrack, health = 100, defense = 75)
	{
		super(x, y);
		this.defense = defense;
		this.speed = 5;
		this.index = 0;
		this.barrack = barrack;
		this.sword_durable = 0; 
		this.displayText = `WARRIOR (${this.health})`;
		let blacksmiths = getBuildingsArrayByType("Blacksmith");
		let randomBlackSmith = int(random(0, blacksmiths.length))
		this.blacksmith = blacksmiths[randomBlackSmith];
		this.hospital = getBuildingsArrayByType("Hospital")[0];
		this.toRightAnimation = warriorWalkAnimRight;
		this.toLeftAnimation = warriorWalkAnimLeft;
	}

	checkForEnemies()
	{
		getCharactersArrayByType("Enemy").forEach(enemy =>
		{
			var dist = distanceTo(this.posX, this.posY, enemy.posX, enemy.posY);
			if (dist < 15)
			{
				console.log('enemy found');
				this.sword_durable = constrain(this.sword_durable - SWORD_DEGRADE, 0, SWORD_DURABLE);
				enemy.health -= 10;
				enemy.displayText = "OUCH!";
				setTimeout(() => enemy.displayText = `ENEMY (${enemy.health})`, 1500);
			}
		});
	}

	die()
	{
		this.status = VILLAGER_STATUS_DEAD;
		this.barrack.warriorDied();
	}
	
	update() 
	{
		if (this.health <= 0 && this.status != VILLAGER_STATUS_DEAD) 
		{
			this.die();
			this.displayText = "DEAD WARRIOR";
            return;
		}

		if (this.health < 100 && this.state != 4) 
		{
			this.state = 3;
		}

		if (this.sword_durable <= 0 && this.state !== 1) 
		{
			this.state = 0;	
		}

		// Move toward blacksmith
		if (this.state == 0) 
		{
			this.inBuilding = false;
			if (distanceTo(this.posX, this.posY, this.blacksmith.posX, this.blacksmith.posY) < 15) 
			{
				this.state = 1;	
			}
			else 
			{
				this.move(this.blacksmith.posX, this.blacksmith.posY);
				this.animate();
			}
		}

		// Pick up a sword from the blacksmith
		if (this.state == 1) 
		{
			this.inBuilding = true;
			if(this.blacksmith.swords > 0)
			{
				this.blacksmith.swords--;
				this.sword_durable = SWORD_DURABLE;
				this.state = 2;
			}
		}
		
		// Move randomly and attack an enemy if one is found
		if (this.state == 2) 
		{
			this.inBuilding = false;
			this.checkForEnemies();
			if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 15)
			{
				this.direction = [random(width), random(height)];
			}
			this.move(this.direction[0], this.direction[1]);
			this.animate();
		}
		
		// Head to hospital
		if (this.state == 3) 
		{
			this.inBuilding = false;
			//console.log('heading to hospital', this);
			if (distanceTo(this.posX, this.posY, this.hospital.posX, this.hospital.posY) < 15) 
			{
				//console.log('at hospital');
				if(this.hospital.addPatient())
                {
                    this.state = 4;
                }
			}
			//console.log('not at hospital yet', this.hospital);
			this.move(this.hospital.posX, this.hospital.posY);
		}

		// Heal at hospital
		if (this.state == 4) 
		{
			this.inBuilding = true;
			this.hospital.healPatient(this);

            if (this.health >= 100)
            {
                this.health = 100;
				this.hospital.releasePatient();
				this.setDefaultDispalyText();
                this.state = 2; // Go back to moving randomly from here
            }
		}
	}

	show()
	{
		if(this.inBuilding == false && this.isBurried == false)
		{
			let animation = this.imageDirection === 1 ? this.toRightAnimation : this.toLeftAnimation;
			image(animation[this.index % animation.length], this.posX, this.posY, 60, 60);
			this.displayHealth();
			push();
				textSize(10);
				text('DUR: '+this.sword_durable, this.posX, this.posY + 20);
			pop();
		}
	}
}