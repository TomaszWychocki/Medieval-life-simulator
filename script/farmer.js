class Farmer extends Villager
{
    constructor(x, y)
    {
        super(x, y);
        this.state=0;
        this.displayText = `FARMER (${this.health})`;
        this.speed=2;
        this.food=0;
    }

    update()
    {
        switch (this.state){
            case 0:
         
                delete this.farm;
                this.farm = new Farm(random(width), random(height));
                this.state=1;
                break;
            case 1:
                let nextPoint = getNextPoint(this.posX, this.posY, this.farm.posX, this.farm.posY, this.speed);

                this.direction = nextPoint[0] < this.posX ? 0 : 1;
                this.posX = nextPoint[0];
                this.posY = nextPoint[1];
                if (distanceTo(this.posX, this.posY, this.farm.posX, this.farm.posY) < 15)
                {
                    this.state = 2;
                }
            break;
            case 2:
            //TODO: make the farmers smarter?
                if(this.farm.checkHavest() > 5){
                    this.food += this.farm.harvest()
                }
                if(this.farm.checkDepletion() < .5){
                    this.state=0;
                }
                break;
                default: this.state = 0;

        }
        this.farm.show();
        this.farm.update();

    }
	show()
	{
		noStroke();
		fill(114, 20, 80);
		ellipse(this.posX, this.posY, 20, 20);
		fill(255);
		textAlign(CENTER);
        text('Farmer', this.posX, this.posY - 12);
    }
    displayHealth() {
        push()
            let healthLength = constrain(this.health/100*30, 0, 30)
            strokeWeight(0)
            fill(color("green"))
            rect(this.posX - 15, this.posY - 25, healthLength ,5)
            fill(color("red"))
            rect(this.posX - 15 + healthLength, this.posY - 25, 30 - healthLength ,5)
        pop()
    }

}
