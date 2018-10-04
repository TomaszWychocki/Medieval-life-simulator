class Townhall 
{
    constructor(x, y) 
    {
        this.posX = x;
        this.posY = y;
    }

    soundAlarm() 
    {
	//sounds an alarm to let villagers to flee or run to safety
    }

    draw() 
    {
        noStroke();
        fill(240, 240, 240);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('TOWNHALL', this.posX, this.posY - 12);
    }
}
