import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';

dotenv.config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(router);

const PORT = process.env.PORT || 4690;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

