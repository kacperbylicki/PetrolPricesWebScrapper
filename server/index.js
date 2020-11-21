import express from 'express';
import '@babel/polyfill';
import cors from 'cors';
import { route } from './router/';
import { 
    port,
    cors_origin
} from './env';

const app = express();

const corsOptions = {
    origin: cors_origin,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api/v1', route);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

