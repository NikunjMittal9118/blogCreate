// export const searchBlog = async (req, res, client) => {
//     const start = Date.now();
//     const { q, author, tags, min_views, max_views, min_ratings, max_ratings } = req.query;
  
//     const searchParams = {
//         q: q || '',
//         query_by: 'title,content',
//         filter_by: '',
//         sort_by: '_text_match:desc,ratings:desc,comments_count:desc' // Sort by relevance first, then by ratings, views, and comments
//     };
  
//     if (author || tags || min_views || max_views || min_ratings || max_ratings) {
//         const filters = [];
//         if (author) filters.push(`author:=${author}`);
//         if (tags) filters.push(`tags:=[${tags.split(',').map(tag => `"${tag.trim()}"`).join(',')}]`);
//         if (min_views) filters.push(`views:>=${min_views}`);
//         if (max_views) filters.push(`views:<=${max_views}`);
//         if (min_ratings) filters.push(`ratings:>=${min_ratings}`);
//         if (max_ratings) filters.push(`ratings:<=${max_ratings}`);
//         searchParams.filter_by = filters.join(' && ');
//     }
  
//     try {
//         const searchDocuments = []
//         const searchResults = await client.collections('My_Stories').documents().search(searchParams);
//         const end = Date.now();
//         const responseTime = end - start;
//         searchDocuments.push(...searchResults.hits.map(hit => hit.document));
//         res.json(searchDocuments)
//     } catch (error) {
//         console.error('Search error:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

export const searchBlog = async (req, res, client) => {
    const start = Date.now(); // Record start time
    const { q, author, tags, min_views, max_views, min_ratings, max_ratings } = req.query;
  
    const searchParams = {
        q: q || '',
        query_by: 'title,content',
        filter_by: '',
        sort_by: '_text_match:desc,ratings:desc,comments_count:desc' // Sort by relevance first, then by ratings, views, and comments
    };
  
    if (author || tags || min_views || max_views || min_ratings || max_ratings) {
        const filters = [];
        if (author) filters.push(`author:=${author}`);
        if (tags) filters.push(`tags:=[${tags.split(',').map(tag => `"${tag.trim()}"`).join(',')}]`);
        if (min_views) filters.push(`views:>=${min_views}`);
        if (max_views) filters.push(`views:<=${max_views}`);
        if (min_ratings) filters.push(`ratings:>=${min_ratings}`);
        if (max_ratings) filters.push(`ratings:<=${max_ratings}`);
        searchParams.filter_by = filters.join(' && ');
    }
  
    try {
        const searchDocuments = [];
        const searchResults = await client.collections('My_Stories').documents().search(searchParams);
        const end = Date.now(); // Record end time
        const responseTime = end - start; // Calculate response time
        searchDocuments.push(...searchResults.hits.map(hit => hit.document));
        
        // Include response time in the response
        res.json({
            responseTime,
            searchDocuments
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: error.message });
    }
};
