var dog,Dog,happy_Dog;
var database;
var foodS,foodStock;
var feedPet,addFood;
var fedTime,lastFed;
var foodObj;
var feed;
var Food;
function preload(){
   Dog=loadImage("Images/dogImg.png");
   happy_Dog=loadImage("Images/dogImg1.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedPet);

  addFood=createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
  foodObj = new Food()
  dog=createSprite(800,250,100,100);
  dog.addImage(Dog);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);

  if(keyWentDown("space") && foodS===0){
    writestock(foodS);
    dog.addImage(Dog);
  
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + " PM", 350,30);

    }else if(lastFed===0){
      text("LAST FEED  12 AM", 350,30)
    }else{
      text("Last Feed : " + lastFed+ " AM", 350,30)
    }

 

    foodObj.display();
  }
  fedTime=datebase.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  

  drawSprites();
  fill(255,255,254);
  stroke("black");
 // text("Food remaining : "+foodS,180,280);
  textSize(18);
  //text("Note: Press UP_ARROW Key To Feed Drago Milk!",100,10,300,20);
  //text("Press space to reset",160,60)
}

function button(){
  if(addFood.mousePressed){
    foodStock=foodStock+1
  }
}

function feeddog(){
  if(feed.mousePressed)
  {
    hour()
    dog.addImage("dogImg1.png");
    
  }
}
//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
} 

function writestock(x){
    x=20;
  database.ref('/').update({
    Food:x
  })
} 

function addFoods(){
  foodS++;
  database.ref('/').update({

  })
}