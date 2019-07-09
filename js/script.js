const canvas = document.getElementById('canvas');


canvas.style.width = 600 + 'px';
canvas.style.height = 550 + 'px';
canvas.style.marginLeft = 300 + 'px';
canvas.style.border = `1 px solid black`;
canvas.style.backgroundColor= 'black';
canvas.width = parseInt(canvas.style.width);
canvas.height = parseInt(canvas.style.height);

const firstLane = 0,
      secondLane = 1,
      thirdLane = 2,
      laneWidth = canvas.width/3,
      speed = 2;

function drawPath(){
  if(canvas.getContext){
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(200,0);
    ctx.lineTo(200,window.innerHeight);
    ctx.moveTo(400,0);
    ctx.lineTo(400,window.innerHeight);
    ctx.strokeStyle = 'white';
    ctx.stroke();

  }
}
drawPath();

let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


class car  {
  constructor(car){
    this.lane = car.lane;
    this.width = car.width;
    this.height = car.height;
    this.positionX = (this.lane + 0.5) * laneWidth - (this.width / 2);
    this.positionY = car.positionY;
    this.color = car.color;

}

draw(){
  if(canvas.getContext){
    const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.rect(this.positionX,this.positionY,this.width,this.height);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();

  }

}
update() {
  this.positionX = (this.lane + 0.5) * laneWidth - (this.width / 2);
  this.positionY     += speed;
}

}

let updateAll = () => {
  if(canvas.getContext){
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  playerCar.draw();
  enemyCarList.forEach((enemyCar, index) => {
  enemyCar.draw();

  })
  drawPath();

}
}

let collision =(eachEnemy)=>{
   if (playerCar.positionX < eachEnemy.positionX + eachEnemy.width &&
 playerCar.positionX + playerCar.width > eachEnemy.positionX &&
 playerCar.positionY < eachEnemy.positionY + eachEnemy.height &&
 playerCar.positionY + playerCar.height > eachEnemy.positionY) {
  // collision detected!
  stopgame();


}
}

let aboveCar = {
  lane : firstLane,
  width : 50,
  height : 75 ,
  positionY : 0 ,
  color : 'red',
};

let belowCar = {
  lane : secondLane,
  width : 50,
  height : 65 ,
  positionY : canvas.height - 85 ,
  color : 'blue',
};



let autoCar = new car(aboveCar);
autoCar.draw();


let playerCar = new car(belowCar);
playerCar.draw();


let enemyCarList = [];

setInterval(() => {
  let enemyCar = new car(aboveCar);
  enemyCar.lane = generateRandomNumber(0, 3);
  enemyCarList.push(enemyCar);

  if (enemyCarList.length > 10) {
    enemyCarList.splice(0, 6);
  }
}, 3000);

let animate = setInterval(() => {
  enemyCarList.forEach((eachEnemy, index) => {
    eachEnemy.update();
    eachEnemy.draw();
    collision(eachEnemy);
    updateAll();

  })
}, 40)

let stopgame = ()=>{
  clearInterval(animate);
  alert("GAMEOVER");
}


function getKeyAndMove(el){
  var keyCode = el.keyCode;
  switch(keyCode){
    case(37):
    moveLeft();
    break;
    case(39):
    moveRight();
    break;
  }

}
function moveLeft(){
  if(playerCar.lane>0){
  playerCar.lane -= 1;
  playerCar.update();
  updateAll();
}
  // belowCar.draw();
}

function moveRight(){
  if(playerCar.lane<2){
  playerCar.lane += 1;
  playerCar.update();
  updateAll();

}
}
document.addEventListener('keydown',getKeyAndMove,true);
