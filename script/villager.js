class Villager
{
	constructor(x, y, health = 100, defense = 75)
	{
		this.posX = x;
		this.posY = y;
		this.direction = [random(width), random(height)];
		this.health = health;
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
}
