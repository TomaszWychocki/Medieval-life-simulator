class StatBlock
{
	constructor(x, y)
	{
		this.posX = x;
        this.posY = y;
        this.show = true;
		this.background = null;
        this.id = Math.random() * this.posX * this.posY;
        
        this.characterCounts =
        {
            total: 0,
            alive: 0,
            dead: 0,
            avgHealth: 0,
            Enemies: 0,
            EnemyHealth: 0,
            EnemiesKilled: 0
        } ;
	}

	getType()
	{
		return this.constructor.name;
	}

	update(characters)
	{
        if(this.show !== true) return;

        //console.log("NOT IMPLEMENTED");
        this.characterCounts.total = characters.length;
        this.characterCounts.alive = 0;
        this.characterCounts.dead = 0;
        this.characterCounts.avgHealth = 0;
        this.characterCounts.Enemies = 0;
        this.characterCounts.EnemyHealth = 0;
        this.characterCounts.EnemiesKilled = 0;
        characters.forEach(element => {
            if(element.getType() !== 'Enemy'){
            if(element.health > 0) {
                this.characterCounts.alive += 1;
                this.characterCounts.avgHealth += element.health;
            } else {
                this.characterCounts.dead += 1;
            }
        }else{
            if(element.health > 0) {
                this.characterCounts.Enemies += 1;
                this.characterCounts.EnemyHealth += element.health;
            }else{
                this.characterCounts.EnemiesKilled += 1;
            }
        }
        });
        this.characterCounts.avgHealth = (this.characterCounts.avgHealth / this.characterCounts.alive);
        this.characterCounts.EnemyHealth = this.characterCounts.Enemies > 0 ? (this.characterCounts.EnemyHealth / this.characterCounts.Enemies).toFixed() : '--';

        textSize(16);
        textAlign(LEFT);
        fill(255);
        //textSize(32);
        textStyle(BOLD);
        text('Villagers: ' + this.characterCounts.total, this.posX, this.posY);
        text(`Alive: ${this.characterCounts.alive}`,this.posX,this.posY + 25);
        text(`Dead: ${this.characterCounts.dead}`,this.posX,this.posY + 50);
        text(`Avg Health: ${this.characterCounts.avgHealth.toFixed()}%`, this.posX, this.posY + 75);
        text(`Enemies: ${this.characterCounts.Enemies}`,this.posX,this.posY + 100);
        text(`Enemy Health: ${this.characterCounts.EnemyHealth}%`, this.posX, this.posY + 125);
        text(`Enemies Killed: ${this.characterCounts.EnemiesKilled}`,this.posX,this.posY + 150);
        textSize(12);
	}

}
