export default class Asteroid {
    constructor(x, y, diam, heading, speed) {
        this.x = x;
        this.y = y;
        this.diam = diam;
        this.heading = heading;
        this.speed = speed;
    }

    draw(p5context) {
        const { x, y, diam } = this;

        p5context.push();

        p5context.noFill();
        p5context.strokeWeight(4);
        p5context.stroke('grey');
        p5context.circle(x, y, diam);

        p5context.pop();
    }

    update(p5context) {
        const { speed, heading } = this;
        this.x += speed * p5context.cos(heading);
        this.y += speed * p5context.sin(heading);
    }
}