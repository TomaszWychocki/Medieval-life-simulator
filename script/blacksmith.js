class Blacksmith 
{
    constructor(x, y) 
    {
        this.posX = x;
        this.posY = y;
        this.iron = 0;
        this.swords = 0;
        this.workProgress = 0;
    }

    createSword()
    {
        if(this.iron >= 2)
        {
            this.workProgress++;
        }

        if(this.workProgress >= 100)
        {
            this.workProgress = 0;
            this.iron -= 2;
            this.swords++;
        }
    }

    draw() 
    {
        noStroke();
        fill(2, 204, 200);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('BLACKSMITH', this.posX, this.posY - 12);
    }
}