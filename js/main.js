function SendCommand(command) {
    return fetch('http://192.168.0.197/command', {
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
    document.getElementById("loader").hidden = false;
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
      document.getElementById("loader").hidden = true;
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

  function startup() {
    checkComs();
    getandSetAngles();
    

  }