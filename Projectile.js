import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Ship from "./Ship.js";

export default class Projectile {
    static VELOCITY = 10;
    static WIDTH = 4;
    static LEN = 20;

    constructor(x, y, heading) {
        this.x = x;
        this.y = y;
        this.heading = heading;
    }

    isOffScreen(p5context) {
        const { x, y } = this;
        return x < 0 || y < 0 || p5context.width < x || p5context.height < y;
    }

    update(p5context) {
        const { VELOCITY } = Projectile;
        this.x += VELOCITY * p5context.cos(this.heading);
        this.y += VELOCITY * p5context.sin(this.heading);
    }

    draw(p5context) {
        const { x, y, heading } = this;

        p5context.push();
        p5context.fill('red');
        const deltaVec = p5.Vector.fromAngle(p5context.radians(heading));
        p5context.translate(x, y);
        p5context.rotate(heading);
        p5context.ellipse(deltaVec.x + Ship.HEIGHT, deltaVec.y, Projectile.LEN, Projectile.WIDTH);
        p5context.pop();
    }
}