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
        image(this.img, this.posX, this.posY);

        fill(255);
        textAlign(CENTER);
        text('HOME', this.posX, this.posY - 35);
    }
}