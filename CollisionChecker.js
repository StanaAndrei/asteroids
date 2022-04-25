import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Projectile from "./Projectile.js";
import Geometry from "./Geometry.js";

class CollisionChecker {
    projectileHitAsteroid(projectile, asteroid, p5context) {
        if (projectile == undefined) {
            return;
        }
        const deltaVec = p5.Vector.fromAngle(p5context.radians(projectile.heading));
        const projectileCenterX = projectile.x + Projectile.LEN * deltaVec.x;
        const projectileCenterY = projectile.y + Projectile.WIDTH * deltaVec.y;

        return Geometry.pointInCircle(projectileCenterX, projectileCenterY, asteroid.x, asteroid.y, asteroid.diam / 2);
    }

    asteroidHitShip(asteroid, ship, p5context) {
        const { p1, p2, p3 } = ship.getVertices(p5context);
        let hit = false;

        hit |= Geometry.segInCircle(p1.x, p1.y, p2.x, p2.y, asteroid.x, asteroid.y, asteroid.diam / 2);
        hit |= Geometry.segInCircle(p1.x, p1.y, p3.x, p3.y, asteroid.x, asteroid.y, asteroid.diam / 2);
        hit |= Geometry.segInCircle(p2.x, p2.y, p3.x, p3.y, asteroid.x, asteroid.y, asteroid.diam / 2);

        hit |= Geometry.pointInCircle(p1.x, p1.y, asteroid.x, asteroid.y, asteroid.diam / 2);
        hit |= Geometry.pointInCircle(p2.x, p2.y, asteroid.x, asteroid.y, asteroid.diam / 2);
        hit |= Geometry.pointInCircle(p3.x, p3.y, asteroid.x, asteroid.y, asteroid.diam / 2);

        return hit;
    }
}

const collisionChecker = new CollisionChecker();
Object.freeze(collisionChecker);
export default collisionChecker;