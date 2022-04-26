class Writer {
    writeScore(p5context, score) {
        p5context.textSize(20);
        p5context.fill(0, 102, 153);
        p5context.textStyle(p5context.ITALIC);
        p5context.text(`score: ${score}`, 20, 20);
    }
    writeDefeat(p5context) {
        p5context.textSize(50);
        p5context.fill('red');
        p5context.textStyle(p5context.BOLD);
        p5context.text('YOU LOST!', p5context.width / 2.5, p5context.height / 2);
    }
}

const writer = new Writer();
Object.freeze(writer);
export default writer;