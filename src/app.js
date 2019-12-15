import '@/assets/styles/index.css'
import store from '@/store'
import { Application, Container } from 'pixi.js'
import MainMenu from '@/components/MainMenu'

const el = document.getElementById('app')

const app = new Application({
  width: store.state.width,
  height: store.state.height,
  backgroundColor: 0xffffff,
  antialias: true
})

el.appendChild(app.view)

function setup() {
  let scenes = {
    menuScene: new Container(),
    gameScene: new Container(),
  }

  app.stage.addChild(scenes.menuScene)
  app.stage.addChild(scenes.gameScene)


  const mainMenu = new MainMenu(scenes)
  mainMenu.setup()

}

function gameLoop() {

}

setup()
