class Mine
{
    constructor(x, y)
    {
        this.posX = x;
        this.posY = y;
        this.img = mineImg;
        this.miningProgress = 0;
        this.iron = 0;
    }

    dig()
    {
        this.miningProgress += 3;

        if (this.miningProgress >= 100)
        {
            this.miningProgress = 0;
            this.iron++;
        }
    }

    draw()
    {
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 60, 60);

        fill(255);
        textAlign(CENTER);
        text('MINE', this.posX, this.posY - 35);
    }
}