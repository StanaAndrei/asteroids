import Asteroid from "./Asteroid.js";

class WaveCreator {
    static WAVE_NR = 1;

    createWave(asteroids, p5context) {
        for (let i = 0; i < WaveCreator.WAVE_NR; i++) {
            asteroids.push(new Asteroid(
                p5context.random(0, p5context.width),
                p5context.random(0, p5context.height),
                p5context.random(0, 360),
                1.5,
                3
            ));
        }

        WaveCreator.WAVE_NR++;
    }

    getWave() {
        return WaveCreator.WAVE_NR;
    }
}

const waveCreator = new WaveCreator();
Object.freeze(waveCreator);
export default waveCreator;