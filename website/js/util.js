function SetDegOutput(elementName, value) {
  document.getElementById(elementName).innerHTML = value;
}
function SetDegRange(elementName, value) {
  document.getElementById(elementName).value = value;
}

function buttonStartLoad(){
  document.getElementById("UpdateAngles").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i>Loading';
  document.getElementById("loader").hidden = false;

  document.getElementById("SendAngles").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i>Loading';

  document.getElementById("MoveZero").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i>Loading';

  document.getElementById("openServo").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i>Loading';
  document.getElementById("closeServo").innerHTML = '<i id="loader" class="fa fa-spinner fa-spin"></i>Loading';
}
function buttonStopLoad(){
  document.getElementById("UpdateAngles").innerHTML = "update angles";
  document.getElementById("SendAngles").innerHTML = "move to angles";
  document.getElementById("MoveZero").innerHTML = "move to zero";

  document.getElementById("openServo").innerHTML = "open servo";
  document.getElementById("closeServo").innerHTML = "close servo";
}