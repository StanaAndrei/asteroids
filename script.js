import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Ship from "./Ship.js"
import inputController from "./InputController.js"
import Asteroid from "./Asteroid.js";
import collisionChecker from "./CollisionChecker.js";
import waveCreator from "./WaveCreator.js";
import writer from "./Writer.js";
let ship;
let projectiles = [];
let asteroids = [];
let score = 0;
let lastOFSCheck = Number.NEGATIVE_INFINITY;
const DELTA_FRAMES = 100;

new p5(p5context => {
    p5context.setup = () => {
        p5context.frameRate(60);
        p5context.angleMode(p5context.DEGREES);
        p5context.createCanvas(window.innerWidth - 15, window.innerHeight - 20);
        
        ship = new Ship(p5context.width / 2, p5context.height / 2, 0);
    }
    
    p5context.draw = () => {
        p5context.background('black');
        
        if (!asteroids.length) {
            waveCreator.createWave(asteroids, p5context);
        }

        inputController.handleMovement(p5context, ship);

        for (let asteroid of asteroids) {
            asteroid.update(p5context);
            const offScreenOnAxis = asteroid.offScreenOnAxis(p5context);
            if (offScreenOnAxis === 'x') {
                const sign = Math.sign(asteroid.x);
                asteroid.x += -sign * (p5context.width + asteroid.diam);
            } else if (offScreenOnAxis === 'y') {
                const sign = Math.sign(asteroid.y);
                asteroid.y += -sign * (p5context.height + asteroid.diam);
            }
        }

        for (let it in projectiles) {
            projectiles[it].update(p5context);
            if (projectiles[it].isOffScreen(p5context)) {
                projectiles.splice(it, 1);
            }
        }

        
        if (p5context.frameCount > lastOFSCheck + DELTA_FRAMES && ship.isOffScreen(p5context)) {
            lastOFSCheck = p5context.frameCount;
            //div 1.5 to be faster
            if (ship.x < 0) {
                ship.x = p5context.width + Ship.HEIGHT / 1.5;
            } else if (ship.x > p5context.width) {
                ship.x = -Ship.HEIGHT / 1.5;
            }
            if (ship.y < 0) {
                ship.y = p5context.height + Ship.HEIGHT / 1.5;
            } else if (ship.y > p5context.height) {
                ship.y = -Ship.HEIGHT / 1.5;
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
                    
                    score += asteroids[idxOfAsteroid].getScore();

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

        ship.applyVelocity(p5context);

        for (let asteroid of asteroids) {
            if (collisionChecker.asteroidHitShip(asteroid, ship, p5context)) {
                //console.log('die');
                writer.writeScore(p5context, score);
                writer.writeDefeat(p5context);
                p5context.noLoop();
                return;
            }
        }//*/

        writer.writeScore(p5context, score);
        //debug
        
    }

    p5context.keyTyped = () => {
        inputController.handleFire(p5context, projectiles, ship);
    }
}, document.querySelector('#canvas'));