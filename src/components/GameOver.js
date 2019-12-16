import {TextStyle, Text, Sprite} from 'pixi.js'
import { ButtonElement } from '@/components/ButtonElement'
import store from '@/store'
const { width, height } = store.state

export default class GameOver {
  constructor(scenes) {
    this.scenes = scenes

    //text styles
    this._scoreTextstyle = new TextStyle({
      fontFamily: 'Century Gothic',
      fontSize: 35,
      fill: 'black',
      align: 'center'
    })
    this._scoreAmountStyle = new TextStyle({
      fontFamily: 'Century Gothic',
      fontSize: 40,
      fill: 'black',
      align: 'center'
    })
    this._highScoreTextStyle = new TextStyle({
      fontFamily: 'Century Gothic',
      fontSize: 15,
      fill: 'black',
      align: 'center'
    })
    this._highScoreAmountStyle = new TextStyle({
      fontFamily: 'Century Gothic',
      fontSize: 25,
      fill: 'black',
      align: 'center'
    })
  }

  setup() {
      this.logo = Sprite.from('static/images/snowball.png')
      this.logo.scale.set(0.5)
      this.logo.position.set(width/12, height/12)
      this.logo.filters = []
      this.scenes.gameOverScene.addChild(this.logo)

    this._playAgainButton = new ButtonElement(
      this.scenes.gameOverScene,
      'static/images/play_button.png',
      width - width / 4,
      height - height / 8,
      0.18
    )
    this._playAgainButton.isClickable(true)
    this._playAgainButton.clicked(() => {
      store.state.behavior = 'play'
      this.scenes.gameScene.visible = true
      this.scenes.gameOverScene.visible = false
    })

    this._returnToMenuButton = new ButtonElement(
      this.scenes.gameOverScene,
      'static/images/back.png',
      width / 4,
      height - height / 8,
      0.18
    )
    this._returnToMenuButton.isClickable(true)
    this._returnToMenuButton.clicked(() => {
      store.state.behavior = 'menu'
      this.scenes.menuScene.visible = true
      this.scenes.gameOverScene.visible = false
    })

    let scoreText = this.CreateText(
      'Score',
      this._scoreTextstyle,
      width / 2,
      height / 1.7
    )
    this.scenes.gameOverScene.addChild(scoreText)

    this._scoreAmount = this.CreateText(
      '0',
      this._scoreAmountStyle,
      width / 2,
      height / 1.5
    )
    this.scenes.gameOverScene.addChild(this._scoreAmount)

    let highScoreText = this.CreateText(
      'High Score',
      this._highScoreTextStyle,
      width / 2,
      height / 1.35
    )
    this.scenes.gameOverScene.addChild(highScoreText)

    this._highScoreAmount = this.CreateText(
      '0',
      this._highScoreAmountStyle,
      width / 2,
      height / 1.27
    )
    this.scenes.gameOverScene.addChild(this._highScoreAmount)
  }

  //return text object
  CreateText(text, style, posX, posY) {
    let newText = new Text(text, style)
    newText.anchor.set(0.5)
    newText.position.set(posX, posY)
    return newText
  }

  //sets score text
  updateScores(score, highScore) {
    //update the score and highscore text
    this._scoreAmount.text = score
    this._highScoreAmount.text = highScore
  }
}
