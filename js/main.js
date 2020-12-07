let macRegister = [];
let computers = [];

let computerNum = 10;

function setup() {
  let canvas = createCanvas(600, 600);

  canvas.parent('sketch-holder');

  let givenIPs = [];
  for (let i = 0; i < computerNum; i++) {
    computers.push(createComputer(randomHostIP([192, 168, 0], givenIPs), [192, 168, 0, 1]));

    let x = Math.cos(2 * Math.PI / computerNum * i);
    let y = Math.sin(2 * Math.PI / computerNum * i);

    computers[i].pos = createVector(200 * x + 300, 200 * y + 300);

    givenIPs.push(computers[i].ipv4);
  }

  for (let i = 0; i < computerNum; i++) {

    let num = int(random(computerNum));

    for (let j = 0; j < num; j++) {
      computers[i].connections.push(computers[int(random(computerNum))]);
    }
  }

  rectMode(CENTER);
  frameRate(1);
}

function draw() {
  background(220);
  // draw basic image
  stroke(0);
  for (let computer of computers) {
    for (let connection of computer.connections) {
      line(computer.pos.x, computer.pos.y, connection.pos.x, connection.pos.y);
    }
  }

  stroke(255, 0, 255);
  for (const computer of computers) {
    square(computer.pos.x, computer.pos.y, 20, 5);
    text(computer.ipv4.join("."), computer.pos.x - 40, computer.pos.y - 20);
  }


  let sender = int(random(computerNum));
  let receiver = int(random(computerNum));

  console.log("Send from: " + computers[sender].ipv4.join(".") + " to: " + computers[receiver].ipv4.join("."));

  if (computers[sender].send(computers[receiver].ipv4, "ping")) {
    console.log("success");
  } else {
    console.log("failed");
  }


}


function createComputer(ip = [0, 0, 0, 0], gateway = [0, 0, 0, 0]) {

  let newMac;
  do {
    newMac = [];
    for (let i = 0; i < 6; i++) {
      newMac.push(int(random(0, 255)));
    }
    console.log("Mac of new Computer: " + newMac.join(":"))
  } while (macRegister.includes(newMac))

  macRegister.push(newMac);
  return new Computer(newMac, ip, gateway);
}

function randomHostIP(network, excludedIPs = []) {
  let host;
  do {
    host = int(random(0, 255));
  } while (excludedIPs.includes(host));
  network.push(host);
  return network;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
