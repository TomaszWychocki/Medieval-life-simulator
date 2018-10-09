class Villager
{
	constructor(x, y, health = 100, defense = 75)
	{
		this.posX = x;
		this.posY = y;
		this.imageDirection = 0;
		this.direction = [random(width), random(height)];
		this.health = health;
		this.index = 0;
		this.isBurried = false;
		this.id = Math.random() * this.posX * this.posY;
		this.inBuilding = false;
		this.displayText = "";
	}

	getType()
	{
		return this.constructor.name;
	}

	update()
	{
		console.log("NOT IMPLEMENTED");
	}

	show()
	{
		console.log("NOT IMPLEMENTED");
	}

	move(destinationX, destinationY)
	{
		if(distanceTo(this.posX, this.posY, destinationX, destinationY) > 10)
		{
			const nextPoint = getNextPoint(this.posX, this.posY, destinationX, destinationY, this.speed);
			this.imageDirection = nextPoint[0] > this.posX ? 1 : 0;
			this.posX = nextPoint[0];
			this.posY = nextPoint[1];
			this.animate();
		}
	}

	animate()
    {
        this.index += this.speed;
	}
	
	displayHealth() 
    {
		fill(255);
		textAlign(CENTER);
        text(this.displayText, this.posX, this.posY - 28);

        push()
            let healthLength = constrain(this.health/100*30, 0, 30)
            strokeWeight(0)
            fill(color("green"))
            rect(this.posX - 15, this.posY - 25, healthLength ,5)
            fill(color("red"))
            rect(this.posX - 15 + healthLength, this.posY - 25, 30 - healthLength ,5)
        pop()
	}
	
	setDefaultDispalyText()
	{
		let type = this.getType().toUpperCase();
		this.displayText = `${type} (${this.health})`;
	}
}
