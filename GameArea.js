import Level from "./Level.js";
import Levels from "./Levels.js";
import NinjaSprites from "./NinjaSprites.js";
import AnimatedObject from "./AnimatedObject.js";
import RawObject from "./RawObject.js";

export default class GameArea {

  constructor() {
    this.ninja = new AnimatedObject([
      "https://i.ibb.co/M7WMMSF/Run-000.png",
      "https://i.ibb.co/PNRvt4b/Run-001.png",
      "https://i.ibb.co/0GwK00G/Run-002.png",
      "https://i.ibb.co/MZbd23L/Run-003.png",
      "https://i.ibb.co/TtbP0D7/Run-004.png",
      "https://i.ibb.co/TbZW4w6/Run-005.png",
      "https://i.ibb.co/hy7w9m2/Run-006.png",
      "https://i.ibb.co/pRfrF4w/Run-007.png",
      "https://i.ibb.co/d49Dn2N/Run-008.png",
      "https://i.ibb.co/0DZhJWJ/Run-009.png"
    ], 60, 60, 10, 10);
    this.level = new Level(
      32,
      32,
      32,
      32,
      Levels.water,
      Levels.path,
      Levels.obstacles,
      "https://i.ibb.co/s9hsrmx/Path-And-Objects.png",
      512,
      512
    );
    this.canvas = document.getElementById("gameArea");
    this.canvas.width = 1024;
    this.canvas.height = 1024;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(this.updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
    document.addEventListener("keydown", this.move);
    document.addEventListener("keyup", this.clearmove);
  }; 

  drawAnimatedObject = (gameObject) =>  {
    this.context.drawImage(
      gameObject.image,
      gameObject.x,
      gameObject.y,
      gameObject.width,
      gameObject.height
    );
  }; 

  move = e => {
    switch (e.key) {
      case "w":
        this.ninja.speedY = -2;
        break;
      case "s":
        this.ninja.speedY = 2;
        break;
      case "a":
        this.ninja.speedX = -2;
        break;
      case "d":
        this.ninja.speedX = 2;
        break;
    }
  };

  clearmove = () => {
    this.ninja.speedX = 0;
    this.ninja.speedY = 0;
  };

  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  
  updateGameArea = () => {
    this.clear();
    this.level.draw(this.context);
    this.ninja.update(this.level.obstaclesVector)
    this.ninja.draw(this.context)
    //this.obstaclesVector = this.level.obstaclesVector;
  };
}