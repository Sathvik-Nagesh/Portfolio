import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      // Stop reconnecting after 3 attempts if Redis is not available
      if (retries > 3) {
        return false;
      }
      return Math.min(retries * 100, 3000);
    },
  },
});

client.on('error', (err) => {
  // Suppress ECONNREFUSED to avoid terminal spam when Redis is missing
  // Only log other errors
  if (err.code !== 'ECONNREFUSED') {
    console.error('Redis Client Error:', err);
  }
});

if (!client.isOpen) {
  client.connect().catch((err) => {
    // Suppress initial connection error if it's ECONNREFUSED
    if (err.code !== 'ECONNREFUSED') {
      console.error('Redis Connection Error:', err);
    }
  });
}

export default client;
