buttonNames = { "UpdateAngles": "update angles", "SendAngles": "move to angles", "MoveZero": "move to zero", "moveservo": "move servo", "home": "home", "reset": "reconnect" }

function SetDegOutput(elementName, value) {
  document.getElementById(elementName).innerHTML = value;
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