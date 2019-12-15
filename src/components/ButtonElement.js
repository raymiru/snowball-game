import { Sprite, Texture } from 'pixi.js'



export class ButtonElement extends Sprite {
  constructor(image) {
    super(Texture.from(image))
  }
}
