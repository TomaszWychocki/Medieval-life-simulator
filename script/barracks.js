class Barracks {
    constructor(x, y)
    {
      this.posX = x;
      this.posY = y;
      this.warriors = 0;
      this.trainingProgress = 0;
      this.deployed = 0;
    }

    createWarrior()
    {
      if (this.warriors <= 5)
      {
        this.trainingProgress++;
      }

      if (this.trainingProgress >= 100)
      {
        this.trainingProgress = 0;
        this.warriors++;
      }
    }
    checkForEnemies(){
      enemies.forEach(enemy=>{
        var dist = distanceTo(this.posX,this.posY,enemy.posX,enemy.posY);
        if(dist < 100){
         this.deployWarrior();
        }
      });
    }
    deployWarrior(){
      if(this.deployed>=this.warriors){
        return;
      }
      warriors.push(new Warrior(this.posX, this.posY,this));
      this.deployed++;
    }
    warriorDied(){
      this.warriors--;
      this.deployed--;
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