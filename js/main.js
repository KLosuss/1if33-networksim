let townSprites = [];
let houseSprites = [];
let computerSprites = [];


let worldMap = undefined;
let activeScene = undefined;

function preload() {

  let townSpritesNum = 1;
  let houseSpritesNum = 1;
  let computerSpritesNum = 1;


  for (let i = 0; i < townSpritesNum; i++) {
    townSprites.push(loadImage("img/assets/town" + i + ".png"));
  }

  for (let i = 0; i < houseSpritesNum; i++) {
    houseSprites.push(loadImage("img/assets/house" + i + ".png"));
  }

  for (let i = 0; i < computerSpritesNum; i++) {
    computerSprites.push(loadImage("img/assets/computer" + i + ".png"));
  }
}

function setup() {
  let canvas = createCanvas(600, 600);

  canvas.parent('sketch-holder');

  worldMap = new WorldMap(600, 600);
  activeScene = worldMap;

}

function draw() {

  background(220);

  activeScene.showLayer();

}


function mouseClicked() {
  worldMap.clicked(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
