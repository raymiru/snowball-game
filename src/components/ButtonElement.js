import { Sprite, Texture } from 'pixi.js'

export class ButtonElement extends Sprite {
  constructor(parent, image, posX, posY, scale) {
    super(Texture.from(image))

    // standard variables
    this.position.set(posX, posY)
    this.pivot.set(0.5)
    this.anchor.set(0.5)
    this.scale.set(scale)
    this.originalSize = scale

    //create mouse/finger events
    this.on('pointerdown', () => this.onDown(), this)
    this.on('pointerup', () => this.onUp(), this)
    this.on('pointerover', () => this.onHover(), this)
    this.on('pointerout', () => this.onOut(), this)

    // add to parent
    if (parent) parent.addChild(this)
  }

  onDown() {
    this.y += 2
    this.tint = 0xffffff
  }

  onUp() {
    if (typeof this._cb === 'function') {
      this._cb()
    }
    this.y -= 2
  }

  onHover() {
    this.scale.set(this.originalSize + 0.01)
  }

  onOut() {
    this.scale.set(this.originalSize)
  }

  isClickable(state) {
    this.interactive = state
    this.buttonMode = state
  }

  clicked(cb) {
    this._cb = cb
  }
}
