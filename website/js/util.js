buttonNames = { "UpdateAngles": "update angles", "SendAngles": "move to angles", "MoveZero": "move to zero", "moveservo": "move servo", "home": "home", "reset": "reconnect", "enablecontroller": "toggle controller" }

function SetDegOutput(elementName, value) {
  document.getElementById(elementName).innerHTML = value;
  updatePreview();
}
function SetDegRange(elementName, value) {
  document.getElementById(elementName).value = value;
}

function buttonStartLoad(name) {
  document.getElementById("loader").hidden = false;

  if (name == "all") {
    Object.keys(buttonNames).forEach(key => {
      document.getElementById(key).innerHTML = `<i id="loader" class="fa fa-spinner fa-spin"></i> ${buttonNames[key]}`;
    });
  } else {
    document.getElementById(name).innerHTML = `<i id="loader" class="fa fa-spinner fa-spin"></i> ${buttonNames[name]}`;
  }
}
function buttonStopLoad() {

  Object.keys(buttonNames).forEach(key => {
    document.getElementById(key).innerHTML = buttonNames[key];
  });


}

function setDeg(angle0,angle1,angle2,angle3){
  SetDegOutput('BaseAngle', angle0); SetDegRange('baseRange', angle0);
  SetDegOutput('arm1Angle', angle1); SetDegRange('arm1Range', angle1);
  SetDegOutput('arm2Angle', angle2); SetDegRange('arm2Range', angle2);
  SetDegOutput('arm3Angle', angle3); SetDegRange('arm3Range', angle3);
}

function updatePreview(){
  let preview = document.getElementById("preview");
  preview.innerHTML = "";
  let angle0 = document.getElementById("baseRange").value;
  let angle1 = document.getElementById("arm1Range").value;
  let angle2 = document.getElementById("arm2Range").value;
  let angle3 = document.getElementById("arm3Range").value;

  let diplay = (new robotDisplay(angle1, angle2, angle3, 2.5)).draw();

  let angledisp = (new angleDisplay(angle0)).getCanvas();

  preview.appendChild(diplay);
  preview.appendChild(angledisp);
}

function sendAlert(level, text) {
  if (level == "main") {
    document.getElementById("alert").innerHTML = `
    <div id="device-ip" class="alert alert-primary fade show" role="alert"
    style="text-align: center;width: 50%; margin: auto; margin-top: 10px;" >
    ${text}
  </div>
    `;
  } else if (level == "error") {
    document.getElementById("alert-error").innerHTML = `
    <div id="error" style="text-align: center; margin: auto; margin-top: 10px;" class="alert alert-danger fade show"
    role="alert">
    ${text}
    </div>
    `;
    setTimeout(function () { document.getElementById("alert-error").innerHTML = "" }, 10000);
  } else if (level == "succes") {
    document.getElementById("alert-succes").innerHTML = `
    <div id="succes" class="alert alert-success fade show" role="alert"
    style="text-align: center; margin: auto; margin-top: 10px;" >
    ${text}
  </div>
    `;
    setTimeout(function () { document.getElementById("alert-succes").innerHTML = "" }, 3000);
  }

}
function readFile() {
  var file = document.getElementById("file").files[0];
  var reader = new FileReader();
  reader.onload = async function (progressEvent) {
    var lines = this.result.split(/\r\n|\n/);
    console.log(lines);
    for (var line = 0; line < lines.length; line++) {
      console.log(line + ' --> ' + lines[line]);
      await SendCommand(lines[line]);
    }
  };
  reader.readAsText(file);
}


function reset(){
  SendCommand("reset").then((response) => {
  startup();
  });
  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}