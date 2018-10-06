class Building
{
	constructor(x, y, img = null)
	{
		this.posX = x;
		this.posY = y;
		this.img = img;
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
