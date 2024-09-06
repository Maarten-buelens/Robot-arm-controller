class robotDisplay {
    constructor(angle1, angle2, angle3, scale = 1) {
        //settings
        this.angle1 = angle1;
        this.angle2 = angle2;
        this.angle3 = angle3;

        this.scale = scale;

        this.L1 = 20 * this.scale;
        this.L2 = 20 * this.scale;
        this.L3 = 20 * this.scale;

        this.w = (this.L1 + this.L2 + this.L3) * 2 + 10;
        this.h = (this.L1 + this.L2 + this.L3) * 1.5 + 30;

        this.canvas = document.createElement("canvas");

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.ctx = this.canvas.getContext("2d");
    }

    drawLine(x, y, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(x, y);
        this.ctx.lineWidth = 4 * this.scale;
        this.ctx.stroke();
    }

    deg2rad(degrees) {
        return degrees * (Math.PI / 180);
    }

    resetOriginArm() {
        //resets origin to top left then to center
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(this.w / 2, this.h - this.L1 * 2);
    }

    draw() {


        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.translate(this.w / 2, this.h - this.L1 * 2);

        // Base circle
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.strokeStyle = "black";
        this.ctx.arc(0, 0, 2 * this.scale, 0, 2 * Math.PI);
        this.ctx.stroke();

        // FIRST ARM
        let arm1x = Math.sin(this.deg2rad(this.angle1)) * this.L1;
        let arm1y = -Math.cos(this.deg2rad(this.angle1)) * this.L1;

        this.drawLine(arm1x, arm1y, "green");
        this.ctx.beginPath();
        this.ctx.arc(arm1x, arm1y, 2 * this.scale, 0, 2 * Math.PI);
        this.ctx.stroke();

        // SECOND ARM
        this.ctx.translate(arm1x, arm1y);
        this.ctx.rotate(this.deg2rad(this.angle1));

        let arm2x = Math.sin(this.deg2rad(this.angle2)) * this.L2;
        let arm2y = -Math.cos(this.deg2rad(this.angle2)) * this.L2;

        this.drawLine(arm2x, arm2y, "red");
        this.ctx.beginPath();
        this.ctx.arc(arm2x, arm2y, 2 * this.scale, 0, 2 * Math.PI);
        this.ctx.stroke();

        // THIRD ARM
        this.ctx.translate(arm2x, arm2y);
        this.ctx.rotate(this.deg2rad(this.angle2));

        let arm3x = Math.sin(this.deg2rad(this.angle3)) * this.L3;
        let arm3y = -Math.cos(this.deg2rad(this.angle3)) * this.L3;

        this.drawLine(arm3x, arm3y, "blue");
        this.ctx.beginPath();
        this.ctx.arc(arm3x, arm3y, 2 * this.scale, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        return this.canvas;
    }
}