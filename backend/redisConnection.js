const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
    console.log(err);
})

module.exports = redisClient;