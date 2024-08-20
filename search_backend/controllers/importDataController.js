import fs from 'fs';
import ndjson from 'ndjson';

const filePath = 'C:/Users/Nikun/Desktop/searchBlog/data.ndjson';
const fileStream = fs.createReadStream(filePath).pipe(ndjson.parse());
export const importDataToTypesense = async (req, res, client) => {
    const documents = [];
  
    fileStream.on('data', (data) => {
      console.log('Data chunk received:', data);
      documents.push(data);
    });
  
    fileStream.on('end', async () => {
      console.log('File stream ended. Number of documents:', documents.length);
  
      try {
        try {
          await client.collections('My_Stories').retrieve();
          console.log('Collection exists, proceeding to import.');
        } catch (error) {
          if (error.statusCode === 404) {
            console.log('Collection does not exist. Creating collection...');
            await createCollection();
          } else {
            throw error; // Re-throw if not a 404 error
          }
        }
  
        // Import data into the collection
        console.log('Importing data. Total documents:', documents.length);
        await client.collections('My_Stories').documents().import(documents);
        res.json({ message: 'Collection created and data imported' });
      } catch (error) {
        console.error('Error during import:', error);
        res.status(500).json({ error: error.message });
      }
    });
  
    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      res.status(500).json({ error: error.message });
    });
};
