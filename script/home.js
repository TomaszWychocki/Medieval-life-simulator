class Home extends Building
{
    constructor(x, y)
    {
        super(x, y, homeImg);
    }

    update()
    {
        
    }

    show()
    {
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 60, 60);

        fill(255);
        textAlign(CENTER);
        text('HOME', this.posX, this.posY - 35);
    }
}