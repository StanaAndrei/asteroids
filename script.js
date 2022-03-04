import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"
import Ship from "./Ship.js"
import handleInput from "./InputController.js"
let ship;

new p5(p5context => {
    p5context.setup = () => {
        p5context.angleMode(p5context.DEGREES);
        p5context.createCanvas(800,800);
        ship = new Ship(p5context.width / 2, p5context.height / 2, 45);
    }

    p5context.draw = () => {
        p5context.background('black');

        handleInput(p5context, ship);

        ship.draw(p5context);
    }
}, document.querySelector('#canvas'));