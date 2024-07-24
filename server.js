import express from 'express';
import externalAPIRoutes from './routes/externalAPIRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', externalAPIRoutes);
app.use('/api', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
