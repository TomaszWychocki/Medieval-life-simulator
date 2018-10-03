class Mine 
{
    constructor(x, y) 
    {
        this.posX = x;
        this.posY = y;
        this.miningProgress = 0;
        this.iron = 0;
    }

    dig() 
    {
        this.miningProgress += 3;

        if(this.miningProgress >= 100) 
        {
            this.miningProgress = 0;
            this.iron++;
        }
    }

    draw() 
    {
        noStroke();
        fill(255, 204, 100);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('MINE', this.posX, this.posY - 12);
    }
}