import Projectile from "./Projectile.js";

class InputController {

    handleMovement(p5context, ship) {
        const {
            LEFT_ARROW,
            RIGHT_ARROW,
            UP_ARROW
        } = p5context;

        if (p5context.keyIsDown(LEFT_ARROW)) {
            ship.updateHeading(-1);
        } else if (p5context.keyIsDown(RIGHT_ARROW)) {
            ship.updateHeading(1);
        } else if (p5context.keyIsDown(UP_ARROW)) {
            ship.moveForward(p5context);
        }
    }

    handleFire(p5context, projectiles, ship) {
        //SPACE is typed
        if (p5context.keyCode !== 32) {
            return;
        }

        p5context.push();
        projectiles.push(new Projectile(ship.x, ship.y, ship.heading));

        p5context.pop();
    }
}

const inputController = new InputController();
Object.freeze(inputController);
export default inputController;