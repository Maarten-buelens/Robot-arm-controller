function SendCommand(command) {
    return fetch(`http://${deviceIp}/command`, {
      method: 'POST',
      body: JSON.stringify({
        command: command,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((response) => response.text());
  }
  function getandSetAngles() {
    buttonStartLoad();
    console.log("GETTINGS ANGLES");
    SendCommand("angle;").then((response) => {
      console.log("Get angle: " + response);
      angles = response;
      angle0 = angles.split(";")[1];
      angle1 = angles.split(";")[2];
      angle2 = angles.split(";")[3];
      angle3 = angles.split(";")[4];
      SetDegOutput('BaseAngle', angle0); SetDegRange('baseRange', angle0);
      SetDegOutput('arm1Angle', angle1); SetDegRange('arm1Range', angle1);
      SetDegOutput('arm2Angle', angle2); SetDegRange('arm2Range', angle2);
      SetDegOutput('arm3Angle', angle3); SetDegRange('arm3Range', angle3);
      buttonStopLoad();
    });
  }
  function checkComs() {
    SendCommand("OK;").then((response) => {
      if (response.includes("OK")) {
        console.log("COMS OK");
        return true;
      }
      else {
        console.error("COMS ERROR");
        return false;
      }
    });
  }

  function moveToAngles(){
    buttonStartLoad();
    let angle0 = document.getElementById("baseRange").value;
    let angle1 = document.getElementById("arm1Range").value;
    let angle2 = document.getElementById("arm2Range").value;
    let angle3 = document.getElementById("arm3Range").value;
    let command = `sync;${angle1};${angle2};${angle3};${angle0};`
    SendCommand(command).then((response) => {
      if (response.includes("DONE")) {
        document.getElementById("succes").innerHTML = "DONE MOVING";
        document.getElementById("succes").hidden = false;
        setTimeout(document.getElementById("succes").hidden = true, 2000);
        buttonStopLoad();
      }
    });
  }

  function moveToZero(){
    buttonStartLoad();
    let command = `sync;0;0;0;0;`
    SendCommand(command).then((response) => {
      if (response.includes("DONE")) {
        document.getElementById("succes").innerHTML = "DONE MOVING";
        document.getElementById("succes").hidden = false;
        setTimeout(document.getElementById("succes").hidden = true, 2000);
        angle0 = 0;
        angle1 = 0;
        angle2 = 0;
        angle3 = 0;
        SetDegOutput('BaseAngle', angle0); SetDegRange('baseRange', angle0);
        SetDegOutput('arm1Angle', angle1); SetDegRange('arm1Range', angle1);
        SetDegOutput('arm2Angle', angle2); SetDegRange('arm2Range', angle2);
        SetDegOutput('arm3Angle', angle3); SetDegRange('arm3Range', angle3);
        buttonStopLoad();
      }
    });
  }
  function moveServo(dir){
    buttonStartLoad();
    if(dir == 'open'){
      var command = `servo;0;`
    } else if(dir == 'close'){
      var command = `servo;180;`
    } else{
      console.error("invlid servo dir")
    }
    
    SendCommand(command).then((response) => {
      if (response.includes("DONE")) {
        document.getElementById("succes").innerHTML = "DONE MOVING";
        document.getElementById("succes").hidden = false;
        setTimeout(document.getElementById("succes").hidden = true, 2000);
        buttonStopLoad();
      }
    });
  }
  function startup() {
    document.getElementById("main-page").hidden = false;
    document.getElementById("startup-page").hidden = true;

    buttonStartLoad();
    checkComs();
    getandSetAngles();
    

  }