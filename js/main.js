let townSprites = [];
let houseSprites = [];
let computerSprites = [];
let backgroundSprites = [];


let activeScene = undefined;

let worldMap = undefined;
let upButton = undefined;

function preload() {

  let backgroundSpritesNum = 1;
  let townSpritesNum = 1;
  let houseSpritesNum = 1;
  let computerSpritesNum = 1;

  for (let i = 0; i < backgroundSpritesNum; i++) {
    backgroundSprites.push(loadImage("img/assets/background" + i + ".png"));
  }

  for (let i = 0; i < townSpritesNum; i++) {
    townSprites.push(loadImage("img/assets/town" + i + ".png"));
  }

  for (let i = 0; i < houseSpritesNum; i++) {
    houseSprites.push(loadImage("img/assets/house" + i + ".png"));
  }

  for (let i = 0; i < computerSpritesNum; i++) {
    computerSprites.push(loadImage("img/assets/computer" + i + ".png"));
  }

  upButton = loadImage("img/assets/up_button.png");
}

function setup() {

  let canvas = createCanvas(0, 0);
  canvas.parent('sketch-holder');

  worldMap = new WorldMap(4, 4, 4);
  activeScene = worldMap;

  canvas.resize(worldMap.dim.x, worldMap.dim.y);

  upButton = new Clickable(10, 10, upButton);

}

function draw() {

  background(220);

  activeScene.showInterior();
  activeScene.showLayer();
  upButton.show();
}


function mouseClicked() {

  for (let lowerObject of activeScene.lowerLayer) {
    lowerObject.isClicked(mouseX, mouseY);
  }

  if (upButton.isClicked(mouseX, mouseY)) {
    if (activeScene.parent) {
      activeScene.parent.setActiveScene();
    }
  }
}
