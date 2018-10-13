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
        let townhall = getBuildingsArrayByType("Townhall")[0]; // assume its there
        let hospital = getBuildingsArrayByType("Hospital")[0];

        if (this.health < 100 && this.food == 0 && this.state !== 0)
        {
            // As long as not already moving to or healing at the hospital
            if(this.state !== 20 && this.state !== 21) {
                this.state = 20; // go to hospital
            }
        }

        switch (this.state)
        {
            // Farmers create Farms at the start
            case 0:
                // Add in a delay so that the farm requires time to be made
                let pos = generateBuildingPosition();
                this.posX = pos.x;
                this.posY = pos.y;
                this.farm = new Farm(pos.x, pos.y);
                buildings.push(this.farm);
                this.state = 1;
                break;

            // Move to Farm
            case 1:
                if (distanceTo(this.posX, this.posY, this.farm.posX, this.farm.posY) < 10) // 15
                {
                    this.inBuilding = true;
                    this.state = 2;
                    break;
                }
                this.inBuilding = false;
                this.move(this.farm.posX, this.farm.posY);

                break;

            // Harvest Food, rebuild farm if depleted, or wait
            case 2:
                //TODO: make the farmers smarter?
                if (this.farm.checkHavest() > 5)
                {
                    this.food += this.farm.harvest();
                    this.state = 3;
                    break;
                }
                if (this.farm.checkDepletion() < .5)
                {
                    removeBuilding(this.farm);
                    this.inBuilding = false;
                    this.state = 0;
                    break;
                }
                break;

            // Go to Townhall
            case 3:
                this.inBuilding = false;
                if(distanceTo(this.posX, this.posY, townhall.posX, townhall.posY) < 15) {
                    this.inBuilding = true;
                    this.state = 4;
                    break;
                }
                this.move(townhall.posX, townhall.posY);
                break;
            
            // Dump the food
            case 4:
                // TODO: add in time to unload the food?
                
                townhall.food += this.food;
                this.food = 0;
                this.state = 1;
                break;

            // Go to a hospital
            case 20:
                this.inBuilding = false;
                if (distanceTo(this.posX, this.posY, hospital.posX, hospital.posY) < 15)
                {
                    if(hospital.addPatient())
                    {
                        this.state = 21;
                    }
                    break;
                }

                this.move(hospital.posX, hospital.posY);
                break;

            // Heal @ hospital
            case 21:
                this.inBuilding = true;
                hospital.healPatient(this);

                if (this.health >= 100)
                {
                    this.health = 100;
                    hospital.releasePatient();
                    this.setDefaultDispalyText();
                    this.state = 1;
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
