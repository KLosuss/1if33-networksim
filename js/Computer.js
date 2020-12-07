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
  }

  ping(ip) {
    this.send(ip, "ping");
  }

  receive(ip, message) {
    console.log(this.ipv4.join(".") + " is receiving from: " + ip.join(".") + " message: " + message);
  }

  send(target_ip, message, sender_ips = []) {
    let bool = false;

    sender_ips.push(this.ipv4);

    if (target_ip === this.ipv4) {

      for (let i = 0; i < sender_ips.length - 1; i++) {
        let p1 = createVector(0, 0);
        for (const computer of computers) {
          if (computer.ipv4 === sender_ips[i]) {
            p1 = computer.pos;
            break;
          }
        }
        for (const computer of computers) {
          if (computer.ipv4 === sender_ips[i + 1]) {
            stroke(0, 255, 0);
            line(p1.x, p1.y, computer.pos.x, computer.pos.y);
            break;
          }
        }


        sender_ips[0];
      }

      this.receive(sender_ips[0], message);
      return true;
    }

    for (let connection of this.connections) {
      if (!sender_ips.includes(connection.ipv4)) {
        bool = connection.send(target_ip, message, sender_ips);
      }
    }
    return bool;
  }
}
