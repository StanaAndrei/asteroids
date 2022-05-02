import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"

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

    getVertices(p5context) {
        const { x, y, heading } = this;
        const { HEIGHT } = Ship;
        return {
            p1: {x: x + HEIGHT * p5context.cos(heading), y: y + HEIGHT * p5context.sin(heading)},
            p2: {x: x + (HEIGHT / 4) *  p5context.sin(heading), y: y + (HEIGHT / 4) *  p5context.sin(heading - 90)},
            p3: {x: x + -(HEIGHT / 4) *  p5context.sin(heading), y: y + (HEIGHT / 4) *  p5context.sin(heading + 90)},
        }
    }

    updateHeading(dir) {
        this.heading += dir * Ship.DELTA_HEADING;
        this.heading %= 360;
    }

    moveForward(p5context) {
        const { VELOCITY } = Ship;
        //console.log(this.heading);
        this.#utilMoveForward(p5context, VELOCITY, this.heading);
        //animation
        this.#showFlame(p5context);
    }
    
    #utilMoveForward(p5context, velocity, heading) {
        this.x += velocity * p5context.cos(heading);
        this.y += velocity * p5context.sin(heading);
    }

    #showFlame(p5context) {
        if (Math.random() <= .35) {
            return;
        }

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