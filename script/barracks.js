class Barracks {
    constructor(x, y)
    {
      this.posX = x;
      this.posY = y;
      this.trainingProgress = 0;
    }

    createWarrior()
    {
      if (this.setTime >= 5)
      {
        this.trainingProgress++;
      }

      if (this.trainingProgress >= 100)
      {
        this.trainingProgress = 0;
        this.warriors++;
      }V
    }

    draw()
    {
      noStroke();
      fill(244, 122, 66);
      ellipse(this.posX, this.posY, 20, 20);
      fill(255);
      textAlign(CENTER);
      text('BARRACKS', this.posX, this.posY - 12);
    }
  }
