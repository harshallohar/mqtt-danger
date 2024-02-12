import mqtt from "mqtt";
var mqttClient;

// Change this to point to your MQTT broker or DNS name
// const mqttHost = "192.168.100.22";
const mqttHost = "91.121.93.94";
// const mqttHost = "bae100170f964cd3acdb7d0a085e99f9.s2.eu.hivemq.cloud";
const protocol = "mqtt";
// const port = "1883";
const port = "1883";

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  const hostURL = `${protocol}://${mqttHost}:${port}`;
  //   const hostURL = "mqtt://broker.hivemq.com";

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  // let options = {
  //   host: "bae100170f964cd3acdb7d0a085e99f9.s2.eu.hivemq.cloud",
  //   port: 8883,
  //   protocol: "mqtts",
  //   username: "hivemq.webclient.1689596757136",
  //   password: "3L6Am2Zqd,@uPh;NQy9*",
  // };

  mqttClient = mqtt.connect(hostURL, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // Received Message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

function publishMessage(topic, message) {
  console.log(`Sending Topic: ${topic}, Message: ${message}`);
  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
}

connectToBroker();
let value = {
  pic: "123456789",
  Date: ["2023-07-20"],
  Time: ["11:03:10"],
  v0: [
    1.445, 1.06, 1.52, 1.829,1.982, 1.979, 1.821, 1.507, 1.445, 1.06,
  ],
  v1: [4.12, 4.32, 4.15, 4.88, 4.0, 4.99, 4.65, 4.24, 4.23, 4.89],
  v2: [9.23, 9.02, 9.0, 9.01, 9.55, 9.78, 9.99, 9.66, 9.88, 9.34 ],
  v3: [2.23, 2.09, 2.05, 2.99, 2.0, 2.12, 2.34, 2.56, 2.09, 2.02 ],
  v4: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  v5: [0.23, 0.45, 0.12, 0.3, 0.59, 0.1, 2.32, 1.23, 3.03, 1.23],
  v6: [1.23, 1.45, 1.12, 1.3, 1.59, 1.1, 1.32, 1.23, 1.03, 1.09],
  v7: [3.23, 3.45, 3.12, 3.3, 3.59, 3.1, 3.32, 3.23, 3.99, 3.23],
  v8: [4.23, 4.45, 4.12, 4.3, 4.59, 4.1, 4.32, 4.23, 4.03, 4.23],
  v9: [5.23, 5.45, 5.12, 5.3, 5.59, 5.1, 5.32, 5.23, 5.03, 5.23],
  v10: [6.23, 6.45, 6.12, 6.3, 6.59, 6.1, 6.32, 6.23, 6.03, 6.23],
  v11: [7.23, 7.45, 7.12, 7.3, 7.59, 7.1, 7.32, 7.23, 7.03, 7.23],
  v12: [8.23, 8.45, 8.12, 8.3, 8.59, 8.1, 8.32, 8.23, 8.03, 8.23],
  v13: [9.23, 9.45, 9.12, 9.3, 9.59, 9.1, 9.32, 9.23, 9.03, 9.23],
  v14: [10.23, 10.45, 10.12, 10.3, 10.59, 10.1, 12.32, 11.23, 13.03, 11.23],
  v15: [20.23, 20.45, 20.12, 20.3, 20.59, 20.1, 22.32, 21.23, 23.03, 21.23],
  v16: [30.23, 30.45, 30.12, 30.3, 30.59, 30.1, 32.32, 31.23, 33.03, 31.23],
  v17: [40.23, 40.45, 40.12, 40.3, 40.59, 40.1, 42.32, 41.23, 43.03, 41.23],
  v18: [50.23, 50.45, 50.12, 50.3, 50.59, 50.1, 52.32, 51.23, 53.03, 51.23],
  v19: [60.23, 60.45, 60.12, 60.3, 60.59, 60.1, 62.32, 61.23, 63.03, 61.23],
};
publishMessage("esp/98765", JSON.stringify(value));
// let val = JSON.stringify(value);
// let sub = val.slice(0, 604)
// console.log(sub.length)
// publishMessage("esp3/98765",sub);
// sub = val.slice(604, 1208)
// console.log(sub.length)
// publishMessage("esp3/98765",sub);
// let sub = val.slice(604, 1208)
// console.log(sub.length)
// publishMessage("esp3/98765",sub);
// let sub = val.slice(0, 604)
// console.log(sub.length)
// publishMessage("esp/98765",sub);
// sub = val.slice(604, 1208)
// console.log(sub.length)
// publishMessage("esp/98765",sub);