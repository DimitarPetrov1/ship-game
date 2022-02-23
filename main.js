const screenWidth = document
  .getElementById("screen")
  .getBoundingClientRect().width;
const ship = document.getElementById("ship");
const submarine = document.getElementById("submarine");
const entityWidth = 100;
const water = document.getElementById("water");
let shipX = screenWidth / 2 - entityWidth / 2;
let submarineX = 0;
let shipSpeed = 5;
let submarineSpeed = 1;

ship.style.width = entityWidth + "px";
ship.style.left = shipX + "px";
submarine.style.width = entityWidth + "px";
submarine.style.left = submarineX + "px";

// Ship Torpedo
const shipTorpedo = document.createElement("div");
const shipTorpedoWidth = 10;
shipTorpedo.classList.add("torpedo");
shipTorpedo.style.width = shipTorpedoWidth + "px";

// Moving ship
const moveShip = (e) => {
  setTimeout(() => {
    e.preventDefault();
    if (e.keyCode == 39) {
      shipX = shipX + shipSpeed;
      ship.style.left = shipX + "px";
    } else if (e.keyCode == 37) {
      shipX = shipX - shipSpeed;
      ship.style.left = shipX + "px";
    }
  }, 100);
};

let activeToppedos = [];
let canFire = true;

const shoot = (e) => {
  if (canFire == true) {
    canFire = false;
    if (e.keyCode == 32) {
      water.appendChild(shipTorpedo);
      shipTorpedo.style.left = shipX + entityWidth / 2 + "px";
    }
  }
  setTimeout(() => {
    canFire = true;
  }, 5000);
};

document.addEventListener("keydown", moveShip);
document.addEventListener("keydown", shoot);

// Moving the submarine
let travelLeft = true;
setInterval(() => {
  if (travelLeft === true) {
    if (submarineX + entityWidth >= screenWidth) {
      travelLeft = false;
      return;
    } else {
      submarineX = submarineX + submarineSpeed;
    }
  } else {
    if (submarineX === 0) {
      travelLeft = true;
      return;
    } else {
      submarineX = submarineX - submarineSpeed;
    }
  }
  submarine.style.left = submarineX + "px";
}, 20);
// Checking for hit
setInterval(() => {
  const torpedosPos = document.querySelector(".torpedo");
  console.log("========");
  console.log(torpedosPos.getBoundingClientRect().top);
  console.log(
    submarine.getBoundingClientRect().left,
    submarine.getBoundingClientRect().left + entityWidth
  );
}, 1000);
