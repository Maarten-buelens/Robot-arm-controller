function SetDegOutput(elementName, value) {
  document.getElementById(elementName).innerHTML = value;
}
function SetDegRange(elementName, value) {
  document.getElementById(elementName).value = value;
}

function buttonStartLoad(){
  document.getElementById("UpdateAngles").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i> Loading';
  document.getElementById("loader").hidden = false;

  document.getElementById("SendAngles").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i> Loading';

  document.getElementById("MoveZero").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i> Loading';

  document.getElementById("openServo").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i> Loading';
  document.getElementById("closeServo").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i> Loading';
}
function buttonStopLoad(){
  document.getElementById("UpdateAngles").innerHTML = "update angles";
  document.getElementById("SendAngles").innerHTML = "move to angles";
  document.getElementById("MoveZero").innerHTML = "move to zero";

  document.getElementById("openServo").innerHTML = "open servo";
  document.getElementById("closeServo").innerHTML = "close servo";
}

function sendAlert(level, text){
  if(level == "main"){
    document.getElementById("alert").innerHTML = `
    <div id="device-ip" class="alert alert-primary fade show" role="alert"
    style="text-align: center;width: 50%; margin: auto; margin-top: 10px;" >
    ${text}
  </div>
    `;
  } else if(level == "error"){
    document.getElementById("alert-error").innerHTML = `
    <div id="error" style="text-align: center; margin: auto; margin-top: 10px;" class="alert alert-danger fade show"
    role="alert">
    ${text}
    </div>
    `;
  setTimeout(function(){document.getElementById("alert-error").innerHTML = ""}, 10000);
  } else if (level == "succes"){
    document.getElementById("alert-succes").innerHTML = `
    <div id="succes" class="alert alert-success fade show" role="alert"
    style="text-align: center; margin: auto; margin-top: 10px;" >
    ${text}
  </div>
    `;
  setTimeout(function(){document.getElementById("alert-succes").innerHTML = ""}, 3000);
  }

}
function readFile(){
  var file = document.getElementById("file").files[0];
  var reader = new FileReader();
  reader.onload = async function(progressEvent) {
    var lines = this.result.split(/\r\n|\n/);
    console.log(lines);
    for (var line = 0; line < lines.length; line++) {
      console.log(line + ' --> ' + lines[line]);
      await SendCommand(lines[line]);
    }
  };
  reader.readAsText(file);
}


