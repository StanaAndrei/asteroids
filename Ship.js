import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"

export default class Ship {
    static HEIGHT = 65;
    static DELTA_HEADING = 1.35;
    static MAX_SPEED = 5;


    constructor(x, y, heading) {
        this.x = x;
        this.y = y;
        this.heading = heading;
        this.velocityDir = null;
        this.engineOn = false;
        this.momentumVector = { value: 0, heading: this.heading };
        this.speed = 0;
    }

    draw(p5context) {
        const { x, y, heading } = this;
        const { HEIGHT } = Ship;

        //p5context.circle(x, y, 10);//center


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

    isOffScreen(p5context) {
        const pointOut = ({ x, y }) => !(0 <= x && x <= p5context.width && 0 <= y && y <= p5context.height);

        const { p1, p2, p3 } = this.getVertices(p5context);
        if (pointOut(p1) && pointOut(p2) && pointOut(p3)) {
            return true;
        }
        return false;
    }

    getVertices(p5context) {
        const { x, y, heading } = this;
        const { HEIGHT } = Ship;
        return {
            p1: { x: x + HEIGHT * p5context.cos(heading), y: y + HEIGHT * p5context.sin(heading) },
            p2: { x: x + (HEIGHT / 4) * p5context.sin(heading), y: y + (HEIGHT / 4) * p5context.sin(heading - 90) },
            p3: { x: x - (HEIGHT / 4) * p5context.sin(heading), y: y + (HEIGHT / 4) * p5context.sin(heading + 90) },
        }
    }

    updateHeading(dir) {
        this.heading += dir * Ship.DELTA_HEADING;
        this.heading %= 360;
    }

    increaseSpeed() {
        this.velocityDir = this.heading;
        this.engineOn = true;
        this.speed = Math.min(Ship.MAX_SPEED, this.speed + .05);
    }

    decreaseSpeed() {
        this.engineOn = false;
        this.speed = Math.max(0, this.speed - .02);
    }

    applyVelocity(p5context) {
        this.#utilMoveForward(p5context, this.speed, this.velocityDir);
        //animation
        if (this.engineOn) {
            this.#showFlame(p5context);
        }
    }

    #utilMoveForward(p5context, MAX_SPEED, heading) {
        this.x += MAX_SPEED * p5context.cos(heading);
        this.y += MAX_SPEED * p5context.sin(heading);
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