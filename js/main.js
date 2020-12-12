let townSprites = [];
let houseSprites = [];
let computerSprites = [];

let townBackgroundSprites = [];
let houseBackgroundSprites = [];
let computerBackgroundSprites = [];
let worldBackgroundSprites = [];

let activeScene = undefined;

let worldMap = undefined;
let upButton = undefined;

function preload() {

  let townSpritesNum = 1;
  let houseSpritesNum = 1;
  let computerSpritesNum = 1;

  let townBackgroundSpritesNum = 1;
  let houseBackgroundSpritesNum = 1;
  let computerBackgroundSpritesNum = 1;
  let worldBackgroundSpritesNum = 1;

  for (let i = 0; i < townSpritesNum; i++) {
    townSprites.push(loadImage("img/assets/town" + i + ".png"));
  }
  for (let i = 0; i < houseSpritesNum; i++) {
    houseSprites.push(loadImage("img/assets/house" + i + ".png"));
  }
  for (let i = 0; i < computerSpritesNum; i++) {
    computerSprites.push(loadImage("img/assets/computer" + i + ".png"));
  }


  for (let i = 0; i < townBackgroundSpritesNum; i++) {
    townBackgroundSprites.push(loadImage("img/assets/town_background" + i + ".png"));
  }

  for (let i = 0; i < houseBackgroundSpritesNum; i++) {
    houseBackgroundSprites.push(loadImage("img/assets/house_background" + i + ".png"));
  }

  for (let i = 0; i < computerBackgroundSpritesNum; i++) {
    computerBackgroundSprites.push(loadImage("img/assets/computer_background" + i + ".png"));
  }

  for (let i = 0; i < worldBackgroundSpritesNum; i++) {
    worldBackgroundSprites.push(loadImage("img/assets/world_background" + i + ".png"));
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
