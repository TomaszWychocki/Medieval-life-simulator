class Farm extends Building
{
    constructor(x, y)
    {
        super(x, y);
        this.growProgress = 0;
        this.food = 0;
        this.depletion = 1;
        setInterval(()=>{this.growProgress++},1000)
    }

   

    update()
    {
        let threshold = this.growProgress * this.depletion
        if(threshold>=10){
            this.growProgress=0;
            this.food++;
        }
    }

    harvest(){
        let food = this.food;
        this.food=0;
        this.depletion-=.01;
        return food;
    }
    checkDepletion(){
        return this.depletion;
    }
    checkHavest(){
        return this.food;
    }

    show()
    {
        noStroke();
		fill(100);
		ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('FARM', this.posX, this.posY - 35);
    }
}