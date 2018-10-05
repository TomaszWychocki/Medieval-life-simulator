class Townhall
{
    constructor(x, y)
    {
        this.posX = x;
        this.posY = y;
        this.img = townhallImg;
    }

    soundAlarm()
    {
    }

    draw()
    {
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 100, 100);

        textAlign(CENTER);
        text('TOWNHALL', this.posX, this.posY - 12);
    }
}
