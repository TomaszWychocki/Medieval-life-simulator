class Townhall 
{
    constructor(x, y) 
    {
        this.posX = x;
        this.posY = y;
        this.iron = 0;
    }

    soundAlarm() 
    {
	//should tell the villagers that enemies are raiding!

    }

    draw() 
    {
        noStroke();
        fill(230, 230, 230);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('TOWNHALL', this.posX, this.posY - 12);
    }
}
