class Villager
{
	constructor(x, y, health = 100, defense = 75)
	{
		this.posX = x;
		this.posY = y;
		this.direction = 1; // 0 = left, 1 = right
		this.health = health;
	}
}
