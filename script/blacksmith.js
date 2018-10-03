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

    receiveIron(iron)
    {
        this.iron += iron;
    }

    draw() 
    {
        noStroke();
        fill(2, 204, 200);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('BLACKSMITH', this.posX, this.posY - 12);

        fill(255, 204, 0);
        text('IRON: ' + this.iron, this.posX, this.posY + 24);

        fill('#222222');
        text('SWORDS: ' + this.swords, this.posX, this.posY + 36);
    }
}