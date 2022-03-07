import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Projectile from "./Projectile.js";

class CollisionChecker {
    projectileHitAsteroid(projectile, asteroid, p5context) {
        const deltaVec = p5.Vector.fromAngle(p5context.radians(projectile.heading));
        const projectileCenterX = projectile.x + Projectile.LEN * deltaVec.x;
        const projectileCenterY = projectile.y + Projectile.WIDTH * deltaVec.y;

        return (Math.pow(asteroid.diam / 2 /*delta to solve collision errors*/ + (7 / 100) * asteroid.diam, 2) >= 
            Math.pow(projectileCenterX - asteroid.x, 2) + Math.pow(projectileCenterY - asteroid.y, 2)
        )      
    }
}

const collisionChecker = new CollisionChecker();
Object.freeze(collisionChecker);
export default collisionChecker;