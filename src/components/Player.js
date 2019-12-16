import { Sprite, Texture } from 'pixi.js'
import store from '@/store'


export default class Player extends Sprite {
  constructor(parent, image, speed, posX, posY) {
    super(Texture.from(image))

    this.position.set(posX, posY)
    this.pivot.set(0.5)
    this.anchor.set(0.5)
    this.speed = speed
    this.vx = 0
    this.score = 0
    this.highScore = 0
    this.textures = ['static/images/player.png', 'static/images/player2.png']

    if (parent) {
      parent.addChild(this)
    }

    this.timer = 100
  }

  updateTexture(index) {
    this.texture = Texture.from(this.textures[index])
  }

  update(delta) {
    this.x += this.vx
    this.timer -= delta
    if (this.timer < 0) {
      this.timer = 100
      this.updateScore()
    }
  }

  changeDirection() {
    console.log('EnteredChangeDirection')
    if (this.vx === 0) {
      this.vx = this.speed
    } else {
      this.vx = -this.vx
    }
  }

  resetPlayer() {
    this.x = store.state.width / 1.9
    this.y = store.state.height / 4
    this.vx = 0
    this.score = 0
    this.timer = 100
  }

  updateScore() {
    this.score += 1

    if (this.score > this.highScore) this.highScore = this.score
  }

  checkOutOfBounds() {
    if (this.x > store.state.width || this.x < 0) {
      console.log('Out of bounds')
      return true
    }
    return false
  }
}
