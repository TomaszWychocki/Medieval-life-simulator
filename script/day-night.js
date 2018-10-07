class DayNight
{
    constructor() 
    {
        this.hoursInDay = 24;
        this.hour = 12;
        this.minute = 0;
        this.second = 0;
        this.currentTime = [this.hour, this.minute, this.second];
        this.workHours = [6,7,8,9,10,11,12,13,14,15,16,17,18];
        this.restHours = [19,20,21,22,23,24,0,1,2,3,4,5];
    }
    
    getCurrentTime()
    {
        return [this.hour, this.minute, this.second];
    }

    addHour() 
    {
        this.hour++;
        if (this.hour > 24) {
            this.hour = 0;
        }
    }

    addMinute() 
    {
        this.minute++;
        if (this.minute > 60) {
            this.minute = 0;
            this.addHour();
        }
    }

    addSecond() 
    {
        this.second++;
        if (this.second > 60) {
            this.second = 0;
            this.addMinute();
        }
    }

    isDay()
    {
        return this.workHours.includes(this.hour);
    }

    isNight()
    {
        return this.restHours.includes(this.hour);
    }
}