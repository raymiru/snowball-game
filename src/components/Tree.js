import { Sprite, Texture } from 'pixi.js'
import store from "@/store";
export default class Tree extends Sprite {
  constructor(parent, image, speed) {
    super(Texture.from(image))

    this.position.set(this.calcPosition())
    this.scale.set(Math.floor(Math.random()) + 0.7)
    this.pivot.set(0.0, 0.5)
    this.anchor.set(0.0, 0.5)
    this.vy = speed

    if (parent) {
      parent.addChild(this)
    }
  }

  togglePause(isPaused) {
    if (isPaused) this.tempspeed = this.vy
    else this.vy = this.tempspeed
  }

  update() {
    this.y -= this.vy

    if (this.y < 0) {
      this.calcPosition()

      this.scale.set(0.7)
      console.log(this.scale)
    }
  }

  calcPosition() {
    this.position.set(
      this.getRandomInt(store.state.width),
      this.getRandomInt(store.state.height) + store.state.height
    )
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
}
