class Blacksmith
{
    constructor(x, y)
    {
        this.posX = x;
        this.posY = y;
        this.img = blacksmithImg;
        this.iron = 0;
        this.swords = 0;
        this.workProgress = 0;
    }

    createSword()
    {
        if (this.iron >= 2)
        {
            this.workProgress += 0.3;
        }

        if (this.workProgress >= 100)
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
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 70, 70);

        fill(255);
        textAlign(CENTER);
        text('BLACKSMITH', this.posX, this.posY - 35);

        fill(255, 204, 0);
        text('IRON: ' + this.iron, this.posX, this.posY + 40);

        fill('#222222');
        text('SWORDS: ' + this.swords, this.posX, this.posY + 52);
    }
}