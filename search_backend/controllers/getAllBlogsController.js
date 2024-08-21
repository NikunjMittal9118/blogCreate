export const getAllBlogs = async (req, res, client) => {
    try {
      const allDocuments = [];
      const perPage = 250; // Typesense limit
      let page = 1; // Start from the first page
  
      while (true) {
        // Set the search parameters
        const searchParams = {
          q: '*', // Match everything
          query_by: 'title,content', // Ensure you query by indexed fields
          per_page: perPage, // Number of results per page
          page: page // Page number
        };
  
        // Perform the search request
        const searchResults = await client.collections('My_Stories').documents().search(searchParams);
  
        // If we have results
        if (searchResults.hits.length > 0) {
          allDocuments.push(...searchResults.hits.map(hit => hit.document));
          console.log(searchResults)
          // Move to the next page
          page++;
          // If fewer results than per_page, exit the loop
          if (searchResults.hits.length < perPage) {
            break;
          }
        } else {
          // No more documents
          break;
        }
      }
  
      res.json(allDocuments);
    } catch (error) {
      console.error('Error retrieving documents:', error);
      res.status(500).json({ error: error.message });
    }
};
