
class Warrior{
	
	constructor(x, y, health=100, defense=75){
		this.posX = x;
		this.posY = y;
		this.health = health;
		this.defense = defense;
		this.speed = 5;
		this.attack= 5;
		this.direction = [random(width), random(height)];
	}
	
	draw(){
        noStroke();
        fill(145, 145, 220);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('Warrior', this.posX, this.posY - 12);
    }
	
}
