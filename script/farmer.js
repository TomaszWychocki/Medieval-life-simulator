class Farmer extends Villager
{
    constructor(x, y)
    {
        super(x, y);
        this.state = 0;
        this.speed = 2;
        this.food = 0;
        this.setDefaultDispalyText();
    }

    update()
    {
        switch (this.state)
        {
            case 0:
                let pos = generateBuildingPosition();
                this.farm = new Farm(pos.x, pos.y);
                buildings.push(this.farm);
                this.state = 1;
                break;

            case 1:
                let nextPoint = getNextPoint(this.posX, this.posY, this.farm.posX, this.farm.posY, this.speed);

                this.direction = nextPoint[0] < this.posX ? 0 : 1;
                this.posX = nextPoint[0];
                this.posY = nextPoint[1];
                if (distanceTo(this.posX, this.posY, this.farm.posX, this.farm.posY) < 15)
                {
                    this.inBuilding = true;
                    this.state = 2;
                }
                break;

            case 2:
                //TODO: make the farmers smarter?
                if (this.farm.checkHavest() > 5)
                {
                    this.food += this.farm.harvest()
                }
                if (this.farm.checkDepletion() < .5)
                {
                    removeBuilding(this.farm);
                    this.inBuilding = false;
                    this.state = 0;
                }
                break;

            default:
                this.state = 0;
                break;
        }
    }
    
    show()
    {
        if(this.inBuilding == false && this.isBurried == false)
        {
            noStroke();
            fill(114, 20, 80);
            ellipse(this.posX, this.posY, 20, 20);
            this.displayHealth();
        }
    }
}
