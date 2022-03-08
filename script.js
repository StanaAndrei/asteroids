import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Ship from "./Ship.js"
import inputController from "./InputController.js"
import Asteroid from "./Asteroid.js";
import collisionChecker from "./CollisionChecker.js";
let ship;
let projectiles = [];
let asteroids = [];

new p5(p5context => {
    p5context.setup = () => {
        p5context.frameRate(60);
        p5context.angleMode(p5context.DEGREES);
        p5context.createCanvas(window.innerWidth - 15, window.innerHeight - 20);
        ship = new Ship(p5context.width / 2, p5context.height / 2, -45);

        asteroids.push(new Asteroid(100, 100, 0, 1.5, 3));
    }

    p5context.draw = () => {
        p5context.background('black');

        inputController.handleMovement(p5context, ship);

        for (let asteroid of asteroids) {
            asteroid.update(p5context);
        }
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
        for (let asteroid of asteroids) {
            asteroid.draw(p5context);
        }

        for (let idxOfProjectile = 0; idxOfProjectile < projectiles.length; idxOfProjectile++) {
            for (let idxOfAsteroid = 0; idxOfAsteroid < asteroids.length; idxOfAsteroid++) {
                if (collisionChecker.projectileHitAsteroid(projectiles[idxOfProjectile], asteroids[idxOfAsteroid], p5context)) {
                    const { x, y, speed, sizeLvl } = asteroids[idxOfAsteroid];
                    asteroids.splice(idxOfAsteroid, 1);
                    projectiles.splice(idxOfProjectile, 1);
                    if (sizeLvl === 1) {
                        continue;
                    }
                    asteroids.push(new Asteroid(x, y, p5context.random(0, 360), speed * 2, sizeLvl - 1));
                    asteroids.push(new Asteroid(x, y, p5context.random(0, 360), speed * 2, sizeLvl - 1));
                }
            }
        }
    }

    p5context.keyTyped = () => {
        inputController.handleFire(p5context, projectiles, ship);
    }

}, document.querySelector('#canvas'));