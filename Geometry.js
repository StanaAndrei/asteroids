export default class Geometry {
    static pointInCircle(px, py, cx, cy, r) {
        return (Math.pow(r, 2) >=
            Math.pow(px - cx, 2) + Math.pow(py - cy, 2)
        )
    }

    static lineInCircle(a, b, c, x, y, radius) {

    }
}