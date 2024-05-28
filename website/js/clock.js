class angleDisplay {

    constructor(angleDegrees) {
        this.angleDegrees = angleDegrees;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 70;
        this.canvas.height = 70;
        this.ctx = this.canvas.getContext('2d');
        this.radius = this.canvas.width / 2;
        this.ctx.translate(this.radius, this.radius); // Move to the center of the canvas
        this.clockRadius = this.radius * 0.9; // Adjust for clock face

        this.drawClock();
    }

    drawClockFace() {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.clockRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Draw the clock numbers
        this.ctx.font = '24px Arial';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
       /* for (let num = 1; num <= 12; num++) {
            const angle = num * Math.PI / 6;
            const x = this.clockRadius * 0.85 * Math.cos(angle);
            const y = this.clockRadius * 0.85 * Math.sin(angle);
            this.ctx.fillText(num.toString(), x, y);
        }*/
    }

    drawHand(angle, length, width, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(0, 0);
        this.ctx.rotate(angle);
        this.ctx.lineTo(0, -length);
        this.ctx.stroke();
        this.ctx.rotate(-angle);
    }

    drawClock() {
        const angleRadians = this.angleDegrees * Math.PI / 180;
        this.drawClockFace();
        this.drawHand(angleRadians, this.clockRadius * 0.7, 6, 'red'); // Hour hand for angle
    }

    getCanvas() {
        return this.canvas;
    }
}
