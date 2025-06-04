import {Engine, Bodies, Composite} from 'matter-js'
import { Application, Assets, Container, Sprite } from 'pixi.js';
import metalTexture from './metal_texture.jpeg'
import bricks from './Bricks2.png'

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
    const container = new Container();
    const containerGround = new Container()
    app.stage.addChild(container);
    app.stage.addChild(containerGround)
    // Load the bunny texture
    
    const texture = await Assets.load(metalTexture);
    const texture2 = await Assets.load(bricks)
    
    //128 x 128
    const bunny = new Sprite(texture);
    container.addChild(bunny);
    // Move the container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    // Center the bunny sprites in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    const groundSprite = new Sprite(texture2)
    containerGround.addChild(groundSprite)
    containerGround.x = 0
    containerGround.y = window.innerHeight - 50

    //Matter.JS
    const engine = Engine.create()
    // const world = engine.world
    const boxBunny = Bodies.rectangle(container.x, container.y,128,128)
    // const ground = Bodies.rectangle(0,window.innerHeight - 50, window.innerWidth,50, {isStatic: true, })


    const ground = Bodies.rectangle(400,window.innerHeight - 30, window.innerWidth,50, {isStatic: true, })
    Composite.add(engine.world, [boxBunny, ground])
    // Composite.add(engine.world, [boxBunny])



    // Listen for animate update
    app.ticker.add((time) =>
    {
        // Continuously rotate the container!
        // * use delta to create frame-independent transform *
        // container.rotation -= 0.01 * time.deltaTime;
        Engine.update(engine)
        container.position.set(boxBunny.position.x, boxBunny.position.y)
    });
})();
