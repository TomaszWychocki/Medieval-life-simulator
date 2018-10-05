class Cemetery
{
    constructor(x, y)
    {
        this.posX = x;
        this.posY = y;
        this.img = "TODO";
    }

    draw()
    {
        //imageMode(CENTER);
        //image(this.img, this.posX, this.posY, 80, 80);

        noStroke();
		fill(214, 66, 126);
		ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('CEMETERY', this.posX, this.posY - 12);
    }
}