import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const createPost = async (req, res) => {


    try {
        const { title, body, userId } = req.body;
        const cacheKey = `post_${title}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.json({
                source: 'cache',
                data: cachedData,
            });
        }

        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title,
            body,
            userId
        });

        cache.set(cacheKey, response.data);

        res.json({
            source: 'api',
            data: response.data,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};
