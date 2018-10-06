class Cemetery extends Building
{
    constructor(x, y)
    {
        super(x, y);
    }

    update()
    {
        
    }

    show()
    {
        //imageMode(CENTER);
        //image(this.img, this.posX, this.posY, 80, 80);

        noStroke();
		fill(0);
		ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('CEMETERY', this.posX, this.posY - 12);
    }
}