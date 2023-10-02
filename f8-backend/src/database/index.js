const fastify = require('fastify')();
const fastifyMongoDB = require('fastify-mongodb');

fastify.register(fastifyMongoDB, {
  url: process.env.MONGO_URI, // Replace with your MongoDB connection string
});