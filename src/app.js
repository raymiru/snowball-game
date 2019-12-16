import '@/assets/styles/index.css'
import store from '@/store'
import { Application, Container } from 'pixi.js'
import MainMenu from '@/components/MainMenu'
import InGame from '@/components/InGame'
import GameOver from "@/components/GameOver";

const el = document.getElementById('app')

// app instance
const app = new Application({
  width: store.state.width,
  height: store.state.height,
  backgroundColor: 0xffffff,
  antialias: true
})

el.appendChild(app.view)

// game bootstrap
function bootstrap() {
  const scenes = {
    menuScene: new Container(),
    settingsScene: new Container(),
    gameScene: new Container(),
    gameOverScene: new Container()
  }

  scenes.gameScene.visible = false
  scenes.gameOverScene.visible = false

  app.stage.addChild(scenes.menuScene)
  app.stage.addChild(scenes.gameScene)
  app.stage.addChild(scenes.gameOverScene)

  const mainMenu = new MainMenu(scenes)
  mainMenu.setup()

  const gameOver = new GameOver(scenes)
  gameOver.setup()

  const inGame = new InGame(scenes, gameOver)
  inGame.setup()



  //create gameScene controller

  const spacebar = keyboard(32)
  spacebar.release = () => inGame.player.changeDirection()

  store.state.behavior = 'menu'

  app.ticker.add(delta => gameLoop(delta))

  function gameLoop(delta) {
    if (store.state.behavior === 'menu') {
      // menu logic
    } else if (store.state.behavior === 'play') {
      inGame.update(delta)
    } else {
      // game over logic
    }
  }
}

//keyboard controller
function keyboard(keyCode) {
  const key = {}
  key.code = keyCode
  key.isDown = false
  key.isUp = true
  key.release = undefined

  //downhandler
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      key.isDown = true
      key.isUp = false
    }
    event.preventDefault()
  }

  //uphandler
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release()
      key.isDown = false
      key.isUp = true
    }
    event.preventDefault()
  }

  // event listeners
  window.addEventListener('keydown', key.downHandler.bind(key), false)
  window.addEventListener('keyup', key.upHandler.bind(key), false)
  return key
}

bootstrap()
