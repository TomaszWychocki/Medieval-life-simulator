class Hospital
{
    constructor(x, y)
    {
        this.posX = x;
        this.posY = y;
        this.maxPatients = 5;
        this.patients = [];
    }

    addPatient(patient)
    {
        if (this.maxPatients < 5 && patient.health < 100)
        {
            this.patients.push(patient);
        }
    }

    healPatient(patient)
    {
        if (patient.health < 100)
        {
            patient.health++;
        }
    }

    releasePatient(patient)
    {
        this.patients.pop(patient);
    }

    draw()
    {
        noStroke();
        fill(244, 65, 80);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('HOSPITAL', this.posX, this.posY - 12);
    }
}