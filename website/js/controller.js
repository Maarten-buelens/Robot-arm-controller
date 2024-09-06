class controllerClass{

    constructor() {
        this.enabled = false;
        this.connected = false;
        this.looprun;
    }

    enable(){
        this.enabled = true
        document.getElementById("controllerEnable").innerHTML = '<a style="color: green;">enabled</a>'
        requestAnimationFrame(loop);
    }

    async disable(){
        this.enabled = false
        document.getElementById("controllerEnable").innerHTML = '<a style="color: red;">not enabled</a>'
        await getandSetAngles()
    }
    async toggle(){
        if(this.enabled){
            await this.disable()
        } else {
            this.enable()
        }
    }


}

async function loop(){
    
    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];
    try{
    if (gp.buttons[0].pressed) {
        controller.toggle();
        await sleep(1000);
    }

    if(controller.enabled){
    //stick 1 right
    if(gp.axes[0] > 0.6){
        let element = document.getElementById("baseRange")
        let value = Number(element.value)
        element.value = value + 0.5;
        //await moveToAngles();
        SetDegOutput('BaseAngle', element.value); SetDegRange('baseRange', element.value);
        await sleep(50)
    }
    //stick 1 left
    if(gp.axes[0] < -0.6){
        let element = document.getElementById("baseRange")
        let value = Number(element.value)
        element.value = value - 0.5;
        //await moveToAngles();
        SetDegOutput('BaseAngle', element.value); SetDegRange('baseRange', element.value);
        await sleep(50)
    } 
    //#########################################################
    if(gp.axes[1] > 0.6){
        let element = document.getElementById("arm1Range")
        let value = Number(element.value)
        element.value = value - 0.5;
        //await moveToAngles();
        SetDegOutput('arm1Angle', element.value); SetDegRange('arm1Range', element.value);
        await sleep(50)
    }
    if(gp.axes[1] < -0.6){
        let element = document.getElementById("arm1Range")
        let value = Number(element.value)
        element.value = value + 0.5;
        //await moveToAngles();
        SetDegOutput('arm1Angle', element.value); SetDegRange('arm1Range', element.value);
        await sleep(50)
    }
    //#########################################################
    if(gp.axes[2] > 0.6){
        let element = document.getElementById("arm2Range")
        let value = Number(element.value)
        element.value = value + 0.5;
        //await moveToAngles();
        SetDegOutput('arm2Angle', element.value); SetDegRange('arm2Range', element.value);
        await sleep(50)
    }
    if(gp.axes[2] < -0.6){
        let element = document.getElementById("arm2Range")
        let value = Number(element.value)
        element.value = value - 0.5;
        //await moveToAngles();
        SetDegOutput('arm2Angle', element.value); SetDegRange('arm2Range', element.value);
        await sleep(50)
    }
    //#########################################################
    if(gp.axes[3] > 0.6){
        let element = document.getElementById("arm3Range")
        let value = Number(element.value)
        element.value = value - 0.5;
        //await moveToAngles();
        SetDegOutput('arm3Angle', element.value); SetDegRange('arm3Range', element.value);
        await sleep(50)
    }
    if(gp.axes[3] < -0.6){
        let element = document.getElementById("arm3Range")
        let value = Number(element.value)
        element.value = value + 0.5;
        //await moveToAngles();
        SetDegOutput('arm3Angle', element.value); SetDegRange('arm3Range', element.value);
        await sleep(50)
    }
    }
} catch(e){
    console.error(e);
    await sleep(100);
}
    controller.looprun = requestAnimationFrame(loop);
    
}