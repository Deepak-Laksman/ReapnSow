var amqp = require('amqplib/callback_api');

let ch = null;
amqp.connect("amqp://localhost", function (err, conn) {
   conn.createChannel(function (err, channel) {
    if (err) throw err;
      ch = channel;
   });
});
const publishToQueue = async (queueName, message) => {
   ch.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {persistent: true});
}

module.exports = { publishToQueue }
