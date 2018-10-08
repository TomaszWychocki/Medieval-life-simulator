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
}
