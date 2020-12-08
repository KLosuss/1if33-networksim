class Computer {
  constructor(mac, ipv4 = [0, 0, 0, 0], gateway = [0, 0, 0, 0]) {

    this.pos = createVector(0, 0);

    if (ipv4.length !== 4) {
      throw "Ungültige IP länge";
    }

    // Eine Ip sollte als Uint array gespeichert sein, damit die From xxx.xxx.xxx.xxx gegeben ist
    this.ipv4 = ipv4;

    this.host = ipv4[3];
    this.network = ipv4.slice(0, 3);

    this.gateway = gateway;

    // Enthält direkt angeschlossene Geräte
    this.connections = [];

    // For routing
    this.reachedFrom = undefined;
  }

  ping(ip) {
    this.send(ip, "ping");
  }

  receive(ip, message) {
    console.log(this.ipv4.join(".") + " is receiving from: " + ip.join(".") + " message: " + message);
  }

  send(target_ip, message) {

    let routeIPs = [];

    let q = [this];
    let added = []
    let end = undefined;

    do {
      if(q[0].ipv4 === target_ip) {
        end = q[0];
        end.receive(this.ipv4, message);
        break;
      }
      console.log("Checking: " + q[0].ipv4.join("."));
      for (let connection of q[0].connections) {
        if (!added.includes(connection)) {
          q.push(connection);
          connection.reachedFrom = q[0];
          added.push(connection);
        }
      }
      q = q.slice(1, q.length);
    } while (q.length > 0);


    let last = end;
    while (end) {

      stroke(0, 255, 0);
      line(end.pos.x, end.pos.y, last.pos.x, last.pos.y);

      last = end;
      routeIPs.push(end.ipv4);
      let temp = end.reachedFrom;
      end.reachedFrom = undefined;
      end = temp;
    }

    return routeIPs.length > 0;
  }
}
