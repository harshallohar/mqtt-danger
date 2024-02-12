import mqtt from "mqtt";
import { validateAndFormat } from "./validateAndFormat.mjs";
var fullValue = "";
var sent1 = "";
var sent2 = "";
var total = 1;
var mqttClient;

// Change this to point to your MQTT broker or DNS name
const mqttHost = "91.121.93.94";
const protocol = "mqtt";
const port = "1883";
// const port = "8883";

export function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  // const hostURL = `${protocol}://${mqttHost}:${port}`;
  // const hostURL = "mqtt://broker.hivemq.com";
  mqttClient = mqtt.connect(`mqtt://${mqttHost}`, {
    port: port, // Default MQTT port
    keepalive: 60,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    clientId: clientId, // MQTT client ID from HiveMQ Cloud
  });

  // const hostURL = `mqtt://${mqttHost}`;
  const options = {
    keepalive: 60,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

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
    // let array = JSOmessage.toString()))
    fullValue = fullValue + message.toString();
    // console.log(fullValue.length);

    // console.log(
    //   "Received Message: " + message.toString() + "\nOn topic: " + topic
    //   );
    if (total == 1) {
      sent1 = message.toString();
      // console.log(sent1);
      total++;
      if (
        fullValue.charAt(0) == "{" &&
        fullValue.charAt(fullValue.length - 1) == "}"
      ) {
        // console.log("value matched");
        console.log(fullValue);
        validateAndFormat(JSON.parse(fullValue));
        fullValue = "";
        total = 1;
      }
    }
    console.log(total);
    if (total == 2) {
      sent2 = message.toString();
      // console.log(sent2);
      // console.log(fullValue);
      if (
        fullValue.charAt(0) == "{" &&
        fullValue.charAt(fullValue.length - 1) == "}"
      ) {
        // console.log("value matched");
        console.log(fullValue);
        validateAndFormat(JSON.parse(fullValue));
        fullValue = "";
        total = 1;
      } else {
        if (sent2.charAt(0) === "{") {
          // console.log("unmatched");
          // console.log(sent2);
          fullValue = sent2;
          total = 2;
        }
        // else{
        //   fullValue = "";
        //   total = 1;
        // }
      }
    }
  });
}

export function subscribeToTopic(topic) {
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
}

// connectToBroker();
// subscribeToTopic("esp/98765");
