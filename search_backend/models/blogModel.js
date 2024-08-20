export const createCollection = async (client) => {
  try {
    await client.collections().create({
      name: 'My_Stories',
      fields: [
        { name: 'id', type: 'string' },
        { name: 'author', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'published_at', type: 'int64' },
        { name: 'ratings', type: 'float' },
        { name: 'tags', type: 'string[]' },
        { name: 'views', type: 'int32' },
        { name: 'comments_count', type: 'int32' },
        { name: 'language', type: 'string' }
      ]
    });
    console.log('Connected to Typesense Database and Collection created successfully.');
  } catch (error) {
    console.error('Error creating collection:', error);
  }
};