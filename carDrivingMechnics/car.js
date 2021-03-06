class Car{
    constructor(x,y,width,height) {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

         this.speed = 0;
         this.acceleration=0.2;

         this.maxSpeed=3;
         this.friction=0.05;  

         this.angle=0;
          
        this.controls= new Controls()
    }

    update(){
        this.#move()
    }

    #move(){
        if(this.controls.forword){
            // this.y-=2;
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            // this.y+=2
            this.speed-=this.acceleration;
        }


        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed){
            this.speed=-this.maxSpeed/2;
        }

       // car start , break function
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }

        // stop car from auto running
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        // left right moving fuction
        // stop rotate when speed zero and when go backward and right it gose left that do not work in real life...solve it
        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                // this.x-=2;
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                // this.x+=2;
                this.angle-=0.03*flip;
            } 
        }
  //car rotate like tank but when running donot going left right,,,,solve this
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
         ctx.save()
         ctx.translate(this.x,this.y);
         ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            // this.x-this.width/2,
            // this.y-this.height/2,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )
        ctx.fill()

        ctx.restore();
    }
}