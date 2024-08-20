import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();
const port = 3000;

// Importing and Initializing Connections
import { client } from './connection/typesenseConnection.js';
import { connectToDatabase } from './connection/mongooseConnection.js';

// Imporing and Initializing TypeSense Collection
import { createCollection } from './models/blogModel.js';
createCollection(client);

// Importing Routes and Controllers
import { importDataToTypesense } from './controllers/importDataController.js';
import { createBlog } from './controllers/createBlogController.js';
import { getAllBlogs } from './controllers/getAllBlogsController.js';
import { searchBlog } from './controllers/searchBlogController.js';
import { searchParticularBlog } from './controllers/searchParticularBlogController.js';
import authRouter from './routes/authRoute.js';

// Middlewares
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5174'  // Or 'http://localhost:5173', whichever port is working
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Endpoints
app.post('/import', (req, res) => importDataToTypesense(req, res, client));
app.get('/search', (req, res) => searchBlog(req, res, client));
app.post('/create', (req, res) => createBlog(req, res, client));
app.get('/all', (req, res) => getAllBlogs(req, res, client));
app.get('/searchBlog/:id', (req, res) => searchParticularBlog(req, res, client));

// Endpoint Middleware for Authentication
app.use('/api/auth', authRouter);

// Connect to MongoDB and then start the server
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database. Server not started.');
});





































// const fs = require('fs');
// const Typesense = require('typesense');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize Typesense client
// const client = new Typesense.Client({
//   nodes: [
//     {
//       host: 'localhost',
//       port: 8108,
//       protocol: 'http'
//     }
//   ],
//   apiKey: 'abcd1234-efgh-5678-ijkl-9012mnopqrst'
// });

// // Create collection function
// const createCollection = async () => {
//   try {
//     await client.collections().create({
//       name: 'finalBlog',
//       fields: [
//         { name: 'id', type: 'string' }, // Changed to 'string'
//         { name: 'author', type: 'string' },
//         { name: 'title', type: 'string' },
//         { name: 'content', type: 'string' },
//         { name: 'published_at', type: 'int64' },
//         { name: 'ratings', type: 'float' },
//         { name: 'tags', type: 'string[]' },
//         { name: 'views', type: 'int32' },
//         { name: 'comments_count', type: 'int32' },
//         { name: 'language', type: 'string' }
//       ]
//     });
//     console.log('Collection created successfully.');
//   } catch (error) {
//     console.error('Error creating collection:', error);
//   }
// };

// // Import data from JSON file
// const importDataFromJson = async (req, res) => {
//   const filePath = 'C:/Users/Nikun/Desktop/searchBlog/blogs.json'; // Path to your JSON file

//   fs.readFile(filePath, 'utf8', async (err, data) => {
//     if (err) {
//       console.error('File read error:', err);
//       return res.status(500).json({ error: err.message });
//     }

//     let documents;
//     try {
//       documents = JSON.parse(data);
//     } catch (parseError) {
//       console.error('JSON parse error:', parseError);
//       return res.status(400).json({ error: 'Invalid JSON format' });
//     }

//     try {
//       try {
//         await client.collections('finalBlog').retrieve();
//         console.log('Collection exists, proceeding to import.');
//       } catch (error) {
//         if (error.statusCode === 404) {
//           console.log('Collection does not exist. Creating collection...');
//           await createCollection();
//         } else {
//           throw error; // Re-throw if not a 404 error
//         }
//       }

//       // Import data into the collection
//       console.log('Importing data. Total documents:', documents.length);
//       const result = await client.collections('finalBlog').documents().import(documents, { action: 'upsert' });

//       // Check for errors
//       const errors = result.filter(item => item.success === false);

//       if (errors.length > 0) {
//         console.error('Errors occurred while uploading documents:', errors);
//         return res.status(500).json({ error: 'Some documents failed to upload', details: errors });
//       }

//       res.json({ message: 'Documents imported successfully', result });
//     } catch (error) {
//       console.error('Error during import:', error);
//       res.status(500).json({ error: error.message });
//     }
//   });
// };

// // Initialize Express app
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // Endpoint for importing data
// app.post('/import', importDataFromJson);

// // Endpoint for searching documents
// app.get('/search', async (req, res) => {
//   const { q, author, tags, min_views, max_views, min_ratings, max_ratings } = req.query;

//   const searchParams = {
//     q: q || '',
//     query_by: 'title,content',
//     filter_by: '',
//     sort_by: 'views:desc'
//   };

//   if (author || tags || min_views || max_views || min_ratings || max_ratings) {
//     const filters = [];
//     if (author) filters.push(`author:=${author}`);
//     if (tags) filters.push(`tags:=[${tags}]`);
//     if (min_views) filters.push(`views:>=${min_views}`);
//     if (max_views) filters.push(`views:<=${max_views}`);
//     if (min_ratings) filters.push(`ratings:>=${min_ratings}`);
//     if (max_ratings) filters.push(`ratings:<=${max_ratings}`);
//     searchParams.filter_by = filters.join(' && ');
//   }

//   try {
//     const searchResults = await client.collections('finalBlog').documents().search(searchParams);
//     res.json(searchResults.hits.map(hit => hit.document));
//   } catch (error) {
//     console.error('Search error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Endpoint to upload documents
// app.post('/upload-documents', async (req, res) => {
//   try {
//     const documents = req.body; // Directly accessing the array from the body

//     if (!Array.isArray(documents) || documents.length === 0) {
//       return res.status(400).json({ error: 'Invalid input: Expected a non-empty array of documents' });
//     }

//     const result = await client.collections('finalBlog').documents().import(documents, { action: 'upsert' });

//     const errors = result.filter(item => item.success === false);

//     if (errors.length > 0) {
//       console.error('Errors occurred while uploading documents:', errors);
//       return res.status(500).json({ error: 'Some documents failed to upload', details: errors });
//     }

//     res.json({ message: 'Documents uploaded successfully', result });
//   } catch (error) {
//     console.error('Upload documents error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Endpoint for retrieving all documents with pagination
// app.get('/all-documents', async (req, res) => {
//   try {
//     const allDocuments = [];
//     const perPage = 250; // Typesense limit
//     let page = 1; // Start from the first page

//     while (true) {
//       // Set the search parameters
//       const searchParams = {
//         q: '*', // Match everything
//         query_by: 'title,content', // Ensure you query by indexed fields
//         per_page: perPage, // Number of results per page
//         page: page // Page number
//       };

//       // Perform the search request
//       const searchResults = await client.collections('finalBlog').documents().search(searchParams);

//       // If we have results
//       if (searchResults.hits.length > 0) {
//         allDocuments.push(...searchResults.hits.map(hit => hit.document));
//         // Move to the next page
//         page++;
//         // If fewer results than per_page, exit the loop
//         if (searchResults.hits.length < perPage) {
//           break;
//         }
//       } else {
//         // No more documents
//         break;
//       }
//     }

//     res.json(allDocuments);
//   } catch (error) {
//     console.error('Error retrieving documents:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

















































// const fs = require('fs');
// const ndjson = require('ndjson');
// const Typesense = require('typesense');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize Typesense client
// const client = new Typesense.Client({
//   nodes: [
//     {
//       host: 'localhost',
//       port: 8108,
//       protocol: 'http'
//     }
//   ],
//   apiKey: 'abcd1234-efgh-5678-ijkl-9012mnopqrst'
// });

// const filePath = 'C:/Users/Nikun/Desktop/searchBlog/data.ndjson';
// const fileStream = fs.createReadStream(filePath).pipe(ndjson.parse());

// // Helper function to create the collection if it doesn't exist
// const createCollectionIfNotExists = async () => {
//   try {
//     console.log('Checking if collection exists...');
//     await client.collections('finalTestBlog').retrieve();
//     console.log('Collection already exists');
//   } catch (error) {
//     try {
//         await client.collections().create({
//           name: 'testBlog',
//           "fields": [
//             {"name": "author", "type": "string"},
//             {"name": "title", "type": "string"},
//             {"name": "content", "type": "string"},
//             {"name": "published_at", "type": "int64"},
//             {"name": "ratings", "type": "float"},
//             {"name": "tags", "type": "string[]"},
//             {"name": "views", "type": "int32"},
//             {"name": "comments_count", "type": "int32"},
//             {"name": "language", "type": "string"}
//           ]
//         });
//         console.log('Collection created successfully.');
//       } catch (error) {
//         console.error('Error creating collection:', error);
//       }
//       console.log('Collection created');
//     }
// };

// // Import data into Typesense
// const importDataToTypesense = async (req, res) => {
//   const documents = [];

//   fileStream.on('data', (data) => {
//     console.log('Data chunk:', data); // Debug log
//     documents.push(data);
//   });

//   fileStream.on('end', async () => {
//     console.log('File stream ended, starting import...');
//     try {
//       await createCollectionIfNotExists(); // Ensure collection exists

//       // Import data into the collection
//       console.log('Importing data:', documents.length, 'documents');
//       const result = await client.collections('finalTestBlog').documents().import(documents);
//       console.log('Import result:', result);
//       res.json({ message: 'Collection created and data imported' });
//     } catch (error) {
//       console.error('Error during import:', error);
//       res.status(500).json({ error: error.message });
//     }
//   });

//   fileStream.on('error', (error) => {
//     console.error('File stream error:', error);
//     res.status(500).json({ error: error.message });
//   });
// };

// // Initialize Express app
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // Endpoint for importing data
// app.post('/import', importDataToTypesense);


// app.get('/test', (req, res) => {
//   res.send('Test route is working');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
