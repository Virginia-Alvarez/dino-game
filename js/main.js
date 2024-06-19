'use strict'

const canvas= document.getElementById('canvas');
const scoreBoard = document.querySelector('.points');

//board
const canvasWidth = 700;
const canvasHeight = 400;
let context;

//dino
    //this is for initial position of the dino
const initialDinoWidth = 88;
const initialDinoHeight = 94;
const initialDinoX = 50;
const initialDinoY = canvasHeight - initialDinoHeight;
let dinoImg;

//for movement of dino
const dino = {
    x : initialDinoX,
    y : initialDinoY,
    width : initialDinoWidth,
    height : initialDinoHeight
}

//cactus
const cactusArray = [];

const cactus1Width = 34;
const cactus2Width = 69;
const cactus3Width = 102;

const initialCactusHeight = 70;
const initialCactusX = 700;
const inititalCactusY = canvasHeight - initialCactusHeight;
let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8; //cactus moving left speed
let velocityY = 0;
let gravity = .4;

//function draw board

window.onload = function(){
    canvas;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    context = canvas.getContext("2d");


    dinoImg = new Image();
    dinoImg.src = "./img/Dino2legs.svg";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "./img/CACTUS.svg";

    cactus2Img = new Image();
    cactus2Img.src = "./img/CACTUS.svg";

    cactus3Img = new Image();
    cactus3Img.src = "./img/CACTUS.svg";

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000); //1000 milliseconds = 1 second
    document.addEventListener ('keydown', moveDino);
}

//function

function update(){
    requestAnimationFrame(update);

    context.clearRect(0, 0, canvas.width, canvas.height); // for clean canvas

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, initialDinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for(let i=0; i < cactusArray.length; i++){
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
    }

    

}

function moveDino(event){
    if((event.code === "ArrowUp" || event.code === "Space") && dino.y === initialDinoY){
        velocityY = -10;
    }
}

function placeCactus(){
    
    //place cactus
    let cactus = {
        img : null,
        x : initialCactusX,
        y : inititalCactusY,
        width : null,
        height: initialCactusHeight
    }

    let placeCactusChance = Math.random(); //0 - 0.9999...

    if (placeCactusChance > .90) { //10% you get cactus3
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .70) { //30% you get cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .20) { //80% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 10) {
        cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

