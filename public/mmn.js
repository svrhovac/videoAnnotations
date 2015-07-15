function setHeight(){
var visina = window.innerHeight;
document.getElementById("sidebar").style.height = $( document ).height() + "px";
// Alternative: "window.innerHeight"
console.log($( document ).height());
// Loša je praksa da se ponavlja pozivanje jQuery selektora, jer su to vrlo skupe operacije.
// Ako imamo potrebu da "$( document ).height()" koristimo na više od jednog mjesta,
// onda se rezultat tog upita treba smjestiti u varijabli
}

window.addEventListener('DOMContentLoaded', setHeight);
