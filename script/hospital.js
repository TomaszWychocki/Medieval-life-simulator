class Hospital extends Building
{
    constructor(x, y)
    {
        super(x, y, hospitalImg);
        this.maxPatients = 5;
        this.patietnsCounter = 0;
    }

    addPatient()
    {
        if (this.patietnsCounter < this.maxPatients)
        {
            this.patietnsCounter++;
            return true;
        }

        return false;
    }

    healPatient(patient)
    {
        if (patient.health < 100)
        {
            patient.health += 0.1;
            patient.displayText = `MINER (${Math.round(patient.health)})`;
        }
    }

    releasePatient()
    {
        this.patietnsCounter--;
    }

    update()
    {
        
    }

    show()
    {
        imageMode(CENTER);
        image(this.img, this.posX, this.posY, 80, 80);

        fill(255);
        textAlign(CENTER);
        text('HOSPITAL', this.posX, this.posY - 40);
    }
}