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
const shipTorpedo = document.createElement("img");
shipTorpedo.src = "./img/torpedo-ship.png";
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

let canFire = true;

const shoot = (e) => {
  if (canFire == true) {
    if (e.keyCode == 32) {
      water.appendChild(shipTorpedo);
      shipTorpedo.style.left = shipX + entityWidth / 2 + "px";
    }
    canFire = false;
  }
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
    if (submarineX <= 0) {
      travelLeft = true;
      return;
    } else {
      submarineX = submarineX - submarineSpeed;
    }
  }
  submarine.style.left = submarineX + "px";
}, 20);
// Checking for submarine hit
setInterval(() => {
  const torpedoPos = document.querySelector(".torpedo");
  let tb = "";

  if (torpedoPos) {
    tb = torpedoPos.getBoundingClientRect().bottom;
  }

  // bottom of submarine - height of submarine
  if (tb >= 530) {
    const sl = submarine.getBoundingClientRect().left;
    const sr = submarine.getBoundingClientRect().right;
    const tl = torpedoPos.getBoundingClientRect().left;
    const tr = torpedoPos.getBoundingClientRect().right;
    if (tl >= sl && tr <= sr) {
      console.log("hit?");
      water.removeChild(shipTorpedo);
      canFire = true;
    }
  }
  if (tb > 550) {
    water.removeChild(shipTorpedo);
    canFire = true;
  }
}, 10);
