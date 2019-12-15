import {Sprite} from 'pixi.js'
import store from '@/store'
import {ButtonElement} from "@/components/ButtonElement";

export default class MainMenu {
  constructor(scenes) {
    this.scene = scenes.menuScene
  }

  setup() {
    this.logo = new ButtonElement('static/images/s1200.jpg')
    console.log(this.logo)
    this.logo.scale.set(1.1)

    this.scene.addChild(this.logo)
  }
}
