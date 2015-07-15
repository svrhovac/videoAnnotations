function setHeight(){
var visina = window.innerHeight;
document.getElementById("sidebar").style.height = $( document ).height() + "px";
console.log($( document ).height());
}

window.addEventListener('DOMContentLoaded', setHeight);