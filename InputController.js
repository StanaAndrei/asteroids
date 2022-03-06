class InputController {
    handleInput(p5context, ship) {
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
}

const inputController = new InputController();
Object.freeze(inputController);
export default inputController;