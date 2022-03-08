export default class Asteroid {
    static MIN_DIAM = 100 / 3;

    constructor(x, y, heading, speed, sizeLvl) {
        this.x = x;
        this.y = y;
        this.diam = Asteroid.MIN_DIAM * sizeLvl;
        this.heading = heading;
        this.speed = speed;
        this.sizeLvl = sizeLvl;
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