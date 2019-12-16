import { Sprite, filters } from 'pixi.js'
import store from '@/store'
import { ButtonElement } from '@/components/ButtonElement'
const { width, height } = store.state

export default class MainMenu {
  constructor(scenes) {
    this.scenes = scenes
  }

  setup() {
    // app logo
    this.logo = Sprite.from('static/images/snowball.png')
    this.logo.scale.set(0.5)
    this.logo.position.set(width/12, height/12)
    this.logo.filters = []
    this.scenes.menuScene.addChild(this.logo)

    //create play button and add button press event
    this.playButton = new ButtonElement(
      this.scenes.menuScene,
      'static/images/play_button.png',
      width / 2

        ,
      height - height / 3,
      0.18
    )
    this.playButton.isClickable(true)
    this.playButton.clicked(() => {
      console.log('PlayButtonClicked')
      store.state.behavior = 'play'
      this.scenes.gameScene.visible = true
      this.scenes.menuScene.visible = false
    })

    // todo
    // this.settingsButton = new ButtonElement(
    //   this.scenes.menuScene,
    //   'static/images/settings_button.png',
    //   width / 1.4,
    //   height - height / 3,
    //     0.18
    // )
    //
    // this.settingsButton.isClickable(true)
    // this.settingsButton.clicked(() => {
    //   store.state.behavior = 'settings'
    //   this.scenes.gameScene.visible = false
    //   this.scenes.menuScene.visible = false
    // })
  }
}
