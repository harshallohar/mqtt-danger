import { connectToBroker, subscribeToTopic } from "./subscriber.mjs";

connectToBroker();
// topic
subscribeToTopic("esp/98765");