export const createBlog = async (req, res, client) => {
  try {
    let documents = req.body;

    if (!Array.isArray(documents)) {
      documents = [documents]; // Convert single object to an array
    }

    if (documents.length === 0) {
      return res.status(400).json({ error: 'Invalid input: Expected a non-empty array or object of documents' });
    }

    const result = await client.collections('My_Stories').documents().import(documents, { action: 'upsert' });

    const errors = result.filter(item => item.success === false);

    if (errors.length > 0) {
      console.error('Errors occurred while uploading documents:', errors);
      return res.status(500).json({ error: 'Some documents failed to upload', details: errors });
    }

    res.json({ message: 'Documents uploaded successfully', result });
  } catch (error) {
    console.error('Upload documents error:', error);
    res.status(500).json({ error: error.message });
  }
};