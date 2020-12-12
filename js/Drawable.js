class Clickable {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);

    this.dim = createVector(w, h);

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
}

class Enterable extends Clickable {
  constructor(x, y, name, sprites) {

    let sprite = random(sprites);
    super(x, y, sprite.width, sprite.height);

    this.name = name;
    this.sprite = sprite;

    this.lowerLayer = [];
    this.active = false;

  }

  setObjects(objects) {
    this.lowerLayer = objects;

    if (activeScene === this) {

      for (const object of this.lowerLayer) {
        object.active = true;
      }

    }
  }

  onClicked() {

    console.log(this.lowerLayer);

    if (this.active && !this.lowerLayer.empty) {
      activeScene = this;
      this.active = false;

      for (let lowerObject of this.lowerLayer) {
        lowerObject.active = true;
      }

      return true;
    }
    return false;
  }

  showLayer() {

    for (let layerObject of this.lowerLayer) {
      layerObject.show();
    }

  }

  show() {
    image(this.sprite, this.pos.x, this.pos.y);
  }
}

class WorldMap {
  constructor(w, h, townsNum = 4, housesNum = 4, computersNum = 4) {
    this.lowerLayer = [];
    this.dim = createVector(w, h);

    for (let i = 0; i < townsNum; i++) {
      this.lowerLayer.push(new Enterable(random(w), random(h), "town", townSprites));
      this.lowerLayer[i].active = true;

      for (let j = 0; j < housesNum; j++) {
        this.lowerLayer[i].lowerLayer.push(new Enterable(random(w), random(h), "House", houseSprites));

        for (let k = 0; k < computersNum; k++) {
          this.lowerLayer[i].lowerLayer[j].lowerLayer.push(new Enterable(random(w), random(h), "Computer", computerSprites));
        }
      }
    }
  }

  clicked(x, y) {

    console.log("clicked at: " + x + " | " + y);

    for (let lowerObject of activeScene.lowerLayer) {
      lowerObject.isClicked(x, y);
    }
  }

  showLayer() {
    for (const town of this.lowerLayer) {
      town.show();
    }
  }

}
