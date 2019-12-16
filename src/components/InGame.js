import { TextStyle, Text } from 'pixi.js'
import Player from "@/components/Player";
import Tree from "@/components/Tree";
import store from "@/store";
let {width, height} = store.state

export default class InGame
{
  constructor(scenes, gameOverObj) {
    this.gameOverObj = gameOverObj
    this.scenes = scenes
    this._numOfTrees = 24;
    this._allTrees = [];
  }

  setup()
  {
    this.player = new Player(this.scenes.gameScene, "static/images/player.png", 1, width / 1.9, height / 4);
    this.player.scale.set(0.6);

    //create trees
    for(let i = 0; i < this._numOfTrees; i++)
    {
      let tree = new Tree(this.scenes.gameScene, "static/images/tree2.png", 3);
      tree.scale.set(0.7);
      this._allTrees.push(tree);
    }

    let style = new TextStyle(
        {
          fontFamily: 'Century Gothic',
          fontSize: 40,
          fill: 0x8ed1db,
          align: 'center'
        });

    // create score text
    this._scoreText = new Text('0', style);
    this._scoreText.anchor.set(0.5);
    this._scoreText.position.set(width / 2, height / 13);
    this.scenes.gameScene.addChild(this._scoreText);
  }

  update(delta)
  {
    //move player x value
    this.player.update(delta);

    if(this.player.checkOutOfBounds())
    {
      this.OnCollisionHit();
    }

    //updates trees y value and checks collision
    for (var i = 0; i < this._allTrees.length; i++)
    {
      this._allTrees[i].update();
      if(this.collisionDetection(this.player, this._allTrees[i]))
      {
        console.log("Hit Something");
        this.OnCollisionHit();
      }
    }

    //update the score
    this._scoreText.text = this.player.score;
  }

  //changes state to gameover and resets
  OnCollisionHit()
  {
    //change state
    this.scenes.gameScene.visible = false;
    this.scenes.gameOverScene.visible = true;
    store.state.behavior = "end";

    //update scores
    this.gameOverObj.updateScores(this.player.score, this.player.highScore);

    //reset player and trees for next play thorugh
    this.player.resetPlayer();
    for(let i = 0; i < this._allTrees.length; i++)
      this._allTrees[i].calcPosition();
  }

  collisionDetection(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
    //hit will determine whether there's a collision
    hit = false;
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 3;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 5;
    r2.halfHeight = r2.height / 4;
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;


    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      } else {
        //There's no collision on the y axis
        hit = false;
      }
    } else {
      //There's no collision on the x axis
      hit = false;
    }
    //`hit` will be either `true` or `false`
    return hit;
  };
}
