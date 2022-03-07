import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Ship from "./Ship.js";

export default class Projectile {
    static VELOCITY = 10;

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
        p5context.fill('white');
        const deltaVec = p5.Vector.fromAngle(p5context.radians(heading));
        p5context.circle(x + deltaVec.x * Ship.HEIGHT, y + deltaVec.y * Ship.HEIGHT, 10);
        p5context.pop();
    }
}