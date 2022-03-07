export default class Ship {
    static HEIGHT = 65;
    static DELTA_HEADING = 1.35;
    static VELOCITY = 1.75;

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
        //p5context.circle(HEIGHT, 0, 10);

        p5context.noFill();
        p5context.stroke('white');
        p5context.triangle(HEIGHT, 0, 0, HEIGHT / 4, 0, -HEIGHT / 4);//
        //p5context.line(0, 0, HEIGHT, 0);

        p5context.pop();
    }

    updateHeading(dir) {
        this.heading += dir * Ship.DELTA_HEADING;
        this.heading %= 360;
    }

    moveForward(p5context) {
        const { VELOCITY } = Ship;
        //console.log(this.heading);
        this.x += VELOCITY * p5context.cos(this.heading);
        this.y += VELOCITY * p5context.sin(this.heading);
        //animation
        this.#showFlame(p5context);
    }

    #showFlame(p5context) {
        const { HEIGHT } = Ship;
        p5context.push();

        const { x, y, heading } = this;
        p5context.translate(x, y);
        p5context.rotate(heading);

        p5context.fill('yellow');
        p5context.stroke('red');
        p5context.triangle(-HEIGHT / 4, 0, 0, HEIGHT / 6, 0, -HEIGHT / 6);
        
        p5context.pop();
    }
}