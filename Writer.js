class Writer {
    writeScore(p5context, score) {
        p5context.textSize(20);
        p5context.fill(0, 102, 153);
        p5context.textStyle(p5context.BOLD);
        p5context.text(`score: ${score}`, 20, 20);
    }
}

const writer = new Writer();
Object.freeze(writer);
export default writer;