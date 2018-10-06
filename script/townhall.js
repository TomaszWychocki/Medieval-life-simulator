class Townhall extends Building
{
    constructor(x, y)
    {
        super(x, y, townhallImg);
    }

    soundAlarm()
    {

    }

    update()
    {
        
    }

    show()
    {
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 100, 100);

        textAlign(CENTER);
        text('TOWNHALL', this.posX, this.posY - 50);
    }
}
