import {Engine, Bodies, Composite, Mouse, MouseConstraint} from 'matter-js'
import { Application, Assets, Container, Sprite } from 'pixi.js';
import metalTextureImg from './metal_texture.jpeg'
import bricksTextureImg from './Bricks2.png'

(async () =>
{
  const canvas1 = document.getElementById('canvas1')
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window, canvas: canvas1 });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Create and add a container to the stage
    const boxContainer = new Container();
    const containerGround = new Container()
    app.stage.addChild(boxContainer);
    app.stage.addChild(containerGround)
    // Load the bunny texture
    
    const metalTexture = await Assets.load(metalTextureImg);
    const floorTexture = await Assets.load(bricksTextureImg)
    
    const boxSprite = new Sprite(metalTexture);
    boxContainer.addChild(boxSprite);
    // Move the container to the center
    boxContainer.x = app.screen.width / 2;
    boxContainer.y = app.screen.height / 2;
    // Center the bunny sprites in local container coordinates
    boxContainer.pivot.x = boxContainer.width / 2;
    boxContainer.pivot.y = boxContainer.height / 2;

    const groundSprite = new Sprite(floorTexture)
    containerGround.addChild(groundSprite)
    containerGround.x = 0
    containerGround.y = window.innerHeight - 50

    
    //Matter.JS
    const engine = Engine.create()
    const boxBody = Bodies.rectangle(boxContainer.x, boxContainer.y,128,128)
    const groundBody = Bodies.rectangle(400,window.innerHeight - 30, window.innerWidth,50, {isStatic: true, })
    
    const mouse = Mouse.create(app.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      // constraint: {
      //   render: {
      //     visible: false,
      //   }
      // }
    })

    Composite.add(engine.world, [boxBody, groundBody, mouseConstraint])

    // Listen for animate update
    app.ticker.add((time) =>
    {
        // Continuously rotate the container!
        // * use delta to create frame-independent transform *
        // container.rotation -= 0.01 * time.deltaTime;
        Engine.update(engine)
        boxContainer.position.set(boxBody.position.x, boxBody.position.y)
    });
})();
