import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const getRandomUser = async (req, res) => {
    
    try {
        const cacheKey = 'randomUser';
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.json({
                source: 'cache',
                data: {
                    fullName: `${cachedData.name.first} ${cachedData.name.last}`,
                    location: cachedData.location
                }
            });
        }

        const response = await axios.get('https://randomuser.me/api/');
        const userData = response.data.results[0];

        const user = {
            name: userData.name,
            location: userData.location
        };

        cache.set(cacheKey, user);

        res.json({
            source: 'api',
            data: {
                fullName: `${user.name.first} ${user.name.last}`,
                location: user.location
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
};
