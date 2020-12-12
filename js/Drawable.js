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
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.objects = [];
    this.active = false;
  }

  setObjects(objects) {
    this.objects = objects;
    if (activeScene === this) {
      for (const object of objects) {
        object.active = true;
      }
    }
  }

  onClicked() {
    if (this.active) {
      activeScene = this;
      this.active = false;
      return true;
    }
    return false;
  }
}

class LayerObject extends Enterable {
  constructor(x, y, name, sprites) {
    let sprite = random(sprites);
    super(x, y, sprite.width, sprite.height);

    this.name = name;
    this.lowerLayer = [];
    this.sprite = sprite;
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
      this.towns.push(new LayerObject(random(w), random(h), "town", townSprites));

      for (let j = 0; j < housesNum; j++) {
        this.towns[i].lowerLayer.push(new LayerObject(random(w), random(h), "House", houseSprites));

        for (let k = 0; k < computersNum; k++) {
          this.towns[i].lowerLayer[j].lowerLayer.push(new LayerObject(random(w), random(h), "Computer", computerSprites));
        }
      }
    }
  }

  clicked(x, y) {
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
