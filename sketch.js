//Create variables here
var dog, happyDog, database, foodS, foodStock,dogSprite;

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
  createCanvas(1000, 800);
  dogSprite = createSprite(350, 420, 10, 10);
  dogSprite.addImage(dog);
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() { 
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    dogSprite.addImage(happyDog);
    writeStock(foodS);
  }

  drawSprites();
  //add styles here
  textSize(30);
  fill(255);
  text("Note: Press UP_ARROW key to feed Drago Milk!", 250, 100);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    food:x
  })

}