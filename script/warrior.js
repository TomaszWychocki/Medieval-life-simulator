class Warrior extends Villager
{
	constructor(x, y, barrak, health = 100, defense = 75)
	{
		super(x, y);
		this.defense = defense;
		this.speed = 5;
		this.barrak = barrak;
		this.sword_durable = 0; 
		this.displayText = `WARRIOR (${this.health})`;
		let blacksmiths = getBuildingsArrayByType("Blacksmith");
		let randomBlackSmith = int(random(0, blacksmiths.length))
		this.blacksmith = blacksmiths[randomBlackSmith];
		this.hospital = getBuildingsArrayByType("Hospital")[0];
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
		this.barrak.warriorDied();
	}
	
	update() 
	{
		if (this.health <= 0) 
		{
			this.die();
			this.displayText = "DEAD WARRIOR";
            return;
		}

		if (this.health < 100 && this.state != 4) 
		{
			this.state = 3;
		}

		if (this.sword_durable <= 0) 
		{
			this.state = 0;	
		}

		if (this.state == 0) 
		{
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

		if (this.state == 1) 
		{
			if(this.blacksmith.swords > 0)
			{
				this.blacksmith.swords--;
				this.sword_durable = SWORD_DURABLE;
				this.state = 2;
			}
		}
		
		if (this.state == 2) 
		{
			this.checkForEnemies();
			if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 15)
			{
				this.direction = [random(width), random(height)];
			}
			this.move(this.direction[0], this.direction[1]);
			this.animate();
		}
		
		if (this.state == 3) 
		{
			console.log('heading to hospital', this);
			if (distanceTo(this.posX, this.posY, this.hospital.posX, this.hospital.posY) < 15) 
			{
				console.log('at hospital');
				if(this.hospital.addPatient())
                {
                    this.state = 4;
                }
			}
			console.log('not at hospital yet', this.hospital);
			this.move(this.hospital.posX, this.hospital.posY);
			this.animate();
		}

		if (this.state == 4) 
		{
			this.hospital.healPatient(this);

            if (this.health >= 100)
            {
                this.health = 100;
                this.hospital.releasePatient();
                this.state = 0;
            }
		}
	}

	show()
	{
		noStroke();
		fill(214, 66, 126);
		ellipse(this.posX, this.posY, 20, 20);
		fill(255);
		textAlign(CENTER);
		text(this.displayText, this.posX, this.posY - 28);
        this.displayHealth()
		//
		push()
			textSize(10)
			text('DUR: '+this.sword_durable, this.posX, this.posY + 20);
		pop()
	}

	displayHealth() 
	{
        push()
            let healthLength = constrain(this.health/100*30, 0, 30)
            strokeWeight(0)
            fill(color("green"))
            rect(this.posX - 15, this.posY - 20, healthLength ,5)
            fill(color("red"))
            rect(this.posX - 15 + healthLength, this.posY - 20, 30 - healthLength ,5)
        pop()
    }
}