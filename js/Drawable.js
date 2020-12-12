class Clickable {
  constructor(x, y, sprite) {

    this.pos = createVector(x, y);
    this.dim = createVector(sprite.width, sprite.height);
    this.sprite = sprite;
  }

  isClicked(x, y) {

    if (this.pos.x <= x && x <= this.pos.x + this.dim.x &&
      this.pos.y <= y && y <= this.pos.y + this.dim.y) {

      return this.onClicked();
    }
    return false;
  }

  onClicked() {
    return true;
  }

  show() {
    image(this.sprite, this.pos.x, this.pos.y);
  }

}

class Enterable extends Clickable {
  constructor(x, y, parent, name, sprite, bgSprite) {

    super(x, y, sprite);

    this.name = name;

    this.parent = parent;

    this.lowerLayer = [];

    this.interior = bgSprite;
  }

  onClicked() {

    if (!this.lowerLayer.empty) {

      this.setActiveScene();

      return true;
    }
    return false;
  }

  setActiveScene() {
    activeScene = this;
  }

  showInterior() {
    return true;
  }

  showLayer() {
    for (let layerObject of this.lowerLayer) {
      layerObject.show();
    }
  }
}

class WorldMap extends Enterable {
  constructor(townsNum = 4, housesNum = 4, computersNum = 4) {

    super(5, 5, undefined, "world", random(backgroundSprites), random(backgroundSprites));

    for (let i = 0; i < townsNum; i++) {
      this.lowerLayer.push(new Enterable(random(this.dim.x), random(this.dim.y),
        this, "town", random(townSprites), undefined));

      for (let j = 0; j < housesNum; j++) {
        this.lowerLayer[i].lowerLayer.push(new Enterable(random(this.dim.x), random(this.dim.y),
          this.lowerLayer[i], "House", random(houseSprites), undefined));

        for (let k = 0; k < computersNum; k++) {
          this.lowerLayer[i].lowerLayer[j].lowerLayer.push(new Enterable(random(this.dim.x), random(this.dim.y),
            this.lowerLayer[i].lowerLayer[j], "Computer", random(computerSprites), undefined));
        }
      }
    }
  }
}
