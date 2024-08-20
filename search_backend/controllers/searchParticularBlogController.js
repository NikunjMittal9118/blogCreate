export const searchParticularBlog = async (req, res, client) => {
    const { id } = req.params;

    try {
        const document = await client.collections('My_Stories').documents(id).retrieve();
        res.json(document);
    } catch (error) {
        console.error('Error retrieving blog by ID:', error);
        res.status(500).json({ error: error.message });
    }
};