import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Ship from "./Ship.js"
import inputController from "./InputController.js"
let ship;
let projectiles = [];

new p5(p5context => {
    p5context.setup = () => {
        p5context.angleMode(p5context.DEGREES);
        p5context.createCanvas(window.innerWidth - 15, window.innerHeight - 20);
        ship = new Ship(p5context.width / 2, p5context.height / 2, -0);
    }

    p5context.draw = () => {
        p5context.background('black');

        inputController.handleMovement(p5context, ship);

        for (let it in projectiles) {
            projectiles[it].update(p5context);
            if (projectiles[it].isOffScreen(p5context)) {
                projectiles.splice(it, 1);
            }
        }

        ship.draw(p5context);
        for (const projectile of projectiles) {
            projectile.draw(p5context);
        }
    }

    p5context.keyTyped = () => {
        inputController.handleFire(p5context, projectiles, ship);
    }
    
}, document.querySelector('#canvas'));