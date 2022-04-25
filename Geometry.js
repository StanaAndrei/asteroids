export default class Geometry {
    static triangleArea(m) {
        for (let i = 0; i < 3; i++) {
            m[i].push(1);
        }
        let det = 0;
    
        det += m[0][0] * m[1][1] * m[2][2];
        det += m[0][2] * m[1][0] * m[2][1];
        det += m[2][0] * m[0][1] * m[1][2];
    
        det -= m[0][2] * m[1][1] * m[2][0];
        det -= m[0][0] * m[1][2] * m[2][1];
        det -= m[2][2] * m[0][1] * m[1][0];
    
        return Math.abs(det) / 2;
    }

    static pointInCircle(px, py, cx, cy, r) {
        return (Math.pow(r, 2) >=
            Math.pow(px - cx, 2) + Math.pow(py - cy, 2)
        )
    }

    static segInCircle(x1, y1, x2, y2, x, y, radius) {
        if (!((Math.min(x1, x2) <= x && x <= Math.max(x1, x2)) && (Math.min(y1, y2) <= y && y <= Math.max(y1, y2)))) {
            return false;
        }
        const areaOfTr = Geometry.triangleArea([[x1, y1], [x2, y2], [x, y]]);
        const base = Math.hypot(x2 - x1, y2 - y1);
        const dis = 2 * areaOfTr / base;
        //console.log(dis);
        return dis <= radius;
    }
}