const sequencer = new sequence();


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
  buttonStartLoad("UpdateAngles");
  console.log("GETTINGS ANGLES");
  SendCommand("angle;").then((response) => {
    if (response.includes("DONE")) {
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
    } else {
      sendAlert("error",`Bad response from controller: ${response}`);
    }

  }
  );
}
function checkComs() {
  SendCommand("OK;").then((response) => {
    if (response.includes("OK")) {
      console.log("COMS OK");
      return true;
    }
    else {
      console.error("COMS ERROR");

      sendAlert("error",`Bad response from controller: ${response}`);

      return false;
    }
  });
}

function moveToAngles() {
  buttonStartLoad("SendAngles");
  let angle0 = document.getElementById("baseRange").value;
  let angle1 = document.getElementById("arm1Range").value;
  let angle2 = document.getElementById("arm2Range").value;
  let angle3 = document.getElementById("arm3Range").value;
  let command = `sync;${angle1};${angle2};${angle3};${angle0};`
  SendCommand(command).then((response) => {
    if (response.includes("DONE")) {
      sendAlert("succes", "done moving");
      buttonStopLoad();
    }
    else {
      sendAlert("error",`Bad response from controller: ${response}`);
    }
  });
}

function moveToZero() {
  buttonStartLoad("MoveZero");
  let command = `sync;0;0;0;0;`
  SendCommand(command).then((response) => {
    if (response.includes("DONE")) {
      sendAlert("succes", "done moving to zero");
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
    else {
      sendAlert("error",`Bad response from controller: ${response}`);
    }
  });
}

function moveHome() {
  buttonStartLoad("home");
  let command = `home;`
  SendCommand(command).then((response) => {
    if (response.includes("ERROR")) {
      sendAlert("error",`Bad response from controller: ${response}`);
    }
    else {
      sendAlert("succes", "done homing");
      getandSetAngles();
      buttonStopLoad();
      
    }
  });
}

function moveServo() {
  let angle = document.getElementById("servoRange").value;
  let command = `servo;${angle};`;
  SendCommand(command).then((response) => {
    if (response.includes("DONE")) {
      sendAlert("succes", "done moving servo");
      buttonStopLoad();

    }
    else{
      sendAlert("error",`Bad response from controller: ${response}`);
    }
  });
}

function getPower(){
  buttonStartLoad("all");
  command = "power-get;";
  SendCommand(command).then((response) => {
    if (response.includes("DONE")) {
      if(response.includes("1")){
        $('#power').bootstrapToggle('on')
      }
      else {
        $('#power').bootstrapToggle('off')
      }
      sendAlert("succes", "done setting power");
      buttonStopLoad();
      $('#initial-load').modal('hide');
    }
    else{
      sendAlert("error",`Bad response from controller: ${response}`);
    }
  });
}

function power(state){
  buttonStartLoad("all");
  if(state == false){
    command = "power-off;";
    console.log('turning off power');
  } else if (state == true){
    console.log('turning on power');
    console.log(state)
    command = "power-on;";
  }
  SendCommand(command).then((response) => {
    if (response.includes("DONE")) {
      sendAlert("succes", "done setting power");
      buttonStopLoad();
    }
    else{
      sendAlert("error",`Bad response from controller: ${response}`);
    }
  });
}

function startup() {
  document.getElementById("main-page").hidden = false;
  document.getElementById("startup-page").hidden = true;

  $('#initial-load').modal('show');
  buttonStartLoad("all");
  checkComs();
  getandSetAngles();
  getPower();
  

  

}