var tom,tomImg,tomImg2;
var jerry,jerryImg;
var spike,spikeImg,spikeGroup
var coin,coinImg;
var climber,climberImg,climberGroup;
var cloud,cloudImg;
var bg;
var tom2Img;
var PLAY=1;
var END=0;
var gameState=1;
var gameOver;
var tomwonImage;
var tomwon;

function preload()
{
   bg=loadImage("background.jpg")
   
   tomImg=loadAnimation("tom/t1.png","tom/t2.png","tom/t3.png","tom/t4.png","tom/t5.png","tom/t6.png",
                        "tom/t7.png","tom/t8.png");
 
  climberImg=loadImage("climber.png")
 
  jerryImg=loadAnimation("jerry/j1.png","jerry/j2.png","jerry/j3.png","jerry/j4.png","jerry/j5.png",
                          "jerry/j6.png","jerry/j7.png","jerry/j8.png","jerry/j9.png","jerry/j10.png",
                          "jerry/j11.png","jerry/j12.png","jerry/j13.png","jerry/j14.png","jerry/j15.png",
                          "jerry/j16.png","jerry/j17.png","jerry/j18.png","jerry/j19.png");

  gameoverImg=loadImage("go.jpg")

  //tomwonImage=loadImage("tomwon.png")
  //tomImg2=loadAnimation("tom2.png")
  // tom2Img=loadImage("tom2.png");
  spikeImg=loadImage("Spike.png")
}

function setup()
 {
  createCanvas(400,660);

  ground=createSprite(400,650,800,10);
  ground.shapeColor="brown";

  tom= createSprite(100, 600, 50, 50);
  tom.addAnimation("running",  tomImg)
  tom.scale=1;
  tom.setCollider("rectangle",0,0,100,150);

  climberGroup =  createGroup();
  spikeGroup   =  createGroup();

  jerry=createSprite(230,60,20,20);
  jerry.addAnimation("teasing",jerryImg);
  jerry.scale=0.4;
 
 
  gameOver=createSprite(400,300,100,800)
  gameOver.addImage(gameoverImg);
  gameOver.height=gameOver.height*4;
  gameOver.scale=2;
  gameOver.visible=false;

  /*tomwon=createSprite(365,330,100,800)
  tomwon.addImage(tomwonImage);
  tomwon.height=gameOver.height*4;
  tomwon.scale=1.2;
  tomwon.visible=false;*/
}

function draw() {
  background(bg); 
  
if (gameState===1) 
{

  if (keyWentDown("y")) 
  {
    tom.velocityY=-10;
    
  }
  tom.velocityY=tom.velocityY+0.5;

 tom.collide(ground);
 if (keyDown(RIGHT_ARROW))
  {
   tom.x=tom.x+3;
   //tom.changeAnimation("left",tom2Img)
  }
 if (keyDown(LEFT_ARROW)) 
  {
  tom.x=tom.x-3;
 
  //tom.changeAnimation("right",  tomImg)
  }

  spawnClimbers();

  if (tom.isTouching(climberGroup)) 
  {
    tom.velocityX=0;
    tom.velocityY=0; 
  }
  if (tom.isTouching(jerry)) 
  {
    tomwon.visible=true;
    gameState=0;
  }
  else
  if (tom.isTouching(spikeGroup))
   {
    gameOver.visible=true;
   gameState=0;
   }
} 
else
if(gameState===0)
 {
  tom.velocityX=0;
  tom.velocityY=0;
  tom.destroy();
  spikeGroup.destroyEach();
  climberGroup.destroyEach();

 }

  drawSprites();
}
function spawnClimbers() {
  if (frameCount%50===0) {
   
      climber=createSprite(100,600,50,20);
      climber.addImage(climberImg);
      climber.y=random(100,650);
      climber.velocityX=3;
      climberGroup.add(climber)
      climber.setCollider("rectangle",0,0,90,35);
      //climber.debug=true;
      tom.depth=climber.depth;

    
      spike=createSprite(100,100,50,20);
      spike.addImage(spikeImg);
      spike.x=climber.x+random(-20,20);
      spike.y=climber.y-50;
      spike.velocityX=3;
      spike.scale=0.3;
      spikeGroup.add(spike);
      spike.setCollider("circle",0,0,75)
      spike.scale=0.3;
      spikeGroup.add(spike);
      spike.setCollider("circle",0,0,75)
      tom.depth=spike.depth;
  }

}


