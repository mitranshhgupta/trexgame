var trex ,trex_running;
var ground, ground2,ground2img
var cloud,cloudimg
var bird,birdImg
var obstacle,obs1,obs2,obs3,obs4,obs5,obs6
var PLAY = 1
var END = 0
var gameState = PLAY
var score=0
var obsGroup,cldGroup,brdGroup
var dead
var gameOver,gameOverImg
var reset,resetImg

function preload(){
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
ground2img=loadImage("ground2.png")
cloudimg=loadImage("cloud.png")
obs1=loadImage("obstacle1.png")
obs2=loadImage("obstacle2.png")
obs3=loadImage("obstacle3.png")
obs4=loadImage("obstacle4.png")
obs5=loadImage("obstacle5.png")
obs6=loadImage("obstacle6.png")
dead=loadAnimation("trex_collided.png")
gameOverImg=loadImage("gameOver.png")
resetImg=loadImage("reset.png")
birdImg=loadImage("bird.png")
}

function setup(){
createCanvas(windowWidth,windowHeight)
//create a trex sprite
trex = createSprite(50,600,20,50); 
trex.addAnimation("running", trex_running);
trex.scale=0.5
trex.addAnimation("colided",dead);
gameOver=createSprite(width/2,height/2,600,10)
reset=createSprite(width/2,height/2+60,600,10)
reset.scale=0.09
ground=createSprite(300,640,600,10)
ground2=createSprite(300,620,600,10)
  ground2.addImage("ground",ground2img)
  ground2.x=ground2.width/2
  ground2.velocityX=-8
  obsGroup= new Group()
  cldGroup= new Group()
  brdGroup=new Group()
  trex.setCollider("circle",0,0,30)
  //trex.debug=true
  
}

function draw(){
background("white")
fill("red")
textSize(30)
text("Score:"+score,width/2+200,50)

if (gameState== PLAY) {
  gameOver.visible=false
  reset.visible=false
  score = score+Math.round(getFrameRate()/60)
 if (keyDown("space")&& trex.y>=620){
  trex.velocityY=-12
  }
  if (ground2.x<300){
    ground2.x=ground2.width/2
  }
  ground2.velocityX=-8
trex.velocityY=trex.velocityY+0.5
showcloud()
fly()
cactus()
if (obsGroup.isTouching(trex)) {

  gameState=END
}
if (brdGroup.isTouching(trex)) {

  gameState=END
}

}

else if(gameState==END){
  gameOver.visible=true
reset.visible=true
  trex.changeAnimation("colided",dead)
ground.velocityX=0
ground2.velocityX=0
trex.velocityY=0
gameOver.addImage("game",gameOverImg)
reset.addImage("reset",resetImg)
obsGroup.setVelocityXEach(0)
cldGroup.setVelocityXEach(0)
brdGroup.setVelocityXEach(0)
if (mousePressedOver(reset)) {
  re()
}

}
console.log(trex.y)
  

    
    


ground.visible=false
trex.collide(ground)

drawSprites();
}
function showcloud()
{
  if(frameCount %100==0){
    cloud=  createSprite(1200,random(height/2-300,height/2-100),100,100)
    cloud.addImage("cloud",cloudimg)
    cloud.velocityX=-3
  cloud.scale= 0.8   
  cldGroup.add(cloud)
 }
 
}
 function fly()
{
  if(frameCount % 450 == 0){
   bird=  createSprite(1200,random(height/2+100,height/2+50),100,100)
    bird.addImage(birdImg)
    bird.velocityX=-10
  bird.scale= 0.5  
  brdGroup.add(bird)
 }
}
 function cactus(){
  if (frameCount %90==0){
    obstacle=createSprite(1200,620,100,100)
    obstacle.velocityX=-8
    obstacle.scale=0.6
    var rand =Math.round(random(1,6))
    switch (rand) {
    
      case 1: obstacle.addImage(obs1)
        break;
        case 2: obstacle.addImage(obs2)
        break;
        case 3: obstacle.addImage(obs3)
        break;
        case 4: obstacle.addImage(obs4)
        break;
        case 5: obstacle.addImage(obs5)
        break;
        case 6: obstacle.addImage(obs6)
        break;
      default:
        break;
    }
 obsGroup.add(obstacle)
  }

}

function re(){
  score=0
gameOver.visible=false
  reset.visible=false
  obsGroup.destroyEach()
  cldGroup.destroyEach()
  brdGroup.destroyEach()
trex.changeAnimation("running", trex_running)
gameState=PLAY
}


