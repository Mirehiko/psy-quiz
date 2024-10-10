export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 5002,
  database: {
    host: process.env.MONGO_URI
  }
});
