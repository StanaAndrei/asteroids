export default class Asteroid {
    constructor(x, y, diam) {
        this.x = x;
        this.y = y;
        this.diam = diam;
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
}