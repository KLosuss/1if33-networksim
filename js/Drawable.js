class Clickable {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);

    this.dim = createVector(w, h);
  }

  isClicked(x, y) {
    if (this.pos.x <= x < this.pos.x + this.dim.x &&
      this.pos.y <= y < this.pos.y + this.dim.y) {
      if (this.onClicked()) {
        return true;
      }
    }
    return false;
  }

  onClicked() {
    console.log("clicked: " + this.constructor.name);
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
    if (this.active) {
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
    this.towns = [];
    this.dim = createVector(w, h);

    for (let i = 0; i < townsNum; i++) {
      this.towns.push(new Enterable(random(w), random(h), "town", townSprites));
      this.towns[i].active = true;

      for (let j = 0; j < housesNum; j++) {
        this.towns[i].lowerLayer.push(new Enterable(random(w), random(h), "House", houseSprites));

        for (let k = 0; k < computersNum; k++) {
          this.towns[i].lowerLayer[j].lowerLayer.push(new Enterable(random(w), random(h), "Computer", computerSprites));
        }
      }
    }
  }

  clicked(x, y) {

    console.log("clicked at: " + x + " | " + y);

    for (let town of this.towns) {
      town.isClicked(x, y);
    }
  }

  showLayer() {
    for (const town of this.towns) {
      town.show();
    }
  }

}
