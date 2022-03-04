export default class Ship {
    static HEIGHT = 100;
    static deltaHeading = 1.75;

    constructor(x, y, heading) {
        this.x = x;
        this.y = y;
        this.heading = heading;
    }

    draw(p5context) {
        const { x, y, heading } = this;
        const { HEIGHT } = Ship;

        p5context.push();
        
        p5context.translate(x, y);
        p5context.rotate(heading);

        p5context.noFill();
        p5context.stroke('white');
        p5context.triangle(0, -HEIGHT / 2, -HEIGHT / 4, HEIGHT / 2, HEIGHT / 4, HEIGHT / 2);

        p5context.pop();
    }

    updateHeading(dir) {
        this.heading += dir * Ship.deltaHeading;
    }

    moveForward() {
        //to be continued
    }
}