import Typesense from 'typesense';
import dotenv from 'dotenv';
dotenv.config();

// Create Typesense client instance
export const client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http'
    }
  ],
  apiKey: process.env.TYPESENSE_API_KEY
});
